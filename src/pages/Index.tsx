import { useEffect, useState } from "react";
import GenderModal from "@/components/GenderModal";
import MoodSelector from "@/components/MoodSelector";
import JournalEditor from "@/components/JournalEditor";
import { MoodRadarChart, MoodLineChart, TagPieChart } from "@/components/MoodCharts";
import { getJournalData, setJournalData } from "@/utils/storage";
import WelcomeHeader from "@/components/WelcomeHeader";

type MoodType = "happy" | "sad" | "neutral" | "love" | "angry" | "calm" | "excited" | "tired";

const defaultWeek = [
  { day: "Mon", mood: "happy", notes: "", tags: [] as string[] },
  { day: "Tue", mood: "neutral", notes: "", tags: [] as string[] },
  { day: "Wed", mood: "neutral", notes: "", tags: [] as string[] },
  { day: "Thu", mood: "neutral", notes: "", tags: [] as string[] },
  { day: "Fri", mood: "neutral", notes: "", tags: [] as string[] },
  { day: "Sat", mood: "neutral", notes: "", tags: [] as string[] },
  { day: "Sun", mood: "neutral", notes: "", tags: [] as string[] },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getTodayIdx = () => {
  const today = new Date().getDay();
  // JS: 0 is Sun, 1 is Mon...
  return today === 0 ? 6 : today - 1;
};

const moodValueMap: Record<MoodType, number> = {
  happy: 7,
  excited: 6,
  love: 6,
  calm: 6,
  neutral: 4,
  tired: 3,
  sad: 2,
  angry: 1,
};

export default function Index() {
  const [gender, setGender] = useState<string | null>(() => {
    const data = getJournalData();
    return data?.gender || null;
  });
  const [week, setWeek] = useState(() => {
    const data = getJournalData();
    return data?.week || defaultWeek;
  });
  const [currentDay, setCurrentDay] = useState(getTodayIdx());
  const [showGenderModal, setShowGenderModal] = useState(gender === null);

  useEffect(() => {
    setJournalData({ gender, week });
  }, [gender, week]);

  // Modal "jumpers" - these will just focus the relevant section or set day, can be enhanced as needed
  const focusEditor = () => {
    const el = document.getElementById("journal-editor-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const focusCharts = () => {
    const el = document.getElementById("charts-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Mood & Editor handlers
  const handleMood = (mood: MoodType) => {
    setWeek((week) =>
      week.map((entry, i) =>
        i === currentDay ? { ...entry, mood } : entry
      )
    );
  };
  const handleNotes = (notes: string) => {
    setWeek((week) =>
      week.map((entry, i) =>
        i === currentDay ? { ...entry, notes } : entry
      )
    );
  };
  const handleAddTag = (tag: string) => {
    setWeek((week) =>
      week.map((entry, i) =>
        i === currentDay && !entry.tags.includes(tag)
          ? { ...entry, tags: [...entry.tags, tag] }
          : entry
      )
    );
  };
  const handleRemoveTag = (tag: string) => {
    setWeek((week) =>
      week.map((entry, i) =>
        i === currentDay
          ? { ...entry, tags: entry.tags.filter((t) => t !== tag) }
          : entry
      )
    );
  };

  // Mood data for charts
  const moodLineData = week.map((entry, idx) => ({
    day: days[idx],
    mood: entry.mood,
    value: moodValueMap[entry.mood as MoodType],
  }));
  const radarData = Array.from(
    week.reduce((acc, entry) => {
      acc.set(entry.mood, (acc.get(entry.mood) || 0) + 1);
      return acc;
    }, new Map()),
    ([mood, value]) => ({ mood, value })
  );
  const tagCounts: Record<string, number> = {};
  week.forEach((entry) => {
    entry.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const tagPieData = Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0D6] via-[#F7E3F8] to-[#A7C7E7] flex flex-col items-center py-10 px-4">
      <GenderModal
        open={showGenderModal}
        onSelect={(g) => {
          setGender(g);
          setShowGenderModal(false);
        }}
      />
      <div className="w-full max-w-2xl mx-auto">
        <WelcomeHeader
          onNewEntry={focusEditor}
          onViewPast={() => window.alert("Past entries view coming soon!")}
          onViewCharts={focusCharts}
        />
        <div className="flex justify-center my-3 gap-2">
          {days.map((d, idx) => (
            <button
              key={d}
              onClick={() => setCurrentDay(idx)}
              className={`px-3 py-1 rounded-full mx-1 font-semibold transition ${
                currentDay === idx
                  ? "bg-primary text-white shadow"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <MoodSelector
          value={week[currentDay].mood as MoodType}
          onChange={handleMood}
        />
        <div id="journal-editor-section">
          <JournalEditor
            value={week[currentDay].notes}
            onChange={handleNotes}
            tags={week[currentDay].tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        </div>
        <div id="charts-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <MoodRadarChart data={radarData} />
          <MoodLineChart data={moodLineData} />
          <TagPieChart data={tagPieData} />
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          All data saved locally, private to you 😊
        </p>
      </div>
    </div>
  );
}
