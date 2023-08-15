import { useMemo } from 'react';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiGithubLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import StudentCodingTimeSum from './StudentCodingTimeSum';
import StudentRoleScore from './StudentRoleScore';
import StudentScoreOverview from './StudentScoreOverview';

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

const getGrade = (score) => {
  const grades = [
    {
      grade: 'A+',
      min: 95,
      color: '#3b82f6',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-Cup.png',
    },
    {
      grade: 'A',
      min: 86,
      color: '#0ea5e9',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-Cup.png',
    },
    {
      grade: 'A-',
      min: 80,
      color: '#06b6d4',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-Cup.png',
    },
    {
      grade: 'B+',
      min: 75,
      color: '#14b8a6',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-Cup.png',
    },
    {
      grade: 'B',
      min: 70,
      color: '#10b981',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-Cup.png',
    },
    {
      grade: 'B-',
      min: 65,
      color: '#22c55e',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-Cup.png',
    },
    {
      grade: 'C',
      min: 60,
      color: '#84cc16',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Silver-Cup.png',
    },
    {
      grade: 'D',
      min: 40,
      color: '#eab308',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-Cup.png',
    },
    {
      grade: 'E',
      min: 0,
      color: '#f59e0b',
      icon: 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-Cup.png',
    },
  ];
  let result = null;

  for (let i = 0; i < grades.length; i++) {
    if (score >= grades[i].min) {
      result = grades[i];
      break;
    }
  }

  return result;
};

export default function CardHeader({ detail, filteredData }) {
  const { studentCardId } = useParams();

  const scoreOverview = useMemo(() => {
    if (filteredData.length) {
      const summaryPerPhase = getSummaryPerPhase(filteredData);
      const overview = getSummaryOverview(summaryPerPhase);
      return overview;
    }
    return null;
  }, [filteredData]);

  return (
    <div className="w-full shadow rounded-lg overflow-hidden bg-base-100 mb-5 relative">
      <div className="h-64 w-full absolute top-0 left-0 right-0 overflow-hidden flex justify-center items-center">
        <div className="absolute bottom-0 left-0 ml-2 mb-2">
          <a
            href={`https://docs.google.com/spreadsheets/d/${studentCardId}`}
            target="_blank"
            className="btn btn-ghost btn-sm text-white text-xs opacity-90"
            rel="noreferrer"
          >
            Student Card
          </a>
        </div>
        {/* <img className="object-cover w-full" src="https://randomfox.tk/random_fox.php" /> */}
        <img className="object-cover w-full" src="https://source.unsplash.com/random/?fox-animal/" />
        {/* <img
          className="object-cover w-full"
          src={`https://randomfox.ca/images/${detail?.batches[0]?.name.split('-')[1]}.jpg`}
        /> */}
      </div>
      <div className="p-5 flex justify-center mt-44 bg-white w-full md:justify-between justify-center items-end">
        <div className="w-1/3 overflow-auto justify-center items-center gap-4 mb-10 md:flex hidden">
          <StudentRoleScore detail={detail} filteredData={filteredData} getGrade={getGrade} />
          <div className="divider md:divider-horizontal w-1/3"></div>
          <StudentScoreOverview scoreOverview={scoreOverview} getGrade={getGrade} />
        </div>
        <div className="flex flex-col items-center mb-5 w-1/3">
          <div className="avatar relative">
            <div className="w-26 mask mask-hexagon rounded bg-white p-3 absolute top-0 left-0 right-0 bottom-0 z-0 scale-110"></div>
            <div className="w-24 mask mask-hexagon rounded bg-orange-500 p-3 relative">
              <img
                src={`https://avatars.dicebear.com/api/initials/${detail?.profile.fullName}.svg?backgroundColor=transparent`}
                className="scale-75 "
              />
            </div>
          </div>
          <span className="text-2xl font-extrabold mt-5 text-center">{detail?.profile.fullName}</span>
          <div className="flex mt-3">
            <span className="flex items-center opacity-70 ">
              <MdOutlinePersonOutline className="mr-1" />
              <span>{detail?.profile.nickName}</span>
            </span>
            <div className="divider divider-horizontal"></div>
            <a
              href={`https://github.com/${detail?.profile.githubUsername}`}
              target="_blank"
              className="tooltip"
              data-tip="Github"
              rel="noreferrer"
            >
              <span className="flex items-center opacity-70 ">
                <RiGithubLine className="mr-1" />
                <span>{detail?.profile.githubUsername}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="w-1/3 overflow-auto justify-center items-center mb-10 md:flex hidden">
          <StudentCodingTimeSum codingTime={detail?.codingTime} />
        </div>
      </div>
      <div className="block md:hidden w-full px-3">
        <div className="justify-center flex gap-2 mb-10">
          <div className="w-1/3">
            <StudentRoleScore onMobile={true} detail={detail} filteredData={filteredData} getGrade={getGrade} />
          </div>
          <div className="divider divider-horizontal m-0"></div>
          <div className="w-1/3">
            <StudentScoreOverview onMobile={true} scoreOverview={scoreOverview} getGrade={getGrade} />
          </div>
          <div className="divider divider-horizontal m-0"></div>
          <div className="w-1/3">
            <StudentCodingTimeSum onMobile={true} codingTime={detail?.codingTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
