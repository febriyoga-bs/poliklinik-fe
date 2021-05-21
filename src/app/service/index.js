import axios from "axios";
import CONFIG_INITIAL_STATE  from '../service/config';

const client = axios.create({baseURL: CONFIG_INITIAL_STATE.BASE_URL});
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
        let token = '$2y$10$ZTCNdFS0558IJGVOOBbR7u1VqVtibwRza3dQajGJYG5KF1TOCaO.6';
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
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/user/pendaftaran`,
                data: data
            },
            { crossdomain: true }
        )
    },

    getDataUser(data) {
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/user/viewProfile?email=${data}`,
            },
            { crossdomain: true }
        )
    },

    getVerification(id, code) {
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/user/verifikasiAkun?id=${id}&code=${code}`,
            },
            { crossdomain: true }
        )
    },

    postEditProfile(data) {
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/user/editProfile`,
                data: data
            },
            { crossdomain: true }
        )
    },

    postForgotPass(data){
        return client.request(
            {
                method: "post",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/user/forgetPassword`,
                data: data
            },
            { crossdomain: true }
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
    getDataStaf(){
        return client.request(
            {
                method: "get",
                url: `${CONFIG_INITIAL_STATE.BASE_URL}/api/staf/getStafById`,
            },
            {crossdomain: true }
        )
    },
}

export { APIServices }