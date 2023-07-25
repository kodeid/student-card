import {useMemo} from 'react'
import TableSummary from './TableSummary'

const getAssignment = (score) => {
  let challenges = {}
  Object.keys(score).forEach((assignment) => {
    challenges[assignment] = {}
    Object.keys(score[assignment]).forEach((component) => {
      score[assignment][component].detail.forEach((challenge, idx) => {
        let challengeName = Object.keys(challenge)[0]
        if (!challenges[assignment][challengeName]) challenges[assignment][challengeName] = {detail: {}, totalScore: 0}
        challenges[assignment][challengeName].detail[component] = score[assignment][component].detail[idx][challengeName]
        challenges[assignment][challengeName].totalScore += score[assignment][component].detail[idx][challengeName].studentScore
      })
    })
  })
  return challenges
}

export default function StudentSectionStudentCard({scoreIdx, phase, score}) {
  const mainAssignment = useMemo(() => {
    return getAssignment(score)
  }, [score])
  return (
    <div key={scoreIdx}>
      {scoreIdx > 0 && <hr className="my-10" />}

      <TableSummary score={score} category={phase.category} />
      <div className="w-full flex justify-center">
        <div>
          <h1 className="font-bold text-xl text-center mb-5">Student Card</h1>
          <div className="overflow-x-auto w-full pb-5">
            <table className="table table-zebra mx-auto text-xs">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th rowSpan={2} className="sticky left-0 z-20">
                    Criteria
                  </th>
                  {Object.keys(score).map((component, i) => {
                    return (
                      <th key={i} colSpan={Object.keys(mainAssignment[component]).length} className="text-center border-x-2 border-white">
                        {component}
                      </th>
                    )
                  })}
                </tr>
                <tr>
                  <th></th>
                  {Object.keys(score).map((component) => {
                    return Object.keys(mainAssignment[component]).map((el, i) => {
                      let prefix = ''
                      if (component == 'Live Code') {
                        prefix = 'lc-'
                      } else if (component == 'Challenge') {
                        prefix = 'ch-'
                      }
                      let name = el.includes(component) ? i + 1 : el
                      return (
                        <th key={i} className={`text-center border-x-2 border-white ${i % 2 == 0 ? 'opacity-70' : ''}`}>
                          <span className={`font-bold`}>
                            {prefix}
                            {name}
                          </span>
                        </th>
                      )
                    })
                  })}
                </tr>
              </thead>
              <tbody>
                {phase.components
                  .filter((el) => el)
                  .map((el, idx) => (
                    <tr key={idx}>
                      <th>{idx + 1}.</th>
                      <th className="sticky left-0 z-20">{el}</th>
                      {Object.keys(score).map((component) => {
                        let assignment = JSON.parse(JSON.stringify(mainAssignment[component]))
                        return Object.keys(assignment)
                          .sort()
                          .map((name, index) => {
                            let studentScore = '-'
                            let scoreData
                            if (assignment[name].detail[el]) {
                              scoreData = JSON.parse(JSON.stringify(assignment[name].detail[el]))
                              studentScore = scoreData.studentScore
                            }
                            return (
                              <td className={`text-center border-x-2 border-white font-bold ${index % 2 == 0 ? 'opacity-70' : ''}`} key={index}>
                                {studentScore}
                              </td>
                            )
                          })
                      })}
                    </tr>
                  ))}
                <tr>
                  <td></td>
                  <td className="font-bold text-center sticky left-0 z-20">TOTAL</td>
                  {Object.keys(score).map((component) => {
                    let assignment = JSON.parse(JSON.stringify(mainAssignment[component]))
                    return Object.keys(assignment)
                      .sort()
                      .map((name, index) => {
                        return (
                          <td className={`text-center border-x-2 border-white font-bold ${index % 2 == 0 ? 'opacity-70' : ''}`} key={index}>
                            {assignment[name].totalScore}
                          </td>
                        )
                      })
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}