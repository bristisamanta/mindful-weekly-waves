
export function getJournalData() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("journalData");
  return data ? JSON.parse(data) : null;
}

export function setJournalData(data: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("journalData", JSON.stringify(data));
}
