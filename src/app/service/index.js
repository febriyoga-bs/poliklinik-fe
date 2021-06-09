import axios from "axios";
import CONFIG_INITIAL_STATE  from '../service/config';

const client = axios.create({baseURL: CONFIG_INITIAL_STATE.BASE_URL});
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
//axios.defaults.withCredentials = true

//Request interceptor
client.interceptors.request.use(
    function (config) {
        // console.log(cookies.get('__cfduid'));
        // if (cookies.get('__cfduid')!==undefined) {
        //     config.headers['__cfduid']= cookies.get('__cfduid');
        // }
        // console.log(cookies.get('ci_session'));
        // if (cookies.get('ci_session')!==undefined) {
        //     config.headers['ci_session']= cookies.get('ci_session');
        //}
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/akun/buatAkun`,
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

    getDataDokter(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getDokterById`,
            },
            {crossdomain: true }
        )
    },

    getAllDataDokter(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/getAllDokter`,
            },
            {crossdomain: true }
        )
    },

    putDataDokter(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/dokter/ubahProfilDokter/${data.no_telepon}`,
                data: data
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

    getAllDataStaf(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getAllStaf`,
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

    getDataPasien(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getPasienById`,
            },
            {crossdomain: true }
        )
    },

    getAllDataPasien(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/pasien/getAllPasien`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/ubahPelayanan/${data.id_pelayanan}`,
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/ubahJadwal/${data.hari}`,
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
            {crossdomain: true }
        )    
    },

    putDataProfil(data){
        return client.request(
            {
                method: "put",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/informasi/updateProfil/`,
                data: data
            },
            { crossdomain: true }
        )
    },
}

export { APIServices }