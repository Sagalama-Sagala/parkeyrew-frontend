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

export const formatStatus = (statusFromDb) => {
  const status = {
    waiting: "รอส่ง",
    ongoing: "กำลังส่ง",
    complete: "ดำเนินการเสร็จสิ้น",
  };

  return status[statusFromDb];
};
