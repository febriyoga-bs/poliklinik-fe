/* eslint-disable import/no-anonymous-default-export */
// setting web configuration server

//----
const BASE_URL_BE = "http://25.70.2.196:8000"
//const BASE_URL_LOGIN_BE = "http://25.30.225.211:9015"  //api pakai login
//const BASE_URL_NOAUTH_BE = "http://25.30.225.211:9012" //api pakai no auth

//----
//const isProd = false
const isProd = true

export default  {
    isServer: isProd ? 'Production' : 'Development',
    BASE_URL: isProd ? "https://kota101.studio" : BASE_URL_BE,
    COPYRIGHT: 'KOTA 101',
    VERSION: '1.0.1',
    TIMEOUT: 6000,
}