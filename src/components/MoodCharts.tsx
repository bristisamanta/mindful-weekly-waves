
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Line, LineChart, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const moodColors: Record<string, string> = {
  happy: "#FDE68A",
  sad: "#B6E0FE",
  neutral: "#D1D5DB",
  love: "#FFDEE2",
  angry: "#FEB2B2",
  calm: "#D6F5E3",
  excited: "#9b87f5",
  tired: "#F1F0FB",
};

export function MoodRadarChart({ data }: { data: { mood: string, value: number }[] }) {
  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold text-md mb-2 text-center">Weekly Mood Radar</h3>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="mood" />
          <PolarRadiusAxis angle={30} domain={[0, 7]} />
          <Radar name="Mood Intensity" dataKey="value" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.4} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MoodLineChart({ data }: { data: { day: string, mood: string, value: number }[] }) {
  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold text-md mb-2 text-center">Mood Over Week</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 7]} />
          <Tooltip />
          <Line dataKey="value" stroke="#9b87f5" strokeWidth={3} dot={{ r: 6 }} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TagPieChart({ data }: { data: { tag: string, count: number }[] }) {
  const colors = ["#D6BCFA", "#B6E0FE", "#FFDEE2", "#FDE68A", "#F1F0FB", "#FEB2B2", "#D6F5E3"];
  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold text-md mb-2 text-center">Tag Usage Frequency</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="tag"
            cx="50%"
            cy="50%"
            outerRadius={72}
            fill="#8884d8"
            label
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
