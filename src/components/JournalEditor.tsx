
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type JournalEntryProps = {
  value: string;
  onChange: (v: string) => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

const predefinedTags = [
  "Work", "School", "Family", "Friends", "Exercise", "Calm", "Anxiety", "Motivation", "Success"
];

export default function JournalEditor({
  value,
  onChange,
  tags,
  onAddTag,
  onRemoveTag,
}: JournalEntryProps) {
  const [customTag, setCustomTag] = useState("");
  return (
    <div className="glass-card p-5 mb-8 animate-fadeIn">
      <div className="mb-3">
        <label className="font-semibold block mb-2">Journal Entry</label>
        <ReactQuill
          value={value}
          onChange={onChange}
          theme="snow"
          placeholder="How did your week go?"
          className="rounded-lg"
        />
      </div>
      <div className="my-2">
        <label className="font-semibold block mb-2">Tags</label>
        <div className="flex flex-wrap mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-badge relative"
              style={{ background: "#FFDEE2" }}
            >
              {tag}
              <button
                className="ml-1 text-xs text-gray-500 absolute right-1 top-0"
                onClick={() => onRemoveTag(tag)}
                aria-label="Remove tag"
                type="button"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {predefinedTags
            .filter((t) => !tags.includes(t))
            .map((tag) => (
              <button
                key={tag}
                className="tag-badge opacity-80 hover:opacity-100"
                onClick={() => onAddTag(tag)}
                type="button"
                style={{ background: "#D3E4FD" }}
              >
                {tag}
              </button>
            ))}
        </div>
        <form
          className="mt-2 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const tag = customTag.trim();
            if (tag && !tags.includes(tag)) {
              onAddTag(tag);
              setCustomTag("");
            }
          }}
        >
          <input
            className="border px-2 py-1 rounded text-xs"
            placeholder="Add custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
          />
          <button type="submit" className="bg-primary px-3 py-1 rounded text-white text-xs">Add</button>
        </form>
      </div>
    </div>
  );
}
