
import { BookOpen, Plus, ChartLine, Folder } from "lucide-react";
import QuoteRotator from "./QuoteRotator";

type Props = {
  onNewEntry: () => void;
  onViewPast: () => void;
  onViewCharts: () => void;
};

export default function WelcomeHeader({ onNewEntry, onViewPast, onViewCharts }: Props) {
  return (
    <div
      className="glass-card mb-10 py-8 px-6 text-center md:mb-14"
      style={{
        background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
        border: "1.5px solid #ebe6db",
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight" style={{ color: "#A389D3" }}>
        <span role="img" aria-label="Sun behind cloud" className="mr-2">🌤️</span>
        Moodiary – Your Weekly Emotional Companion
      </h1>
      <QuoteRotator />
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
        <button type="button"
          className="flex items-center gap-2 justify-center px-5 py-2 rounded-lg bg-[#A7C7E7] shadow hover:bg-[#C7DCF7] transition text-base font-semibold text-[#38516b]"
          onClick={onNewEntry}
        >
          <Plus /> New Entry
        </button>
        <button type="button"
          className="flex items-center gap-2 justify-center px-5 py-2 rounded-lg bg-[#FFC9DE] shadow hover:bg-[#ffe0ec] transition text-base font-semibold text-[#c7447a]"
          onClick={onViewPast}
        >
          <Folder /> View Past Entries
        </button>
        <button type="button"
          className="flex items-center gap-2 justify-center px-5 py-2 rounded-lg bg-[#E4C1F9] shadow hover:bg-[#F2E5FA] transition text-base font-semibold text-[#82559d]"
          onClick={onViewCharts}
        >
          <ChartLine /> Mood Charts
        </button>
      </div>
    </div>
  );
}
