export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLocal = (key) => {
  localStorage.removeItem(key);
};

export const getLocal = (key) => {
  return localStorage.getItem(key);
};

export const formatDate = (dateFromDb) => {
  if (!dateFromDb) {
    return;
  }
  const yy = dateFromDb.slice(0, 4);
  const mm = dateFromDb.slice(5, 7);
  const dd = dateFromDb.slice(8, 10);
  const dateFormat = dd + "/" + mm + "/" + yy;
  return dateFormat;
};

export const formatDateMessage = (dateFromDb) => {
  if (dateFromDb) {
    const ddmmyy = formatDate(dateFromDb);
    const hh = dateFromDb.slice(11, 13);
    const hhInt = parseInt(hh) + 7;
    if (hhInt > 23) {
      hhInt = hhInt % 24;
    }
    const mm = dateFromDb.slice(14, 16);
    const dateFormat = ddmmyy + " " + `${hhInt}` + ":" + mm;
    return dateFormat;
  }
  return "";
};

export const formatStatus = (statusFromDb) => {
  const status = {
    waiting: "รอส่ง",
    ongoing: "กำลังส่ง",
    complete: "ดำเนินการเสร็จสิ้น",
  };

  return status[statusFromDb];
};

export const formatMessage = (message) => {
  if (message.length > 20) {
    return message.slice(0, 21) + "...";
  }
  return message;
};
