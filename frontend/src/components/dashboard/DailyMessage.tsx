import { useUsersStore } from "../../hooks/useUsersStore";

export default function DailyMessage() {
  const { name } = useUsersStore();
  const hari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const Witchday = new Date().getDay();

  const dailyQuotes = [
    "Waktunya istirahat dan evaluasi diri untuk minggu depan!",
    "Awal minggu yang baru! Yuk mulai kebiasaan baikmu.",
    "Tetap fokus dan pertahankan streak-mu hari ini!",
    "Sudah pertengahan minggu, jangan sampai kendor!",
    "Sedikit lagi menuju akhir pekan. Ayo selesaikan targetmu.",
    "Jum'at semangat! Selesaikan habitmu sebelum bersantai.",
    "Akhir pekan tiba! Tapi jangan lupa jalankan habit harianmu ya.",
  ];

  return (
    <div className="glass-card relative overflow-hidden px-5 py-4 sm:px-6 sm:py-5">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-amber-400 to-orange-500 rounded-l-xl" />

      <div className="pl-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-0.5">
          Selamat Hari {hari[Witchday]},{" "}
          <span className="text-amber-500">{name || "Sobat"}</span>!
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          {dailyQuotes[Witchday]}
        </p>
      </div>
    </div>
  );
}
