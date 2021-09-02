import axios from "axios";
import CONFIG_INITIAL_STATE  from '../service/config';

const client = axios.create({baseURL: CONFIG_INITIAL_STATE.BASE_URL});
//axios.defaults.withCredentials = true

//Request interceptor
client.interceptors.request.use(
    function (config) {
        let token = JSON.parse(localStorage.getItem('token'));
        console.log("token: ", token)
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (err) {
        throw new Error(err);
    }
);

const APIServices = {
    // User //
    register(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/postAkun`,
                data: data
            },
            { crossdomain: true }
        )
    },

    verifikasi(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/getVerifikasiAkun/${data.no_identitas}/${data.kode_otp}`,
            },
            { crossdomain: true }
        )
    },

    postImage(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/upload/postUploadImage`,
                data: data
            },
            { crossdomain: true }
        )
    },

    // login(data){
    //     return client.request(
    //         {
    //             method: "post",
    //             url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/login`,
    //             data: data
    //         },
    //         { crossdomain: true }
    //     )
    // },

    getJurusan(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/getJurusan`,
            },
            {crossdomain: true }
        )
    },

    getProdi(id_jurusan){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/getProdi/${id_jurusan}`,
            },
            {crossdomain: true }
        )
    },

    getDataDokter(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getDokter`,
            },
            {crossdomain: true }
        )
    },

    getAllDokter(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getAllDokter`,
            },
            {crossdomain: true }
        )
    },
    
    getAllDataDokter(current, limit){
        return client.request(
            {
                method: "get",
                //need changes
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getAllDataDokter?page=${current}&limit=${limit}`,
            },
            {crossdomain: true }
        )
    },

    putDataDokter(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/putProfilDokter/${data.id_dokter}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataDokter(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/postDokter`,
                data: data
            },
            { crossdomain: true }
        )
    },

    deleteDataDokter(data){
        return client.request(
            {
                method: "delete",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/deleteDokter/${data}`,
            },
            { crossdomain: true }
        )
    },

    getDataStaf(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getStaf`,
            },
            {crossdomain: true }
        )
    },

    getAllStaf(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getAllStaf`,
            },
            {crossdomain: true }
        )
    },

    getAllDataStaf(current, limit){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getAllDataStaf?page=${current}&limit=${limit}`,
            },
            {crossdomain: true }
        )
    },

    putDataStaf(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/putProfilStaf/${data.id_staf}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataStaf(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/postStaf`,
                data: data
            },
            { crossdomain: true }
        )
    },

    deleteDataStaf(data){
        return client.request(
            {
                method: "delete",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/deleteStaf/${data}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getDataPasien(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getPasien`,
            },
            {crossdomain: true }
        )
    },

    getAllPasien(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getAllPasien`,
            },
            {crossdomain: true }
        )
    },

    getAllDataPasien(nama, kategori, current, limit){
        return client.request(
            {
                method: "get", 
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getAllPasien?nama=${nama}&kategori=${kategori}&page=${current}&limit=${limit}`,
            },
            {crossdomain: true }
        )
    },

    getAllPasien(){
        return client.request(
            {
                method: "get", 
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getAllPasien?paginate=false`,
            },
            {crossdomain: true }
        )
    },

    putDataPasien(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/putProfilPasien/${data.id_pasien}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataPasien(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/postPasien`,
                data: data
            },
            { crossdomain: true }
        )
    },

    deleteDataPasien(data){
        return client.request(
            {
                method: "delete",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/deletePasien/${data}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getDataPelayanan(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/getPelayanan`,
            },
            {crossdomain: true }
        )
    },

    postDataPelayanan(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/postPelayanan`,
                data: data
            },
            { crossdomain: true }
        )
    },

    putDataPelayanan(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/putPelayanan/${data.id_pelayanan}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    deleteDataPelayanan(data){
        return client.request(
            {
                method: "delete",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/deletePelayanan/${data}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getDataJadwal(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/getJadwal`,
            },
            {crossdomain: true }
        )
    },

    putDataJadwal(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/putJadwal/${data.id_jadwal}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getDataProfil(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/getProfil`,
            },
        )    
    },

    putDataProfil(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/putProfil`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getExportDataPasien(data){
        return client.request(
            {
                method: "get",
                responseType: 'blob',
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getExportPasien?year=${data.tahun}&month=${data.bulan}`,
            },
        )    
    },

    getRiwayatKunjungan(data, tanggal, current, limit){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/getRiwayatKunjungan?id_pasien=${data}&tanggal=${tanggal}&page=${current}&limit=${limit}`,
            },
            {crossdomain: true }
        )
    },

    postKunjungan(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/postKunjungan`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getKunjungan(data, id, current, limit){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/getKunjungan?tanggal=${data}&id=${id}&page=${current}&limit=${limit}`,
            },
            {crossdomain: true }
        )
    },

    getExportRiwayatKunjungan(data){
        return client.request(
            {
                method: "get",
                responseType: 'blob',
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/getExportKunjungan?year=${data.tahun}&month=${data.bulan}`,
            },
        )    
    },

    postRekamMedis(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/postRekamMedis`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getRekamMedisUmum(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/getRekamMedisUmum?id_pasien=${data}`,
            },
            {crossdomain: true }
        )
    },

    getRekamMedisGigi(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/rekam_medis/getRekamMedisGigi?id_pasien=${data}`,
            },
            {crossdomain: true }
        )
    },

    getAntreanUmum(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/getAntreanUmum`,
            },
            {crossdomain: true }
        )
    },

    getLastAntreanUmum(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/getLastAntreanUmum`,
            },
            {crossdomain: true }
        )
    },

    getAntreanGigi(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/getAntreanGigi`,
            },
            {crossdomain: true }
        )
    },

    getLastAntreanGigi(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/getLastAntreanGigi`,
            },
            {crossdomain: true }
        )
    },

    getNewAntrean(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/getNewAntrean?id_poli=${data}`,
            },
            {crossdomain: true }
        )
    },

    async postAntrean(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/postAntrean`,
                data: data
            },
            { crossdomain: true }
        )
    },

    putAntrean(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/antrean/putAntrean/${data.id_antrean}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getKonsultasi(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/konsultasi/getKonsultasi?id_dokter=${data.id_dokter}&id_pasien=${data.id_pasien}`,
            },
            {crossdomain: true }
        )
    },

    getPesan(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/konsultasi/getPesan?id_konsultasi=${data}`,
            },
            {crossdomain: true }
        )
    },

    postPesan(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/konsultasi/postPesan`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postKonsultasi(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/konsultasi/postKonsultasi`,
                data: data
            },
            { crossdomain: true }
        )
    },
}

export { APIServices }