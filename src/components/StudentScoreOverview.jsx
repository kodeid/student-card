import { useEffect, useState } from 'react';
import Modal from './Modal';

export default function StudentScoreOverview({ scoreOverview, getGrade, onMobile }) {
  const [lowestSubject, setLowestSubject] = useState(null);
  const [lowestSubjectGrade, setLowestSubjectGrade] = useState(null);

  useEffect(() => {
    if (scoreOverview) {
      let lowest = Infinity;
      let lowestSub = {};
      let title = null;
      Object.keys(scoreOverview).forEach((el) => {
        if (scoreOverview[el].totalPercentage < lowest) {
          lowest = scoreOverview[el].totalPercentage;
          lowestSub = scoreOverview[el];
          title = el;
        }
      });
      lowestSub.title = title;
      let grade = getGrade(lowest);
      setLowestSubjectGrade(grade);
      setLowestSubject(lowestSub);
    }
  }, [scoreOverview]);

  if (!lowestSubject) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="badge mb-2 text-white"
        style={{ backgroundColor: lowestSubjectGrade.color, borderColor: lowestSubjectGrade.color }}
      >
        {Math.round(lowestSubject.totalPercentage * 100) / 100}%
      </div>
      <label htmlFor={`subjectOverview${onMobile ? '-mob' : ''}`} className="cursor-pointer">
        <span className="text-md font-extrabold tooltip leading-5" data-tip="Weakness Subject">
          {lowestSubject.title}
        </span>
      </label>
      <span className="text-xs opacity-40 text-center">Weakness Subject</span>
      <Modal idModal={`subjectOverview${onMobile ? '-mob' : ''}`}>
        <div className="grid grid-cols-1 gap-3">
          {Object.keys(scoreOverview)
            .sort((a, b) => {
              return scoreOverview[a].totalPercentage - scoreOverview[b].totalPercentage;
            })
            .map((el, idx) => (
              <div
                key={idx}
                tabIndex={idx}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
              >
                <div className="collapse-title text-xl font-medium flex items-center gap-3">
                  <div
                    className="radial-progress font-extrabold text-sm"
                    style={{
                      '--value': Math.round(scoreOverview[el].totalPercentage * 100) / 100,
                      color: getGrade(scoreOverview[el].totalPercentage).color,
                    }}
                  >
                    {Math.round(scoreOverview[el].totalPercentage * 10) / 10}%
                  </div>
                  <div>
                    <h2 className="font-bold">{el}</h2>
                    <span className="text-sm opacity-80">
                      Grade:{' '}
                      <span
                        className="font-extrabold"
                        style={{ color: getGrade(scoreOverview[el].totalPercentage).color }}
                      >
                        {getGrade(scoreOverview[el].totalPercentage).grade}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="bg-gray-100 rounded-xl p-3 flex flex-col gap-5">
                    {scoreOverview[el].details.map((comp, idx) => {
                      return (
                        <div key={idx}>
                          <div className="mb-3">
                            {idx + 1}. {comp.phaseName} -{' '}
                            <span className="font-extrabold">{Math.round(comp.totalPercentage * 10) / 10}%</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-xs">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Assignment</th>
                                  <th className="text-center">Score</th>
                                  <th className="text-center">Rubric</th>
                                </tr>
                              </thead>
                              <tbody>
                                {comp.details.map((element, i) => {
                                  return (
                                    <tr key={i}>
                                      <th>{i + 1}.</th>
                                      <td>
                                        {element.assignment} ({element.percentageWeight}%)
                                      </td>
                                      <td className="text-center">
                                        {Math.round(element.studentScore * 10) / 10} (
                                        {Math.round((element.studentScore / element.rubricScore) * 100 * 10) / 10}%)
                                      </td>
                                      <td className="text-center">{Math.round(element.rubricScore * 10) / 10}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
