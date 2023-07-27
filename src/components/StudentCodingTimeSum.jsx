import { useMemo } from 'react';
import { codingTimeFormater } from '../helper/formatter';
import Modal from './Modal';

export default function StudentCodingTimeSum({ codingTime, onMobile }) {
  const codingTimeFormated = useMemo(() => {
    return codingTimeFormater(codingTime);
  }, [codingTime]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`badge mb-2 text-white`}
        style={{ backgroundColor: codingTimeFormated.category?.color, borderColor: codingTimeFormated.category?.color }}
      >
        {codingTimeFormated.category?.shortName}
      </div>
      <span
        className="text-xl tooltip"
        data-tip={`Since Join Hacktiv8 on Phase ${codingTimeFormated.arrPhase.join(', ')}`}
      >
        {!codingTimeFormated.avgHour ? (
          '-'
        ) : (
          <label htmlFor={`codingTimeSumModal${onMobile ? '-mob' : ''}`} className="cursor-pointer">
            <span className="font-extrabold">{codingTimeFormated.avgHour}</span>h
            <span className="font-extrabold ml-2">{codingTimeFormated.avgMinute}</span>m
          </label>
        )}
      </span>
      <span className="text-xs opacity-40">Avg. Coding Time / day</span>
      <Modal idModal={`codingTimeSumModal${onMobile ? '-mob' : ''}`}>
        {codingTimeFormated.category && (
          <>
            <div className="flex justify-center w-full">
              <div className="flex flex-col gap-3 items-center shadow-lg rounded-xl overflow-hidden w-full">
                <div className="h-20 w-full" style={{ backgroundColor: codingTimeFormated.category?.color }}>
                  <img src={codingTimeFormated.category?.icon} className="flex-none relative -bottom-4 mx-auto" />
                </div>
                <div className="p-5 flex items-center flex-col">
                  <div className="text-center w-4/5">
                    <h3 className="text-xl font-extrabold" style={{ color: codingTimeFormated.category?.color }}>
                      {codingTimeFormated.category?.name}
                    </h3>
                    {!codingTimeFormated.avgHour ? (
                      '-'
                    ) : (
                      <div className="text-2xl">
                        <span className="font-extrabold">{codingTimeFormated.avgHour}</span>h
                        <span className="font-extrabold ml-2">{codingTimeFormated.avgMinute}</span>m
                      </div>
                    )}
                    <span className="text-sm opacity-50">Avg. Coding Time / day</span>{' '}
                    <span className="text-sm opacity-50 font-bold">(in total)</span>
                    <div className="text opacity-50 text-xs">{codingTimeFormated.category?.description}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              {Object.keys(codingTimeFormated.average).map((name, idx) => {
                let strPhase = `Phase ${name}`;

                return (
                  <div key={idx} className="w-full p-5 rounded shadow-md flex gap-3">
                    <div className="w-24">
                      <img src={codingTimeFormated.average[name]?.category.icon} />
                    </div>
                    <div className="flex-1 items-center flex">
                      <div style={{ lineHeight: 0.7 }}>
                        <span className="opacity-50">{strPhase}</span>
                        <h2
                          className="text-xl font-bold"
                          style={{ color: codingTimeFormated.average[name]?.category?.color }}
                        >
                          {codingTimeFormated.average[name]?.category.name}
                        </h2>
                        <div className="text-xl">
                          <span className="font-extrabold">{codingTimeFormated.average[name]?.avgHourPhase}</span>h
                          <span className="font-extrabold ml-2">
                            {codingTimeFormated.average[name]?.avgMinutePhase}
                          </span>
                          m
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
