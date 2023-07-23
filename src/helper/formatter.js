import { formatDateWithDay } from './dayjs';

export const getCategory = (avgPerDayInMinutes) => {
  let name = '';
  let shortName = '';
  let color = '';
  let icon = '';
  let description = '';
  let avgHour = avgPerDayInMinutes / 60;

  if (avgHour > 8) {
    name = 'Coding Addict';
    shortName = 'Addict';
    color = '#3b82f6';
    description = 'A student who spends more than 8 hours per day coding.';
    icon = 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-User.png';
  } else if (avgHour >= 6 && avgHour <= 8) {
    name = 'Focused Coder';
    shortName = 'Focused';
    color = '#ca7f07';
    // color = '#06b6d4';
    description = 'A student who focuses solely on coding and spends an average of 6 - 8 hours per day coding.';
    icon = 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-User.png';
  } else if (avgHour >= 4 && avgHour < 6) {
    name = 'Consistent Coder';
    shortName = 'Consistent';
    // color = '#10b981';
    color = '#a0b7cc';
    description =
      'A student who has a consistent coding schedule every day, with an average of 4 - 6 hours of coding per day.';
    icon = 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Silver-User.png';
  } else if (avgHour >= 3 && avgHour < 4) {
    name = 'Adaptive Coder';
    shortName = 'Adaptive';
    color = '#c55524';
    // color = '#f97316';
    description =
      'A student who is able to adapt to different schedules and can spend an average of 3 - 4 hours per day coding.';
    icon = 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-User.png';
  } else if (avgHour < 3) {
    name = 'Occasional Coder';
    shortName = 'Occasional';
    color = '#5147c4';
    // color = '#ef4444';
    description = 'A student who only codes at specific times and spends an average under 3 hours per day coding.';
    icon = 'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Phantom-Poster.png';
  }

  return {
    name,
    shortName,
    color,
    icon,
    description,
  };
};

export const codingTimeFormater = (codingTime) => {
  const requiredTime = 5 * 60;
  let arrPhase = [];
  let detail = [];
  let totalInMinutes = 0;
  let totalDays = 0;
  let hour = 0;
  let minute = 0;
  let avgHour = 0;
  let avgMinute = 0;
  let average = {};
  let avgPerDayInMinutes = 0;

  if (codingTime) {
    Object.keys(codingTime)
      .sort()
      .forEach((el) => {
        let phaseTotalDays = 0;
        let phaseTotalMinutes = 0;
        let phaseName = el[el.length - 1];
        arrPhase.push(phaseName);

        codingTime[el].forEach((objTime) => {
          let obj = {
            date: formatDateWithDay(objTime.date),
            text: objTime.textDetail,
            phase: phaseName,
            totalInMinutes: objTime.totalInMinutes,
            hours: objTime.hours,
            minutes: objTime.minutes,
            percentage: Math.round((objTime.totalInMinutes / requiredTime) * 100),
          };
          detail.push(obj);

          totalInMinutes += objTime.totalInMinutes;
          phaseTotalMinutes += objTime.totalInMinutes;

          if (!obj.date?.includes('Saturday') && !obj.date?.includes('Sunday')) {
            totalDays += 1;
            phaseTotalDays += 1;
          }
        });
        let phaseAvgPerDayInMinutes = Math.floor(phaseTotalMinutes / phaseTotalDays);
        let avgHourPhase = isNaN(phaseAvgPerDayInMinutes) ? null : Math.floor(phaseAvgPerDayInMinutes / 60);
        let avgMinutePhase = isNaN(phaseAvgPerDayInMinutes) ? null : phaseAvgPerDayInMinutes % 60;
        let avgPhase = {
          avgHourPhase,
          avgMinutePhase,
          category: getCategory(phaseAvgPerDayInMinutes),
        };
        average[phaseName] = avgPhase;
      });
    hour = Math.floor(totalInMinutes / 60);
    minute = totalInMinutes % 60;

    avgPerDayInMinutes = Math.floor(totalInMinutes / totalDays);
    avgHour = isNaN(avgPerDayInMinutes) ? null : Math.floor(avgPerDayInMinutes / 60);
    avgMinute = isNaN(avgPerDayInMinutes) ? null : avgPerDayInMinutes % 60;
  }

  return {
    arrPhase,
    detail,
    totalInMinutes,
    hour,
    minute,
    avgHour,
    avgMinute,
    totalDays,
    category: getCategory(avgPerDayInMinutes),
    average,
  };
};
