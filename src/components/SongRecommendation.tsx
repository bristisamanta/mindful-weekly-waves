
import { Headphones } from "lucide-react";

const SONGS = [
  {
    name: "Weightless – Marconi Union",
    url: "https://open.spotify.com/track/2JzZzZUQj3Qff7wapcbKjc",
    desc: "Scientifically recognized as calming.",
  },
  {
    name: "Clair de Lune – Debussy",
    url: "https://www.youtube.com/watch?v=CvFH_6DNRCY",
    desc: "Soft piano, very soothing.",
  },
  {
    name: "Bloom – ODESZA",
    url: "https://www.youtube.com/watch?v=Z7dLU6fk9QY",
    desc: "Gentle, uplifting electronic track.",
  },
];

const pickSong = () => SONGS[Math.floor(Math.random() * SONGS.length)];

export default function SongRecommendation() {
  const song = pickSong();
  return (
    <div className="mt-2 mb-4 flex items-center gap-3 bg-lavender-50/50 rounded-xl px-4 py-3 shadow transition animate-fade-in">
      <Headphones className="text-[#A389D3] w-7 h-7 flex-shrink-0" />
      <div>
        <p className="text-base leading-snug font-semibold text-[#8249af]">
          Try this calming song:&nbsp;
          <a
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#C28FEF] hover:text-[#9b87f5] transition-colors"
          >
            {song.name}
          </a>
        </p>
        <span className="text-sm text-gray-500">{song.desc}</span>
      </div>
    </div>
  );
}
