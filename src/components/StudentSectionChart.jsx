import ScoreCard from './ScoreCard'
import 'zingchart/es6'
import ZingChart from 'zingchart-react'
import {NESTED_PIE_CHART_CONFIG, RADAR_CHART_CONFIG} from '../helper/zingChart'
import {useMemo} from 'react'

const getConfig = (scores) => {
  const initConfig = JSON.parse(JSON.stringify(RADAR_CHART_CONFIG()))
  const category = []
  const scaleK = initConfig.scaleK
  const area = {
    values: [],
    backgroundColor: 'orange',
    lineColor: '#f97316',
    text: 'hello'
  }
  const plot = initConfig.plot
  const detailsTooltip = []
  plot.tooltip = {
    text: '%data-detail',
    backgroundColor: 'black'
  }

  Object.keys(scores).forEach((el) => {
    if (scores[el].rubricScore) {
      category.push(el)
      const studentScore = scores[el].studentScore
      const rubricScore = scores[el].rubricScore
      const percentage = (studentScore / rubricScore) * 100
      area.values.push(percentage)
      let detail = `${Math.round(percentage * 100) / 100}% on ${el}, score: ${studentScore} / ${rubricScore}`
      detailsTooltip.push(detail)
    }
  })

  plot['data-detail'] = detailsTooltip
  scaleK.labels = category
  scaleK.values = `0:${category.length - 1}:1`
  return {
    ...initConfig,
    scaleK: scaleK,
    series: [area]
  }
}

const getPieConfig = (scores) => {
  const initConfig = JSON.parse(JSON.stringify(NESTED_PIE_CHART_CONFIG()))
  let colors = ['#f97316', '#fdba74']
  let area = []
  let shapes = []

  Object.keys(scores).forEach((el, idx) => {
    if (scores[el].rubricScore) {
      const studentScore = scores[el].studentScore
      const rubricScore = scores[el].rubricScore
      const percentage = (studentScore / rubricScore) * 100
      let obj = {
        size: `${75 - idx * 25}%`,
        values: [percentage],
        backgroundColor: colors[idx],
        borderWidth: 37,
        borderColor: colors[idx],
        '-angleStart': 270,
        '-angleEnd': 110 + idx * 100,
        text: el
      }
      area.push(obj)

      let obj2 = {
        type: 'pie',
        flat: true,
        x: 200,
        y: 200,
        backgroundColor: colors[idx],
        alpha: 0.25,
        size: 140 - idx * 40,
        slice: 100 - idx * 40,
        placement: 'bottom'
      }
      shapes.push(obj2)
    }
  })
  return {
    ...initConfig,
    series: area,
    shapes
  }
}

export default function StudentSectionChart({idx, phase, component, scoreIdx, score}) {
  const config = useMemo(() => {
    return getConfig(score[component])
  }, [score[component]])

  const pieConfig = useMemo(() => {
    return getPieConfig(score[component])
  }, [score[component]])

  return (
    <div className="mb-10">
      {idx > 0 && <hr className="w-full mb-10 mt-10" />}
      <div className="flex">
        <div key={idx} className="w-3/5 grid gap-4 relative">
          <h2 className="absolute bottom-0 left-0 flex flex-col">
            <span className="opacity-50">
              {phase.name} {scoreIdx > 0 && ' - Repeat'}{' '}
            </span>
            <span className="font-bold text-3xl opacity-50 text-orange-500">{component}</span>
          </h2>
          <div className="w-full overflow-visible">
            {Object.keys(score[component]).length > 2 ? (
              <ZingChart data={config} />
            ) : (
              <div className="flex justify-center items-center">
                <ZingChart height={400} width={400} data={pieConfig} />
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5 flex items-center mt-10">
          <div className="w-full grid grid-cols-3 gap-3">
            {Object.keys(score[component])
              .filter((el) => score[component][el].rubricScore)
              .sort((a, b) => score[component][a].studentScore / score[component][a].rubricScore - score[component][b].studentScore / score[component][b].rubricScore)
              .map((el, idx) => {
                return <ScoreCard key={idx} el={el} score={score[component][el]} />
              })}
          </div>
        </div>
      </div>
    </div>
  )
}