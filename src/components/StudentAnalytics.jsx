import 'zingchart/es6';
import TableSummary from './TableSummary';
import StudentSectionChart from './StudentSectionChart';
import TableAttendance from './TableSummary2';

export default function StudentAnalytics({ filteredData, arrPhase, activePhase, summaryStatus }) {
  return (
    <>
      {filteredData &&
        filteredData.map((phase, idx) => {
          let phaseName = phase.name;
          return (
            <div key={idx} className={phase.name === arrPhase[activePhase] ? 'block' : 'hidden'}>
              <h2 className="text-2xl font-extrabold text-center uppercase">{phase.name}</h2>
              {phase?.scores?.map((score, scoreIdx) => {
                if (scoreIdx > 0) {
                  phaseName = phaseName + ' Repeat';
                }

                return (
                  <div key={scoreIdx}>
                    {scoreIdx > 0 && <hr className="w-full mb-10 mt-10" />}
                    <TableSummary score={score} category={phase.category} />
                    <TableAttendance phaseName={phaseName} summaryStatus={summaryStatus} />
                    {Object.keys(score).map((component, idx) => {
                      return (
                        <StudentSectionChart
                          key={idx}
                          idx={idx}
                          phase={phase}
                          component={component}
                          scoreIdx={scoreIdx}
                          score={score}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
}
