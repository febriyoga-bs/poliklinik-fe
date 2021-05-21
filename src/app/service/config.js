/* eslint-disable import/no-anonymous-default-export */
// setting your configuration server

//---- please insert server your developer BE in here and set
const FE_NAME = "Satria"
const BE_NAME = "Widianto"
const BASE_URL_BE = "http://localhost:8000/"
//const BASE_URL_LOGIN_BE = "http://25.30.225.211:9015"  //api pakai login
//const BASE_URL_NOAUTH_BE = "http://25.30.225.211:9012" //api pakai no auth

//---- please change comment if you use server BE local 
const isServerBE = true
// const isServerBE = false

//---- please change comment if you use testmode
// const testMode = true
const testMode = false

//---- only for TECH LEAD
const isProd = false
// const isProd = true

export default  {
    FE_NAME: isServerBE ? FE_NAME : '',
    BE_NAME: isServerBE ? BE_NAME : '',
    isServer: isProd ? 'Production' : (isServerBE ? 'BE_DEVELOPER' : "Staging"),
    BASE_URL: isProd ? "https://api.candraplants.com" : (isServerBE ? BASE_URL_BE : "https://fahmi-server.azurewebsites.net"),
    COPYRIGHT: '20210112',
    VERSION: '1.0.1',
    TIMEOUT: 6000,
    TESTMODE: testMode
}