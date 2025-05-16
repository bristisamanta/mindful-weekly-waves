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

        {/* ⭐ Journal Entry Card Starts Here */}
        <div className="glass-card mb-8 p-6 rounded-2xl animate-fade-in shadow-lg" style={{background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)", border: "1.5px solid #ebe6db" }}>
          <h2 className="text-xl md:text-2xl text-[#C28FEF] font-bold flex items-center mb-2">
            <span className="mr-2 text-2xl">🌸</span>How are you feeling today?
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-4">Take a deep breath. Let it out. Now, tell me how you’re feeling today.</p>
          <MoodSelector
            value={week[currentDay].mood as MoodType}
            onChange={handleMood}
          />
          <JournalEditor
            value={week[currentDay].notes}
            onChange={handleNotes}
            tags={week[currentDay].tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
          <button
            className="mt-2 w-full py-3 px-6 rounded-lg text-lg font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-[#8249AF] shadow-md transition-all hover:scale-105 focus:scale-105 focus-visible:ring-2 active:scale-100 animate-saveButton"
            type="button"
            onClick={() => {
              // Future: Save animation/feedback here
            }}
          >
            Save Entry
          </button>
          {/* Future: Place for feedback animation */}
        </div>
        {/* 📝 End journal card */}

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
