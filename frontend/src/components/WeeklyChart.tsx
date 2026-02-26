import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

export default function WeeklyChart() {
  const data = [
    { day: "Mon", count: 3 },
    { day: "Tue", count: 5 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 4 },
    { day: "Fri", count: 6 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 4 },
  ];

  return (
    <ResponsiveContainer>
      <BarChart data={data} className="pb-3">
        <Bar dataKey="count" fill="#ffe77d"/>
        <XAxis dataKey="day" />
      </BarChart>
    </ResponsiveContainer>
  );
}
