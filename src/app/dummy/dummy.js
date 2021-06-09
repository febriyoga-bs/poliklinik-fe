/* eslint-disable import/no-anonymous-default-export */
const dataProfil = [
    {
        gambar: "gambar.jpg",
        deskripsi: "Poliklinik POLBAN merupakan Unit Pelayanan Kesehatan bagi civitas akademika POLBAN dan masyarakat umum di sekitarnya. Terdiri dari dua poli yaitu, Poli Umum dan Poli Gigi."
    }
]

const dataPasien = [
    {
        id_pasien: "P01001",
        no_telepon: "081212341234",
        nama: "Andi Fauzy",
        tanggal_lahir: "2000/01/11",
        jenis_kelamin: "Laki-laki",
        kategori: "Mahasiswa",
        nomor_identitas: "181511007",
        alamat: "GBI, Bojongsoang",
        jurusan: "Jurusan Teknik Komputer",
        prodi: "D3 - Teknik Informatika"
    },
    {
        id_pasien: "P01002",
        no_telepon: "081212345678",
        nama: "Rofiq Suhay",
        tanggal_lahir: "06/11/1997",
        jenis_kelamin: "Laki-laki",
        kategori: "Mahasiswa",
        nomor_identitas: "181511031",
        alamat: "Pangalengan",
        jurusan: "Jurusan Teknik Komputer",
        prodi: "D3 - Teknik Informatika"
    },
    {
        id_pasien: "P01003",
        no_telepon: "081212345678",
        nama: "Fahmi Widia",
        tanggal_lahir: "20/10/1999",
        jenis_kelamin: "Laki-laki",
        kategori: "Mahasiswa",
        nomor_identitas: "181511012",
        alamat: "Banjaran",
        jurusan: "Jurusan Teknik Komputer",
        prodi: "D3 - Teknik Informatika"
    },
    {
        id_pasien: "P02004",
        no_telepon: "081212340000",
        nama: "Steven Rangga",
        tanggal_lahir: "1995/12/12",
        jenis_kelamin: "Laki-laki",
        kategori: "Umum",
        nomor_identitas: "181511007",
        alamat: "Bandung",
    },
]

const dataDokter = [
    {
        id_dokter: "D01001",
        no_telepon: "081243214321",
        nama: "dr. Eva Dianita",
        spesialisasi: "Dokter Umum",
        avatar: "gambar.jpg"
    },
    {
        id_dokter: "D01002",
        no_telepon: "081243214321",
        nama: "dr. Iskandar",
        spesialisasi: "Dokter Umum",
        avatar: "gambar.jpg"
    },
    {
        id_dokter: "D02001",
        no_telepon: "081243214321",
        nama: "drg. Novianti",
        spesialisasi: "Dokter Gigi",
        avatar: "gambar.jpg"
    },
    {
        id_dokter: "D02002",
        no_telepon: "081243214321",
        nama: "drg. Weni Fitriani",
        spesialisasi: "Dokter Gigi",
        avatar: "gambar.jpg"
    }
]

const dataStaf = [
    {
        id_staf: "S01001",
        no_telepon: "081243214321",
        nama: "Wastu K. Purbandini",
        jabatan: "Ketua UPT Kesehatan",
        avatar: "gambar.jpg"
    },
    {
        id_staf: "S02001",
        no_telepon: "081243214321",
        nama: "Edwin",
        jabatan: "Petugas Administrasi",
        avatar: "gambar.jpg"
    }
]

