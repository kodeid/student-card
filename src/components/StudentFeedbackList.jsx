import { formatDate } from '../helper/dayjs';

export default function StudentFeedbackList({ filteredData, arrPhase, activePhase, detail }) {
  return (
    <div style={{ minHeight: '40em' }}>
      {filteredData &&
        filteredData.map((phase, idx) => {
          return (
            <div key={idx} className={phase.name === arrPhase[activePhase] ? 'block' : 'hidden'}>
              <h2 className="text-2xl font-extrabold text-center uppercase">{phase.name}</h2>
              <div className="w-full flex items-center flex-col gap-3 mt-3">
                {detail.feedback
                  .filter((el) => el.phase == activePhase)
                  .map((el, i) => {
                    return (
                      <div key={i} className="md:w-2/3 w-full flex gap-3 items-start md:flex-row flex-col">
                        <div className="flex md:flex-row flex-row-reverse items-center gap-3">
                          <div className="md:text-right md:whitespace-nowrap">
                            <div className="font-bold">{el.instructor}</div>
                            <div className="opacity-50">
                              {JSON.stringify(formatDate(el.date)) !== 'null' && formatDate(el.date)}
                            </div>
                          </div>
                          <div className="avatar">
                            <div className="w-16 rounded-full">
                              <img src={`https://avatars.dicebear.com/api/initials/${el.instructor}.svg`} />
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-full rounded-lg shadow-md text-xs p-5 opacity-80"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          {el.note}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
