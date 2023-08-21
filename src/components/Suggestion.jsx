import React, { useEffect, useMemo, useState } from 'react';
import http from '../helper/http';

const getComponents = (filteredData, arrPhase, activePhase) => {
  let components = [];
  filteredData?.forEach((phase) => {
    if (phase.name === arrPhase[activePhase]) {
      phase?.scores?.forEach((score) => {
        Object.values(score).forEach((component) => {
          Object.entries(component).forEach(([keyComponent, value]) => {
            if (Math.round(value.studentScore / value.rubricScore) * 100 < 80) {
              components.push(keyComponent);
            }
          });
        });
      });
    }
  });

  return components;
};

export default function Suggestion({ filteredData, arrPhase, activePhase, summaryStatus }) {
  const components = useMemo(() => {
    return getComponents(filteredData, arrPhase, activePhase);
  }, [activePhase]);

  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSuggestions([]);
    setIsLoading(true);
    if (components.length > 0) {
      (async () => {
        try {
          let url = '/suggestions?';
          components.forEach((el, i) => {
            if (i === 0) {
              url += `component=${el}`;
            } else {
              url += `&component=${el}`;
            }
          });
          const { data } = await http.get(url);
          setSuggestions(data.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [components]);
  return (
    <>
      {filteredData &&
        filteredData.map((phase, idx) => {
          return (
            <div key={idx} className={phase.name === arrPhase[activePhase] ? 'block' : 'hidden'}>
              <h2 className="text-2xl font-extrabold text-center uppercase">{phase.name}</h2>
              <div className="container my-5">
                {components.length > 0 && (
                  <div className="flex-1 bg-orange-300 shadow-lg text-orange-800 p-2 rounded-lg mb-10 relative">
                    <div>
                      <p>Berdasarkan nilai kamu di {phase.name}, kamu masih kurang di materi-materi ini:</p>
                      {components.map((el, i) => {
                        return <li key={i}>{el}</li>;
                      })}
                      <p className="mt-5">Dan di bawah ini adalah hal-hal yang bisa kamu lakukan untuk improve</p>
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-orange-300"></div>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center pt-10">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <p>Loading...</p>
                  </div>
                )}
                {!isLoading && suggestions.length < 1 && <div>Belum ada sugesti untuk kamu..</div>}
                {suggestions &&
                  suggestions.map((el, i) => {
                    return (
                      <div key={i} className="relative overflow-hidden">
                        <input
                          type="checkbox"
                          className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                        />
                        <div
                          className={`h-12 border-b-2 bg-gray-100 ${
                            i === 0 ? 'rounded-t-lg' : ''
                          } w-full pl-5 flex items-center`}
                        >
                          <h1 className="font-bold tracking-tight">{el.component}</h1>
                        </div>
                        <div className="absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:-rotate-90">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                        <div className="overflow-auto border bg-white transition-all duration-500 max-h-0 peer-checked:max-h-96">
                          {el.todos?.map((todo, idx) => {
                            return (
                              <div key={idx} className="p-5 border-b">
                                <h2 className="font-semibold tracking-wide mb-2">{todo.summary}</h2>
                                <p className="mb-4 text-sm">{todo.details}</p>
                                <div className="overflow-auto flex">
                                  {todo.links?.map((element, index) => {
                                    return (
                                      <a key={index} href={element} target="_blank">
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 mr-2 rounded-md">
                                          Referensi Belajar 1
                                        </span>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
}
