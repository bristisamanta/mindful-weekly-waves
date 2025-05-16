
import { useEffect, useState } from "react";

// Minimal fade animation for quote rotations
const quotes = [
  "“Self-care is not selfish. You cannot serve from an empty vessel.” – Eleanor Brown",
  "“Feelings are much like waves; we can't stop them from coming but we can choose which one to surf.” – Jonatan Mårtensson",
  "“There is hope, even when your brain tells you there isn’t.” – John Green",
  "“You don't have to control your thoughts. You just have to stop letting them control you.” – Dan Millman",
];

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setFade(true);
      }, 400); // match the CSS fade duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-14 flex items-center justify-center relative overflow-hidden">
      <span
        className={`block transition-opacity duration-400 ${fade ? "opacity-100" : "opacity-0"} text-center italic text-sm md:text-base px-4`}
        style={{ minHeight: "2rem" }}
      >
        {quotes[index]}
      </span>
    </div>
  );
}
