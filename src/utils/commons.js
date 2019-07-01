/**
 * 存储localStoage
 * @param {*} name 
 * @param {*} content 
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 * @param {*} name 
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param {*} name 
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}


/**
 * 用于get方法后面参数的拼接，传入data是对象
 * @param {*} name 
 */
export const getUrlConcat = function (data) {
  let dataStr = ''; //数据拼接字符串
  let url = ''
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&')); // 去除掉最后一个"&"字符
    url = url + '?'+ dataStr;
  }
  return url
}

/**
 * 处理图片路径
 */
export const getImgPath = (path) => {
  //传递过来的图片地址需要处理后才能正常使用(path) {
    let suffix;
    if (!path) {
      return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg'
    } else {
      suffix = '.png'
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url
}
// 去重
export  const  listRemoveRepeat = (x,type)=> {
    var result = [];
    for (var i = 0; i < x.length; i++) {
        var flag = true;
        var temp = x[i];
        for (var j = 0; j < result.length; j++) {
            // 普通数组 (temp === result[j])
            if (temp[type] === result[j][type]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result.push(temp);
        }
    }
    return result;
}
//删除制定数组元素
export const removeArray = (array,value) =>{
        var index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
}

//金额格式化
/**
 * 格式化数字，s为元数字，n为格式化后保留几位小数
 */
export  const  fmoney =  (s, n)=> {
    if(s == ""){
        s = 0;
    }
    var negativeNumber = false;
    if(s < 0){
        s = -s;
        negativeNumber = true;
    }
    if(n != 0)
    {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        let t = "";
        for ( let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if(negativeNumber){
            return "-"+t.split("").reverse().join("") + "." + r;
        }else{
            return t.split("").reverse().join("") + "." + r;
        }
    }
    else
    {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        let  t = "";
        for ( let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if(negativeNumber){
            return "-"+t.split("").reverse().join("");
        }else{
            return t.split("").reverse().join("");
        }
    }
}
//数组倒叙
export  const  arrayFlashback = (array)=>{
    let newArray = [];
    for(let  i =array.length-1 ;i>=0;i--){
        newArray.push(array[i]);
    }
    return newArray;
}

//根据值取出对象json
export  const getJSonArray =  (array,key,value)=>{
    let param = {};
    array.map((item,i)=>{
        if(item[key] == value){
            param =  item
        }
    })
    return param;
}


//格式化日期 yyyy-MM-dd
export  const fomartDate =  (date)=>{
   let Y = date.getFullYear() + '-';
    let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()<10?'0'+date.getDate():date.getDate()+'';
    return Y+M+D;
}

//讲一个数组切成没n个一个数组
export  const  getNarray = (data,n)=>{

    var result = [];
    for(var i=0;i<data.length;i+=n){
        result.push(data.slice(i,i+n));
    }
    return result;
}
/**data 指定时间
 * @param preDate 数字类型，获取当前几天日期
 */
export  const getPreDate= (curDate,preDate)=>{
    if(preDate==undefined){
        preDate = 1;//前一天
    }
    if(curDate==undefined){
        curDate = new Date();
    }else{
        curDate = new Date(curDate);
    }
    var presDate = new Date(curDate.getTime() - 24*60*60*1000*preDate); //前一天
    return fomartDate(presDate);
}

/**
 * StrDate:时间字符串类型类型
 * NextDate
 */
export  const getNextDate= (StrDate,nextDate)=>{
    var curDate ;
    if(nextDate==undefined){
        nextDate = 1;//后一天
    }
    if(StrDate==undefined){
        StrDate = new Date();
    }else{
        StrDate = new Date(StrDate);
    }
    var nextsDate = new Date(StrDate.getTime()+24*60*60*1000*nextDate); //前一天
    return fomartDate(nextsDate);
}

//获取两个时间差
export  const getDifferDays= (strDateStart,strDateEnd)=>{
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1= strDateStart.split(strSeparator);
    oDate2= strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数
    return iDays ;
}

//字符串日期转化为date日期
export  const parserDate =(strDate)=>{
    var regEx = new RegExp("\\-","gi");
    strDate = strDate.replace(regEx,"/");
    var milliseconds = Date.parse(strDate);

    var date = new Date();
    date.setTime(milliseconds);
    return date;
}
//判断两个对象是否相等
export  const diff=(obj1,obj2)=>{
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if(!o1 || !o2){/*  判断不是对象  */
        return obj1 === obj2;
    }

    if(Object.keys(obj1).length !== Object.keys(obj2).length){
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for(var attr in obj1){
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if(t1 && t2){
            return diff(obj1[attr],obj2[attr]);
        }else if(obj1[attr] !== obj2[attr]){
            return false;
        }
    }
    return true;



}
/**
 * @描述:判断某参数是否为空
 * @作者：汤成
 * @创建时间: 2017-5-16 03:25:18
 * @param param 需要判断的参数
 * @returns true 为空  false 不为空
 */
export  const  isEmpty= (param) =>
{
    if(param==null || param == undefined || typeof(param)=="undefined" || param=="" || param == "undefined" || param == "null"){
        return true;
    }else{
        return false;
    }
}

/**
 * @描述:判断某参数是否不为空
 * @作者：汤成
 * @版本: 1.0
 * @公司: 拜特
 * @创建时间: 2017-5-16 03:25:18
 * @param param 需要判断的参数
 * @returns true 不为空  false 为空
 */
export  const isNotEmpty=(param) =>
{
    if(param==null || param == undefined || typeof(param)=="undefined" || param=="" || param == "undefined" || param == "null" || param ==[] || param=="[]" || param =={} ||param == "{}"){
        return false;
    }else{
        return true;
    }
}
/**
 * 去掉array中的重复项
 * @param {Array} arr 需要去重的数组
 * @returns {Array} 去重后的新数组
 */
export  const unique = (arr)=>{
    if (!arr || arr.length <= 1) {
        return arr;
    }
    var _arr = arr.sort(), duplicateIdx = [], idxLength = 0;
    for (var i = 1; i < _arr.length; i++) {
        if (_arr[i] === _arr[i - 1]) {
            idxLength = duplicateIdx.push(i);
        }
    }
    if (idxLength > 0) {
        while (idxLength--) {
            _arr.splice(duplicateIdx[idxLength], 1);
        }
        arr = _arr;
    }
    return arr;
}

export  const  getQueryString = (name)=> {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}