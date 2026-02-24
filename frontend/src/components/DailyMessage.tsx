import { useUsersStore } from "../hooks/useUsersStore";

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

  // Daftar pesan yang berbeda untuk setiap hari
  const dailyQuotes = [
    "Waktunya istirahat dan evaluasi diri untuk minggu depan!", // Minggu (0)
    "Awal minggu yang baru! Yuk mulai kebiasaan baikmu.", // Senin (1)
    "Tetap fokus dan pertahankan streak-mu hari ini!", // Selasa (2)
    "Sudah pertengahan minggu, jangan sampai kendor!", // Rabu (3)
    "Sedikit lagi menuju akhir pekan. Ayo selesaikan targetmu.", // Kamis (4)
    "Jum'at semangat! Selesaikan habitmu sebelum bersantai.", // Jum'at (5)
    "Akhir pekan tiba! Tapi jangan lupa jalankan habit harianmu ya." // Sabtu (6)
  ];

      return (
    <div className="col-span-full relative overflow-hidden bg-white rounded-xl px-6 py-3 mb-4 shadow-sm border border-gray-200">
      {/* Aksen warna di sebelah kiri */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-amber-400 to-orange-500"></div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Selamat Hari {hari[Witchday]}, <span className="text-amber-500">{name || "Sobat"}</span>!
        </h2>
        <p className="text-gray-500 font-medium">
          {dailyQuotes[Witchday]}
        </p>
      </div>
    </div>
  );


}
