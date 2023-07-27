import { useMemo, useState } from 'react';
import { codingTimeFormater } from '../helper/formatter';
import Modal from './Modal';

export default function StudentCodingTime({ filteredData, arrPhase, activePhase, detail }) {
  const arr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDetail, setSelectedDetail] = useState(null);
  const codingTimeFormated = useMemo(() => {
    return codingTimeFormater(detail.codingTime);
  }, [detail.codingTime]);

  return (
    <div style={{ minHeight: '40em' }}>
      {filteredData &&
        filteredData.map((phase, idx) => {
          return (
            <div key={idx} className={`h-full ${phase.name === arrPhase[activePhase] ? 'block' : 'hidden'}`}>
              <h2 className="text-2xl font-extrabold text-center uppercase">{phase.name}</h2>

              {codingTimeFormated.average[activePhase] && (
                <>
                  <div className="flex justify-center">
                    <div className="flex flex-col gap-3 items-center my-5 md:w-1/2 shadow-lg rounded-md overflow-hidden">
                      <div
                        className="h-20 w-full"
                        style={{ backgroundColor: codingTimeFormated.average[activePhase]?.category?.color }}
                      >
                        <img
                          src={codingTimeFormated.average[activePhase]?.category?.icon}
                          className="flex-none relative -bottom-4 mx-auto"
                        />
                      </div>
                      <div className="p-5 flex items-center flex-col">
                        <div className="text-center w-4/5">
                          <h3
                            className="text-xl font-extrabold"
                            style={{ color: codingTimeFormated.average[activePhase]?.category?.color }}
                          >
                            {codingTimeFormated.average[activePhase]?.category?.name}
                          </h3>
                          {!codingTimeFormated.average[activePhase]?.avgHourPhase ? (
                            '-'
                          ) : (
                            <div className="text-2xl">
                              <span className="font-extrabold">
                                {codingTimeFormated.average[activePhase]?.avgHourPhase}
                              </span>
                              h
                              <span className="font-extrabold ml-2">
                                {codingTimeFormated.average[activePhase]?.avgMinutePhase}
                              </span>
                              m
                            </div>
                          )}
                          <span className="text-sm opacity-50">Avg. Coding Time / day</span>
                          <div className="text opacity-50 text-xs">
                            {codingTimeFormated.average[activePhase]?.category?.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center flex-col gap-3 mt-3">
                    <div className="grid grid-cols-7 md:gap-2 gap-5">
                      {arr.map((el, i) => (
                        <div
                          className={`text-sm md:w-16 h-10 text-center pt-5 ${i >= 5 ? 'text-red-600 font-bold' : ''}`}
                          key={i}
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {codingTimeFormated.detail
                        .filter((el) => el.phase == activePhase)
                        .map((el, i) => (
                          <label
                            className="text-sm md:w-16 md:h-16 w-10 h-10 text-center flex items-center justify-center relative tooltip tooltip-top cursor-pointer"
                            data-tip={el.date}
                            key={i}
                            htmlFor={'detailCodingTime'}
                            onClick={() => setSelectedDetail(el)}
                          >
                            <div
                              className="rounded-md absolute top-0 left-0 right-0 bottom-0 z-0"
                              style={{
                                opacity: el.percentage / 100 + 0.1,
                                backgroundColor: codingTimeFormated.average[activePhase]?.category?.color,
                              }}
                            ></div>
                            <span
                              className={`relative font-bold text-xs`}
                              style={{
                                color:
                                  el.percentage < 40
                                    ? codingTimeFormated.average[activePhase]?.category?.color
                                    : 'white',
                              }}
                            >
                              {el.hours ? `${el.hours}h ` : ''}
                              {el.minutes ? `${el.minutes}m` : '0m'}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                </>
              )}
              {!codingTimeFormated.average[activePhase] && (
                <div className="flex items-center flex-col h-full justify-center mb-10">
                  <img
                    className="grayscale mb-5"
                    src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Phantom-Poster.png"
                  />
                  <span className="opacity-50">Ups... No Data</span>
                </div>
              )}
            </div>
          );
        })}
      <Modal idModal={'detailCodingTime'}>
        {selectedDetail && (
          <>
            <h3 className="font-bold opacity-80">{selectedDetail.date}</h3>
            <div className="w-full rounded-lg shadow-md text-xs p-5 opacity-80" style={{ whiteSpace: 'pre-line' }}>
              {selectedDetail.text ? (
                selectedDetail.text
              ) : (
                <div className="flex h-24 w-full justify-center items-center font-bold">No Data</div>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
