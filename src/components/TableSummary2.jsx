import { useEffect, useState } from 'react';

export default function TableSummary2({ summaryStatus, phaseName }) {
  const [attendance, setAttendance] = useState(null);
  const [weekly, setWeekly] = useState(null);

  useEffect(() => {
    const _data = summaryStatus?.find((el) => el?.name == phaseName);
    setAttendance(_data?.attendanceStatus);
    setWeekly(_data?.weeklyStatus);
  }, []);

  if (!attendance) {
    return <p></p>;
  }

  return (
    <div className="flex flex-wrap md:flex-row-reverse mt-5 justify-between">
      <div className="ml-8">
        <table className="table w-full md:w-1/3">
          <thead>
            <tr className="">
              {Object.keys(attendance).map((key, idx) => {
                return (
                  <th colSpan={1} className="text-center" key={idx}>
                    {key}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(attendance).map((key, idx) => {
                return (
                  <td className="text-xs text-center" key={idx}>
                    <span className="mr-1">{attendance[key]}</span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:flex-none flex-1 flex md:flex-col md:justify-start md:items-end flex-row justify-between items-center mb-3">
        <table className="table table-compact table-zebra w-full md:w-1/2" style={{ width: '380px' }}>
          <thead>
            <tr>
              <th colSpan={6} className="text-center">
                Weekly Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(weekly).map((key, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-xs font-bold mx-5">{key}</td>
                  <td className="text-xs  mx-5">{weekly[key]['score']}</td>
                  <td
                    className="text-xs font-bold  mx-5"
                    style={{
                      color:
                        weekly[key]['status'] == 'Saved'
                          ? '#65a30d'
                          : weekly[key]['status'] == 'Warning'
                          ? '#eab308'
                          : '#dc2626',
                    }}
                  >
                    {weekly[key]['status']}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
