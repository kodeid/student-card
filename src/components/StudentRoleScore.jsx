import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Modal from './Modal';
const baseUrl = import.meta.env.VITE_API_URL;

const getSummaryPerPhase = (filteredData) => {
  let result = [];
  filteredData.forEach((phase) => {
    // console.log('------ Phase: ', phase.name);
    let objPhase = {
      phaseName: phase.name,
      assignment: {},
      component: {},
      components: [],
    };
    phase?.scores?.forEach((attempt, idx) => {
      Object.keys(attempt).forEach((assignment) => {
        if (!objPhase.assignment[assignment]) objPhase.assignment[assignment] = [];
        let obj = {
          attempt: idx,
          percentage: phase.category[assignment].percentage,
          components: [],
        };
        // console.log('-------- Assignment', assignment, phase.category[assignment].percentage);
        Object.keys(attempt[assignment]).forEach((component) => {
          if (!objPhase.component[component])
            objPhase.component[component] = { totalPoint: 0, details: [], totalWeight: 0, totalPercentage: 0 };

          if (attempt[assignment][component].rubricScore) {
            let objComponent = {
              name: component,
              studentScore: attempt[assignment][component].studentScore,
              rubricScore: attempt[assignment][component].rubricScore,
            };
            obj.components.push(objComponent);
            // console.log(
            //   component,
            //   attempt[assignment][component].studentScore,
            //   attempt[assignment][component].rubricScore,
            // );

            // obj detail
            let objDetail = {
              assignment: assignment,
              percentageWeight: phase.category[assignment].percentage,
              studentScore: attempt[assignment][component].studentScore,
              rubricScore: attempt[assignment][component].rubricScore,
              point: (attempt[assignment][component].studentScore / attempt[assignment][component].rubricScore) * 100,
            };
            objPhase.component[component].details.push(objDetail);

            // count totalPoint
            objPhase.component[component].totalPoint += objDetail.point;

            // count weight
            objPhase.component[component].totalWeight += objDetail.percentageWeight;

            // count totalPercentage
            // objPhase.component[component].totalPercentage +=
          }
        });
        objPhase.assignment[assignment].push(obj);
      });
    });
    objPhase.components = Object.keys(objPhase.component).map((el) => {
      let obj = {
        componentName: el,
        ...objPhase.component[el],
      };

      obj.details.forEach((detail) => {
        obj.totalPercentage += (detail.point * detail.percentageWeight) / obj.totalWeight;
      });
      objPhase.component[el].totalPercentage = obj.totalPercentage;
      return obj;
    });

    delete objPhase.components;
    result.push(objPhase);
  });
  return result;
};

const getSummaryOverview = (summaryPerPhase) => {
  let summaryObj = {};
  summaryPerPhase.forEach((el) => {
    Object.keys(el.component).forEach((component) => {
      if (!summaryObj[component]) {
        summaryObj[component] = {
          details: [],
          totalPercentage: 0,
        };
      }
      summaryObj[component].details.push({ ...el.component[component], phaseName: el.phaseName });

      summaryObj[component].totalPercentage =
        (summaryObj[component].totalPercentage + el.component[component].totalPercentage) /
        summaryObj[component].details.length;
    });
  });
  return summaryObj;
};

export default function StudentRoleScore({ detail, filteredData, getGrade, onMobile }) {
  const url = `${baseUrl}/developer-roles`;
  const { data, isLoading } = useFetch(url);
  const [strongestRole, setStrongestRole] = useState(null);

  const totalScore = useMemo(() => {
    if (data && filteredData.length) {
      let result = getSummaryPerPhase(filteredData);
      let summary = getSummaryOverview(result);
      let scores = data.map((el) => {
        let totalPercentage = 0;
        el.scores = el.components.map((component) => {
          if (component === 'Fundamental') component = 'Fundamental SQL';
          if (component === 'Logic') component = 'Fundamental Logic';
          let obj = { name: component, score: summary[component]?.totalPercentage || 0 };
          totalPercentage += obj.score;
          return obj;
        });
        el.average = totalPercentage / el.scores.length;

        return el;
      });
      return scores;
    }
    return null;
  }, [data, filteredData]);

  useEffect(() => {
    if (totalScore) {
      let frontendBackend = totalScore.filter((el) => el.name === 'Backend' || el.name === 'Frontend');
      let sorted = frontendBackend.sort((a, b) => b.average - a.average);
      let strongest = sorted[0];
      setStrongestRole(strongest);
    }
  }, [totalScore]);
  if (!strongestRole) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="badge mb-2"
        style={{
          backgroundColor: getGrade(strongestRole.average).color,
          borderColor: getGrade(strongestRole.average).color,
          color: 'white',
        }}
      >
        {Math.round(strongestRole.average * 10) / 10}%
      </div>
      <label
        htmlFor={`roleScore${onMobile ? '-mob' : ''}`}
        className="text-md font-extrabold tooltip cursor-pointer"
        data-tip="strongest role"
      >
        {strongestRole.name}
      </label>
      <span className="text-xs opacity-40 text-center">Strongest Role</span>
      <Modal idModal={`roleScore${onMobile ? '-mob' : ''}`}>
        {totalScore
          .sort((a, b) => b.average - a.average)
          .map((role, idx) => {
            return (
              <div
                key={idx}
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-3"
              >
                <div className="collapse-title">
                  <div key={idx} className="flex gap-5 items-center">
                    <div className="relative">
                      <img src={getGrade(role.average).icon} className="w-16" />
                      <div
                        className="absolute bottom-0 right-0 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-white"
                        style={{
                          backgroundColor: getGrade(role.average).color,
                        }}
                      >
                        {getGrade(role.average).grade}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="opacity-70 font-extrabold">{role.name}</span>
                      <span className="font-extrabold text-xl">{Math.round(role.average * 10) / 10}%</span>
                    </div>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="rounded-xl bg-gray-100 p-3 flex gap-2 flex-wrap">
                    {role.scores
                      .sort((a, b) => a.score - b.score)
                      .map((score, i) => {
                        return (
                          <button
                            key={i}
                            className="btn gap-2 btn-sm rounded-xl text-xs text-white capitalize"
                            style={{
                              backgroundColor: getGrade(score.score).color,
                              borderColor: getGrade(score.score).color,
                            }}
                          >
                            {score.name}
                            <div className="badge badge-secondary text-xs">{Math.round(score.score * 10) / 10}%</div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </Modal>
    </div>
  );
}
