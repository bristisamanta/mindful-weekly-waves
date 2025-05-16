
import { useState } from "react";
import {
  Smiley,
  Frown,
  Meh,
  Heart,
  Angry,
  Confetti,
  Folders,
  Cloud,
  Sun,
} from "phosphor-react";

type MoodType = "happy" | "sad" | "neutral" | "love" | "angry" | "calm" | "excited" | "tired";

const moods = [
  { type: "happy", label: "Happy", icon: Smiley, color: "#FDE68A" },
  { type: "sad", label: "Sad", icon: Frown, color: "#B6E0FE" },
  { type: "neutral", label: "Meh", icon: Meh, color: "#D1D5DB" },
  { type: "love", label: "Love", icon: Heart, color: "#FFDEE2" },
  { type: "angry", label: "Angry", icon: Angry, color: "#FEB2B2" },
  { type: "calm", label: "Calm", icon: Cloud, color: "#D6F5E3" },
  { type: "excited", label: "Excited", icon: Confetti, color: "#9b87f5" },
  { type: "tired", label: "Tired", icon: Folders, color: "#F1F0FB" },
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
        <mood.icon size={48} color={mood.color} weight={value === mood.type ? "fill" : "regular"} />
        <span className="mt-2 text-xs">{mood.label}</span>
      </div>
    ))}
  </div>
);

export default MoodSelector;
