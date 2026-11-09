// Semua isi portofolio ada di file ini. Ubah teks di sini, tidak perlu menyentuh App.jsx.
// Gambar: taruh file di folder public/images/ dengan nama yang sama seperti di bawah.
// Kalau file belum ada, otomatis tampil placeholder "Belum ada gambar".

export const PROFILE = {
  name: "Adha Raka Firmansyah",
  role: "Full-Stack Developer",
  company: "PT. Uwu Jump Indonesia",
  location: "Subang, Jawa Barat",
  email: "rakafirmansyah292@gmail.com",
  site: "portofolio-adharaka.netlify.app",
  photo: "/images/foto-profil.png", // foto di kartu ID
};

export const EXPERIENCE = [
  { when: "Agu 2025 - sekarang", title: "Staff IT, Full-Stack Developer", org: "PT. Uwu Jump Indonesia", stack: ["Laravel","PHP","JavaScript","Bootstrap","REST API","SQL Server","MySQL"], points: [
    "Membangun dan memelihara aplikasi web internal dengan Laravel, PHP, JavaScript, dan Bootstrap berdasarkan mockup UI/UX dan ERD.",
    "Membuat RESTful API, autentikasi, dashboard monitoring, modul transaksi, approval workflow, dan pengelolaan dokumen.",
    "Mengoptimalkan query, debugging, testing, serta meningkatkan performa dan keamanan aplikasi." ] },
  { when: "Mei - Agu 2025", title: "Staf Departemen Digitalisasi", org: "PT. Velasto Indonesia", stack: ["Grafana","C#","ASP.NET","SQL Server","IoT"], points: [
    "Membuat dashboard produksi dengan Grafana, dan Dashboard Monitoring Harian dengan C# dan ASP.NET.",
    "Menyatukan data SQL, Excel, dan perangkat IoT untuk visualisasi KPI produksi." ] },
  { when: "Mar - Mei 2025", title: "Front End dan Full Stack Developer", org: "KPPBC TMP A Purwakarta (Bea Cukai)", stack: ["Laravel","PHP"], points: [
    "Mengembangkan program monitoring subkon untuk memantau data masuk dan keluar serta validasi dokumen.",
    "Berkontribusi pada AlQuran-Journey, GPSTracker, dan Puspa dengan Laravel dan PHP." ] },
  { when: "Nov 2024 - Jan 2025", title: "Administrator Finish Product Godown CP3", org: "PT. Indorama Synthetics Tbk", stack: ["ERP Oracle"], points: [
    "Mencatat pengiriman di ERP Oracle dan mengarsipkan dokumen produksi dan logistik." ] },
];

// image: nama file di public/images/. link: isi kalau ada demo atau repo (boleh dikosongkan).
export const PROJECTS = [
  { name: "Data Product System / ERP", stack: "Laravel, PHP, SQL Server", image: "/images/proyek-01.png", link: "", desc: "Prototype ERP web: dashboard, master data, order, progress, laporan harian, jadwal, dan modul procurement dengan approval serta dokumen PO." },
  { name: "Monitoring Subkon Bea Cukai", stack: "Laravel, PHP, SQL Server", image: "/images/proyek-02.png", link: "", desc: "Memantau data masuk dan keluar perusahaan ekspor-impor di Purwakarta, lengkap dengan validasi data." },
  { name: "Dashboard Hose, RVI & Molded", stack: "ASP.NET, C#, SQL Server, Grafana", image: "/images/proyek-03.png", link: "", desc: "Dashboard produksi harian yang menyatukan data SQL, Excel, dan IoT untuk memantau KPI." },
  { name: "SMV Management System", stack: "PHP, MySQL", image: "/images/proyek-04.png", link: "", desc: "Mengelola Standard Minute Value: style, proses, operator, filter dinamis, serta import dan export Excel." },
  { name: "Supplier Performance", stack: "PHP, MySQL", image: "/images/proyek-05.png", link: "", desc: "Evaluasi supplier dari inspeksi QC: tren defect bulanan, grading A sampai D, dan laporan RCA & CAP." },
  { name: "Axentra", stack: "PHP, MySQL", image: "/images/proyek-06.png", link: "", desc: "Manajemen aset IT: inventaris perangkat, spesifikasi, lokasi, status, dan permintaan IT Support." },
  { name: "ProdQR", stack: "PHP, MySQL", image: "/images/proyek-07.png", link: "", desc: "Pencatatan dan pelacakan proses produksi dengan QR Code, menggantikan catatan manual." },
  { name: "People & Organizational Development", stack: "Laravel, PHP, MySQL", image: "/images/proyek-08.png", link: "", desc: "Penilaian akhir tahun karyawan: proses nilai, rekap hasil, dan laporan kinerja semua departemen." },
  { name: "Inspection Report QA", stack: "PHP, MySQL", image: "/images/proyek-09.png", link: "", desc: "Inspeksi barang oleh QA: hasil pengecekan, unggah foto bukti, dan laporan inspeksi." },
  { name: "Smart Ride", stack: "Flutter, PHP, MySQL", image: "/images/proyek-10.png", link: "", desc: "Aplikasi Android pemesanan kendaraan operasional dengan approval manager dan status real-time." },
  { name: "Psikotest Online Papikostik", stack: "Laravel, PHP, MySQL", image: "/images/proyek-11.png", link: "", desc: "Psikotes online untuk rekrutmen dengan perhitungan hasil dan analisis kepribadian otomatis." },
  { name: "Blast Email THR", stack: "PHP, MySQL, SMTP", image: "/images/proyek-12.png", link: "", desc: "Pengiriman email massal dengan template dinamis dan laporan status kirim memakai PHPMailer." },
];

// Tambah sertifikat dengan menyalin satu baris.
export const CERTS = [
  { title: "MikroTik Certified Network Associate (MTCNA)", meta: "Sertifikasi", image: "/images/sertifikat-01.jpg" },
  { title: "Sertifikat praktik kerja lapangan", meta: "PT. Tera Data Indonusa", image: "/images/sertifikat-02.jpg" },
  { title: "Sertifikat magang", meta: "KPPBC TMP A Purwakarta", image: "/images/sertifikat-03.png" },
  { title: "Sertifikat praktik kerja lapangan", meta: "PT. Indorama Synthetics TBK polyester division", image: "/images/sertifikat-04.jpg" },
];

// Nama kategori dipakai oleh CSS untuk fitur sorot, jadi jangan diganti.
export const SKILLS = {
  Backend: ["Laravel", "RESTful API", "Autentikasi", "Otorisasi", "Validasi data"],
  Bahasa: ["PHP", "C#", "JavaScript", "SQL", "HTML5 dan CSS3"],
  Framework: ["ASP.NET Core / MVC", "Bootstrap", "Tailwind CSS", "Flutter"],
  Database: ["MySQL", "SQL Server", "PostgreSQL", "Oracle"],
  Tools: ["Git dan GitHub", "Postman", "Grafana", "Figma", "PHPMailer"],
  Industri: ["IoT Data Integration", "Production Monitoring", "MikroTik", "Jaringan"],
};

export const MARQUEE = ["Laravel", "PHP", "C#", "ASP.NET", "Flutter", "SQL Server", "MySQL", "PostgreSQL", "Grafana", "REST API", "MikroTik"];
