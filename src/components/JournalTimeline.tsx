
import { useState, useMemo } from "react";
import { Calendar, Tag, Search, Smile, Angry, Heart, Book, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const getMoodIcon = (mood: string) => {
  switch(mood) {
    case "happy": return <Smile className="text-yellow-300" />;
    case "sad": return <Book className="text-blue-400" />;
    case "love": return <Heart className="text-pink-300" />;
    case "angry": return <Angry className="text-red-400" />;
    case "calm": return <Smile className="text-green-400" />;
    case "excited": return <Smile className="text-purple-400" />;
    case "tired": return <Book className="text-gray-400" />;
    default: return <Smile className="text-gray-300" />;
  }
};

type Entry = {
  day: string;
  mood: string;
  notes: string;
  tags: string[];
};

type Props = {
  entries: Entry[];
  days: string[];
  onClose: () => void;
};

export default function JournalTimeline({ entries, days, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [filterDay, setFilterDay] = useState<string>("");

  // Get unique tags for the filter chip list
  const predefinedTags = Array.from(
    new Set(entries.flatMap(e => e.tags))
  ).filter(Boolean);

  // Filtering logic
  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry, idx) =>
        (tag ? entry.tags.includes(tag) : true) &&
        (filterDay ? entry.day === filterDay : true) &&
        (search
          ? (entry.notes + entry.tags.join(" ")).toLowerCase().includes(search.toLowerCase())
          : true)
      )
      .map((entry, idx) => ({ ...entry, idx }));
  }, [search, tag, filterDay, entries]);

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-2 max-h-[90vh] flex flex-col animate-fade-in relative">
        <button
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={onClose}
          aria-label="Close timeline"
        >
          <X />
        </button>
        <h2 className="font-bold text-xl text-center mt-5 mb-2 text-[#b69cf6] flex items-center gap-2 justify-center">
          <Book /> Past Journal Entries
        </h2>
        <div className="flex flex-col gap-2 px-4 pb-3">
          <div className="flex gap-2">
            <input
              className="flex-grow px-2 py-1 rounded border border-gray-200"
              placeholder="🔍 Search notes or tags"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="px-1 py-1 rounded border border-gray-200"
              value={filterDay}
              onChange={e => setFilterDay(e.target.value)}
            >
              <option value="">All Days</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-bold mr-1 text-gray-400">Tags:</span>
            <button
              onClick={() => setTag("")}
              className={cn(
                "px-2 py-0.5 rounded-full border text-xs font-semibold",
                !tag && "bg-blue-100 border-blue-300"
              )}
            >All</button>
            {predefinedTags.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={cn(
                  "px-3 py-0.5 rounded-full border text-xs font-semibold transition",
                  tag === t ? "bg-pink-200 border-pink-400" : "bg-gray-100 hover:bg-gray-200"
                )}
              >#{t}</button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-2 pb-3">
          {filteredEntries.length === 0 && (
            <div className="text-sm text-gray-400 p-5 text-center">No entries match the filters.</div>
          )}
          <ul className="space-y-2">
            {filteredEntries.map((entry) => (
              <li key={entry.idx} className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg shadow p-3 flex items-center gap-3">
                <div className="text-2xl">{getMoodIcon(entry.mood)}</div>
                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-0.5">
                    <span className="bg-purple-100 text-purple-500 rounded px-2 text-xs font-semibold">{entry.day}</span>
                    {entry.tags.map((t) => (
                      <span key={t} className="bg-pink-100 text-pink-500 rounded-full px-2 py-0.5 text-xs font-semibold mr-1">#{t}</span>
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm max-h-12 overflow-hidden line-clamp-2" dangerouslySetInnerHTML={{ __html: entry.notes }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
