
import { useEffect, useState } from "react";

// Tips rotate, fade in/out
const TIPS = [
  "Take a slow, deep breath.",
  "Close your eyes for a moment.",
  "Give yourself permission to take breaks.",
  "Remember: feelings come and go.",
  "You're doing better than you think.",
  "Smile gently at yourself.",
];

export default function CalmingTips() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TIPS.length);
        setVisible(true);
      }, 350);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center mt-1 mb-3 min-h-[26px]">
      <span
        className={`transition-opacity duration-500 bg-palette-beige/80 px-3 py-1 rounded-full shadow-sm text-base text-[#A389D3] font-medium italic 
        ${visible ? "opacity-100" : "opacity-0"}
        animate-fade-in`}
      >
        {TIPS[idx]}
      </span>
    </div>
  );
}
