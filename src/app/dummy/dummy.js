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
        tanggal_lahir: "Punteun, teu terang :(",
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
    }
]

const dataDokter = [
    {
        id_dokter: "D01001",
        no_telepon: "081243214321",
        nama: "dr. Iskandar",
        spesialisasi: "Dokter Umum",
        avatar: "gambar.jpg"
    },
    {
        id_dokter: "D01002",
        no_telepon: "081243214321",
        nama: "dr. Eva Dianita",
        spesialisasi: "Dokter Umum",
        avatar: "gambar.jpg"
    },
    {
        id_dokter: "D02001",
        no_telepon: "081243214321",
        nama: "drg. Novianti",
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
        id_dokter: ["D01001", "D01002"],
        id_poli: 1,
        hari: "Senin",
        jam_operasional: "09.00 - 12.00"
    },
    {
        id_jadwal: 1,
        id_dokter: ["D01001"],
        id_poli: 1,
        hari: "Selasa",
        jam_operasional: "09.00 - 12.00"
    },
    {
        id_jadwal: 1,
        id_dokter: ["D02001"],
        id_poli: 2,
        hari: "Rabu",
        jam_operasional: "09.00 - 12.00"
    },
    {
        id_jadwal: 1,
        id_dokter: ["D02001"],
        id_poli: 2,
        hari: "Kamis",
        jam_operasional: "09.00 - 12.00"
    },
    {
        id_jadwal: 1,
        id_dokter: ["D01001"],
        id_poli: 1,
        hari: "Jumat",
        jam_operasional: "09.00 - 12.00"
    }
]

const dataPelayanan = [
    {
        id_pelayanan: 1,
        id_poli: 1,
        nama: "Cek Kesehatan",
        tarif_umum: 15000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 0,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 2,
        id_poli: 2,
        nama: "Pemeriksaan Gigi",
        tarif_umum: 25000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 0,
        tarif_keluarga_staf: 0
    },
    {
        id_pelayanan: 3,
        id_poli: 2,
        nama: "Penambalan Amalgam",
        tarif_umum: 60000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 10000,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 4,
        id_poli: 2,
        nama: "Pencabutan Gigi Tetap",
        tarif_umum: 60000,
        tarif_mahasiswa: 0,
        tarif_staf_kampus: 10000,
        tarif_keluarga_staf: 10000
    },
    {
        id_pelayanan: 5,
        id_poli: 2,
        nama: "Pembersihan Karang Gigi",
        tarif_umum: 60000,
        tarif_mahasiswa: 15000,
        tarif_staf_kampus: 30000,
        tarif_keluarga_staf: 30000
    }
]

export default {
    dataProfil,
    dataPasien,
    dataDokter,
    dataStaf,
    dataJadwal,
    dataPelayanan
}