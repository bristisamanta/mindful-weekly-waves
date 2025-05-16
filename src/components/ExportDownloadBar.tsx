
import html2pdf from "html2pdf.js";
import { File } from "lucide-react";

type Props = {
  getHtml?: () => HTMLElement | null;
  getData: () => any;
};

export function ExportDownloadBar({ getHtml, getData }: Props) {
  // Export PDF
  const handleExportPDF = () => {
    if (!getHtml) return;
    const el = getHtml();
    if (el) {
      html2pdf().from(el).set({ margin: 0.3, filename: "journal-entry.pdf" }).save();
    }
  };
  // Export JSON
  const handleExportJSON = () => {
    const data = getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal-entries.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
  };

  return (
    <div className="fixed right-4 bottom-5 z-40 flex gap-2">
      <button
        className="flex items-center gap-1 bg-pink-100 text-[#C75E9D] py-2 px-5 rounded shadow-lg font-semibold hover:bg-pink-200 transition animate-fade-in"
        onClick={handleExportPDF}
        aria-label="Export as PDF"
        type="button"
      >
        <File className="mr-1" /> Export PDF
      </button>
      <button
        className="flex items-center gap-1 bg-blue-100 text-blue-700 py-2 px-4 rounded shadow-lg font-semibold hover:bg-blue-200 transition animate-fade-in"
        onClick={handleExportJSON}
        aria-label="Download as JSON"
        type="button"
      >
        <File className="mr-1" /> Export Data
      </button>
    </div>
  );
}
