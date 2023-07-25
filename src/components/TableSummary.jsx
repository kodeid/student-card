export default function TableSummary({score, category}) {
  const getTotalScore = (objComponent) => {
    let studentScore = 0
    let rubricScore = 0
    Object.keys(objComponent).map((el) => {
      let stdnScore = objComponent[el].studentScore
      let rbcScore = objComponent[el].rubricScore
      if (stdnScore) studentScore += stdnScore
      if (rbcScore) rubricScore += rbcScore
    })
    let percentage = Math.round((studentScore / rubricScore) * 10000) / 100

    if (isNaN(percentage)) percentage = '-'
    return {
      studentScore,
      rubricScore,
      percentage
    }
  }

  const getPercentageScore = (score, component) => {
    let inPercentage = Math.round(score * category[component].percentage) / 100
    if (isNaN(inPercentage)) inPercentage = '-'
    return inPercentage
  }

  const getTotalPercentageScore = () => {
    let totalScore = 0
    Object.keys(score).map((component) => {
      let percentageScore = getTotalScore(score[component]).percentage
      let inPercentage = getPercentageScore(percentageScore, component)
      if (typeof inPercentage === 'number') totalScore += inPercentage
    })
    if (isNaN(totalScore)) totalScore = '-'
    totalScore = Math.round(totalScore * 100) / 100
    return totalScore
  }

  return (
    <div className="flex mt-3 justify-between">
      <table className="table table-compact table-zebra w-1/3">
        <thead>
          <tr>
            <th colSpan={2} className="text-center">
              Nilai Akhir
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(score).map((component, idx) => {
            let percentageScore = getTotalScore(score[component]).percentage
            return (
              <tr key={idx}>
                <td className="text-xs">
                  {component} ({category[component].percentage}%)
                </td>
                <td className="text-xs">
                  <span className="font-bold mr-1">{percentageScore}</span>({getPercentageScore(percentageScore, component)} %)
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="text-right">
        <div>Total Score</div>
        <span className="text-5xl font-extrabold">{getTotalPercentageScore()}</span>
      </div>
    </div>
  )
}
