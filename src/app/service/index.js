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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/createAkun`,
                data: data
            },
            { crossdomain: true }
        )
    },

    verifikasi(data){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/verifikasiAkun/${data.no_telepon}/${data.kode_otp}`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getDokterById`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/updateProfilDokter/${data.no_telepon}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataDokter(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/createDokter`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getStafById`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/ubahProfilStaf/${data.no_telepon}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataStaf(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/createStaf`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getPasienById`,
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

    putDataPasien(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/ubahProfilPasien/${data.no_telepon}`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postDataPasien(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/createPasien`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/tambahPelayanan`,
                data: data
            },
            { crossdomain: true }
        )
    },

    putDataPelayanan(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/updatePelayanan/${data.id_pelayanan}`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/updateJadwal/${data.id_jadwal}`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/updateProfil`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getExportDataPasien(){
        return client.request(
            {
                method: "get",
                responseType: 'blob',
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/exportPasien`,
            },
        )    
    },
}

export { APIServices }