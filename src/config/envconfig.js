// 全局配置
let baseUrl = ''
let imgUrl
if (process.env.NODE_ENV === 'development'){
 imgUrl = '/cms/'
    baseUrl = '/cms/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '/cms/'
  //imgUrl = '//elm.cangdu.org/img/'
}
export  {
  baseUrl,
  imgUrl
}

