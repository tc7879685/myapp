import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development';

axios.defaults.withCredentials = true
const instance = axios.create({
    // baseURL是在proxyTable中会转发的配置，通过环境变量的判断，可以在开发和生产环境使用不同的url进行请求
    baseURL: isDev ? '/cms/' : '/cms/',
    timeout: 5000, //超时时间
    validateStatus(status) {
        // 一般来说，http status为200-300之间时，均判定为请求通过，你可以在这里修改这个配置(不建议修改)
        return status === 200
    },
    //转换数据的方法
    transformRequest: [
        function(data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }
        ]
    ,
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "Access-Control-Allow-Credentials": true
    }
});
export default instance