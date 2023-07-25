const newBatch = {
  name: 'BATCH-NUMBER',
  sheetId: 'batchCode',
  startDate: 'YYYY-MM-DD',
  endDate: 'YYYY-MM-DD',
  studentsDataSheetName: 'studentSheetId',
  lectureMeeting: {
    enable: true,
    lectureScheduleSheetName: 'lectureSheetId',
    range: 'A1:B1',
    channelId: 'discordChannelId',
    targetRoleId: 'discordRoleId',
  },
  dailyCodingTime: {
    enable: true,
    sheetName: 'wakatimeSheetName',
    rowStart: 0,
    columnStart: 'A',
    sendToDiscord: true,
    discordChannelId: 'discordChannelId',
  },
  weeklyCodingTime: {
    enable: true,
    sheetName: 'weeklyWakatimeSheetName',
    rowStart: 0,
    columns: ['A', 'B', 'C'],
    sendToDiscord: true,
    discordChannelId: 'discordChannelId',
  },
};

const studentCard = {
  sheetId: '1pEMm0oo3PDmOPGSg7KtuOhVtYHtJ_p_i0e2o4KKHHCw',
  sheetName: 'Student Card Source',
  range: 'B4:CF',
  week: 1,
  withNotes: true,
};

const zoomLecture = {
  sheetId: '1hBbrjKq4FYGMjXsDIN_v7ETqqQCBpYFiYYLa3Sh8hVQ',
  sheetName: 'Absensi V2',
  range: 'A3:F36',
  time: 'AM',
  channelId: '1020717848164831232',
  targetRoleId: '710720382994219018',
};

const discordMessage = {
  channelId: '989064863529697286',
  targetRoleId: '1031506933699588166',
  message: 'test',
};

export { newBatch, studentCard, zoomLecture, discordMessage };