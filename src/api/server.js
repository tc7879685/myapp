import axios from 'axios'
import  {Toast,Modal} from 'antd-mobile'


/**
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */
const isDev = process.env.NODE_ENV === 'development';
class Server{
    timeOutReLogin = ()=>{
        let login_weixinStr =  sessionStorage.getItem("login_weixin")
        if(login_weixinStr){
            let login_weixin = JSON.parse(login_weixinStr)
            let visit_way = login_weixin.visit_way
            let weixin_pk = login_weixin.weixinpk
            let openid = login_weixin.openid
            let isWeixin = 0;
            window.location.href='/cms/wx/index.html?#/'+visit_way+'/'+weixin_pk+'/'+openid+'/'+isWeixin
        }else {
             window.location.href='/cms/wx/index.html?#/0/0/0/0'
        }
    }

    axios(method, url, data){
        let countX = 1;
        return new Promise((resolve, reject) => {
            if(!isDev){
                sessionStorage.setItem("isApp",1)
            }
            let _option = {
                method,
                url,
                baseURL: isDev ? '/cms/' : '/cms/',
                timeout: 30000,
                params: null,
                data: data,
                withCredentials: true,  //是否携带cookie发起请求
                validateStatus: (status)=> {
                    if(status == 500){
                        Toast.fail('系统异常，请联系管理员!')
                        return;
                    }
                    return status >= 200 && status < 300
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
                ],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    "Access-Control-Allow-Credentials": true
                }
            }
            axios.request(_option).then(res => {
                //账号在别处登录，
                let isTrue = true;;
                if(typeof res.data === 'string'){
                    if(res.data.indexOf('app_otherLogin')>-1){
                        throw new Error('APP_OTHER_LOGIN')
                        return
                    }
                    //账号登录超时
                    if(res.data.indexOf('app_timeoutrLogin')>-1){
                       // resolve([])
                       // reject('APP_TIMEOUT_LOGIN')
                        throw new Error('APP_TIMEOUT_LOGIN')

                        return
                    }
                 }
                 resolve(typeof res.data === 'object'? res.data:JSON.parse(res.data))
            },error =>{
                if (error.response) {
                    reject(error.response.data)
                } else{
                   reject(error)
                }
            }
            ).catch(reason =>{
                if(reason.message == 'APP_OTHER_LOGIN'){
                    sessionStorage.setItem("login_status",true); //登录状态
                   // reject('您的账号在别处登录')
                    Modal.alert("提示",'您的账号在别处登录，请注意账号安全!',[ {text: '确认', onPress: () =>{
                            this.timeOutReLogin();
                      }}]);
                    return
                }
                if(reason.message == 'APP_TIMEOUT_LOGIN'){
                    sessionStorage.setItem("login_status",true); //登录状态
                   // reject('您的账号登录已超时')
                    Modal.alert("提示",'您的账号登录已超时!',[ {text: '确认', onPress: () =>{
                            this.timeOutReLogin();
                        }}]);
                    return
                }
            })
       })
    }
}

export  default  Server
