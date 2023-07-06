// BaseUrl.js 用于导出生产环境或测试环境下的接口前缀
const URL_ENV = {
    // 开发环境  Development
    DEV: {
        BMDURL: 'http://localhost:3010',
        UPLOADURL: 'http://localhost:9000'
    },
    // 生产环境  Production
    PRO: {
        BMDURL: 'https://web.codeboy.com/bmdapi',
        UPLOADURL: 'https://web.codeboy.com/bmduploadapi'
    }
}
export default URL_ENV.DEV  // 导出某一个环境的URL即可