const dataJadwal = [
    {
        id_jadwal: 1,
        id_dokter: ["D01001", "D02001"],
        id_poli: [1],
        dokter: "dr. Eva Dianita, drg. Novianti",
        poli: "Umum, Gigi",
        hari: "Senin",
        jam_operasional: "09.00-12.00"
    },
    {
        id_jadwal: 2,
        id_dokter: ["D01002", "D02002"],
        id_poli: [1],
        dokter: "dr. Iskandar, drg. Weni Fitriani",
        poli: "Umum",
        hari: "Selasa",
        jam_operasional: "09.00-12.00"
    },
    {
        id_jadwal: 3,
        id_dokter: ["D01001", "D02002"],
        id_poli: [2],
        dokter: "dr. Eva Dianita, drg. Weni Fitriani",
        poli: "Gigi",
        hari: "Rabu",
        jam_operasional: "09.00-12.00"
    },
    {
        id_jadwal: 4,
        id_dokter: ["D01002", "D02001"],
        id_poli: [2],
        dokter: "dr. Iskandar, drg. Novianti",
        poli: "Umum",
        hari: "Kamis",
        jam_operasional: "09.00-12.00"
    },
    {
        id_jadwal: 5,
        id_dokter: ["D01001"],
        id_poli: [1],
        dokter: "dr. Eva Dianita",
        poli: "Umum",
        hari: "Jumat",
        jam_operasional: "09.00-12.00"
    }
]

const dataPelayanan = [
    {
        id_pelayanan: 1,
        id_poli: 1,
        poli: "Umum",
        nama: "Cek Kesehatan",
        tarif_umum: 15000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 0,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 2,
        id_poli: 2,
        poli: "Gigi",
        nama: "Pemeriksaan Gigi",
        tarif_umum: 25000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 0,
        tarif_keluarga_staf: 0
    },
    {
        id_pelayanan: 3,
        id_poli: 2,
        poli: "Gigi",
        nama: "Penambalan Amalgam",
        tarif_umum: 60000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 10000,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 4,
        id_poli: 2,
        poli: "Gigi",
        nama: "Pencabutan Gigi Tetap",
        tarif_umum: 60000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 10000,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 5,
        id_poli: 2,
        poli: "Gigi",
        nama: "Pembersihan Karang Gigi",
        tarif_umum: 60000,
        tarif_mahasiswa: 15000,
        tarif_staf_kampus: 30000,
        tarif_keluarga_staf: 30000
    }
]

const listJurusan = [
    {
        id: 1,
        nama: "Akuntansi"
    },
    {
        id: 2,
        nama: "Administrasi Niaga"
    },
    {
        id: 3,
        nama: "Bahasa Inggris"
    },
    {
        id: 4,
        nama: "Teknik Elektro"
    },
    {
        id: 5,
        nama: "Teknik Kimia"
    },
    {
        id: 6,
        nama: "Teknik Komputer"
    },
    {
        id: 7,
        nama: "Teknik Konversi Energi"
    },
    {
        id: 8,
        nama: "Teknik Mesin"
    },
    {
        id: 9,
        nama: "Teknik Refrigerasi dan Tata Udara"
    },
    {
        id: 10,
        nama: "Teknik Sipil"
    },
    {
        id: 11,
        nama: "Program Magister Terapan"
    },
]

const listProdi = [
    {
        id: 1,
        id_jurusan: 1,
        nama: "D3 Akuntansi"
    },
    {
        id: 2,
        id_jurusan: 1,
        nama: "D3 Keuangan dan Perbankan"
    },
    {
        id: 3,
        id_jurusan: 1,
        nama: "D4 Akuntansi Manajemen Pemerintahan"
    },
    {
        id: 4,
        id_jurusan: 1,
        nama: "D4 Keuangan Syariah"
    },
    {
        id: 5,
        id_jurusan: 1,
        nama: "D4 Akuntansi"
    },
    {
        id: 6,
        id_jurusan: 2,
        nama: "D3 Administrasi Bisnis"
    },
    {
        id: 7,
        id_jurusan: 2,
        nama: "D3 Manajemen Pemasaran"
    },
    {
        id: 8,
        id_jurusan: 2,
        nama: "D3 Usaha Perjalanan Wisata"
    },
    {
        id: 9,
        id_jurusan: 2,
        nama: "D4 Administrasi Bisnis"
    },
    {
        id: 10,
        id_jurusan: 2,
        nama: "D4 Manajemen Pemasaran"
    },
    {
        id: 11,
        id_jurusan: 2,
        nama: "D4 Manajemen Aset"
    },
]

export default {
    dataProfil,
    dataPasien,
    dataDokter,
    dataStaf,
    dataJadwal,
    dataPelayanan,
    listJurusan,
    listProdi,
}