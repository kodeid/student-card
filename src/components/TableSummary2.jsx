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
      <div>
        <table className="table table-compact table-zebra w-full md:w-1/3">
          <thead>
            <tr className="border-y-2">
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
            <tr className="border-y-2 rounded-full" style={{ borderRadius: '100px' }}>
              {Object.keys(attendance).map((key, idx) => {
                return (
                  <td className="text-xs text-center" key={idx}>
                    <span className="font-bold mr-1">{attendance[key]}</span>
                  </td>
                );
              })}
            </tr>
            <tr></tr>
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
                          ? 'green'
                          : weekly[key]['status'] == 'Warning'
                          ? 'rgb(234 179 8)'
                          : 'red',
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
