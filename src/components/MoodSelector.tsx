
import { useState } from "react";
import {
  Smile,
  Frown,
  Meh,
  Heart,
  Cloud,
  Sun,
  Folder,
  PartyPopper,
  Angry,
} from "lucide-react";

// Define types for moods
type MoodType =
  | "happy"
  | "sad"
  | "neutral"
  | "love"
  | "angry"
  | "calm"
  | "excited"
  | "tired";

const moods = [
  { type: "happy", label: "Happy", icon: Smile, color: "#FDE68A" },
  { type: "sad", label: "Sad", icon: Frown, color: "#B6E0FE" },
  { type: "neutral", label: "Meh", icon: Meh, color: "#D1D5DB" },
  { type: "love", label: "Love", icon: Heart, color: "#FFDEE2" },
  { type: "angry", label: "Angry", icon: Angry, color: "#FEB2B2" },
  { type: "calm", label: "Calm", icon: Cloud, color: "#D6F5E3" },
  { type: "excited", label: "Excited", icon: PartyPopper, color: "#9b87f5" },
  { type: "tired", label: "Tired", icon: Folder, color: "#F1F0FB" },
];

type MoodSelectorProps = {
  value?: MoodType;
  onChange: (mood: MoodType) => void;
};

const MoodSelector = ({ value, onChange }: MoodSelectorProps) => (
  <div className="flex flex-wrap gap-6 justify-center my-6">
    {moods.map((mood) => (
      <div
        key={mood.type}
        className={`emoji-hover flex flex-col items-center transition-all ${
          value === mood.type ? "ring-4 ring-primary/50 scale-110" : ""
        }`}
        role="button"
        aria-label={mood.label}
        tabIndex={0}
        onClick={() => onChange(mood.type as MoodType)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onChange(mood.type as MoodType);
        }}
      >
        <mood.icon size={48} color={mood.color} strokeWidth={value === mood.type ? 2.75 : 1.5} />
        <span className="mt-2 text-xs">{mood.label}</span>
      </div>
    ))}
  </div>
);

export default MoodSelector;
