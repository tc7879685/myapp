import instance from './server'
import {getUrlConcat,isNotEmpty} from '../utils/commons'
class API extends instance{

    /**
     *  登录
     * @returns param
     */
      login(param){
        try{
            let result =  this.axios('post','bt/wx/views/home/loginyun.do',param)
            if ( result ) {
                return result
            } else {
                let err = {
                    tip: '登录异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  菜单
     * @returns param
     */
    async  menus(param){
        try{
            let result = await this.axios('post','bt/wx/views/home/menus.do',param)
            if ( result ) {
                return result
            } else {
                let err = {
                    tip: '查询菜单异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  获取收支属性
     * @returns {Promise<Object|Array>}
     */
    async getdDtailType(param) {
        /*let detailTypeinfo =null;
        if(param && (!param.isNotGetSession)){ //默认取缓存
            detailTypeinfo =   sessionStorage.getItem('detailTypeinfo');
        }*/
       /* if(isNotEmpty(detailTypeinfo)){
            let dataArray =  JSON.parse(detailTypeinfo);
            if(param && (!param.showAll)){
                return dataArray.splice(1)
            }
            return  dataArray
        }else{*/
            try{
                let result = await this.axios('post','system/query/detailType.do', {})
                if (result &&result != null && result.length>0) {
                    let newArray = [];
                    if(param &&  param.showAll){
                        newArray.push({label:"全部",value:100})
                    }
                    result.map((item,i)=>{
                        newArray.push({label:item.text,value:item.id})
                    })
                    sessionStorage.setItem('detailTypeinfo',JSON.stringify(newArray))
                    return newArray
                } else {
                    let err = {
                        tip: '获取银行类别信息失败',
                        response: result,
                    }
                    throw err
                }
            } catch(err){
                throw err
          /*  }*/
        }

    }


    /**
     *  获取银行类别信息
     * @returns {Promise<Object|Array>}
     */
    async getBankType(param) {
       /* let bankTypeInfoStr =null;
        if(param && (!param.isNotGetSession)){ //默认取缓存
            bankTypeInfoStr =   sessionStorage.getItem('bankTypeInfo');
        }
        if(isNotEmpty(bankTypeInfoStr)){
            let dataArray =  JSON.parse(bankTypeInfoStr);
            if(param && (!param.showAll)){
                return dataArray.splice(1)
            }
            return  dataArray
        }else{*/

            try{
                let result = await this.axios('post','system/query/bankType.do?showAll=1', param)
                if (result &&result != null ) {
                    let newArray = [];
                    result.map((item,i)=>{
                        newArray.push({label:item.name,value:item.id})
                    })
                    sessionStorage.setItem('bankTypeInfo',JSON.stringify(newArray))
                    return newArray
                } else {
                    let err = {
                        tip: '获取银行类别信息失败',
                        response: result,
                    }
                    throw err
                }
            } catch(err){
                throw err
            }
       // }

    }
    /**
     *  获取币别信息
     * @returns {Promise<Object|Array>}
     */
    async getCurrency(param) {
      /*  debugger
        let currencyInfoStr =   sessionStorage.getItem('currencyInfo');
        if(isNotEmpty(currencyInfoStr) ){
            let dataArray =  JSON.parse(currencyInfoStr);
            if(dataArray.length==1 && dataArray[0].value ==0){
                currencyInfoStr = "";
            }
        }
        if(isNotEmpty(currencyInfoStr)){
            let dataArray =  JSON.parse(currencyInfoStr);
            if(param && (param.showAll)){
                let dataSra =  dataArray.splice(1)
                return dataSra;
            }
            return  dataArray
        }else{*/
            try{
                let result = await this.axios('post','system/currency/load.do', {})
                if (result &&result.rows != null) {
                    let newArray = [];
                    if(param && (param.showAll)){
                        newArray.push({label:'全部',value:0})
                    }
                    let currencyCode = 'currencyCode'
                    if(param && param.showUUID){
                        currencyCode ='currencyUUID'
                    }
                    result.rows.map((item,i)=>{
                        newArray.push({label:item.chineseName,value:item[currencyCode],idItem:item.currencyUUID})
                    })
                    sessionStorage.setItem('currencyInfo',JSON.stringify(newArray))
                    return newArray
                } else {
                    let err = {
                        tip: '获取币别信息失败',
                        response: result,
                    }
                    throw err
                }
            } catch(err){
                throw err
            }
        //}

    }
    /**
     *  查询单位信息
     * @returns {Promise<Object|Array>}
     */
    async getUnitInfo(param) {
        let unitInfoStr =  sessionStorage.getItem('unitInfo');//
        if(isNotEmpty(unitInfoStr) ){
            let dataArray =  JSON.parse(unitInfoStr);
            if(dataArray.length==1 && dataArray[0].value ==0){
                unitInfoStr = "";
            }
        }
        if(isNotEmpty(unitInfoStr)){
            let dataArray =  JSON.parse(unitInfoStr);
            if(param && (!param.showAll)){
                return dataArray.splice(1)
            }
            return  dataArray
        }else{
            try{
                let result = await this.axios('post','bt/wx/views/todo/newunitInfo.do', {showAll:1})
                if (result && result.rows != null) {
                    let newArray = [];
                    if(param && (param.showAll)){
                        newArray.push({label:'全部',value:0})
                    }
                    result.rows.map((item,i)=>{
                        newArray.push({label:item.unitName,value:item.unitUUID})
                    })
                    //保存
                    sessionStorage.setItem('unitInfo',JSON.stringify(newArray))
                    return newArray
                } else {
                    let err = {
                        tip: '获取单位信息失败',
                        response: result,
                    }
                    throw err
                }
            } catch(err){
                throw err
            }
        }

    }
    /**
     *  获取公告信息列表
     * @returns {Promise<Object|Array>}
     */
    async getNoticeList() {
        try{
            let result = await this.axios('post','bt/wx/views/notice/queryNotice.do', {})
            if (result && result.rows != null) {
                return result.rows || []
            } else {
                let err = {
                    tip: '获取公告信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /*****************************************************代办*******************************************/
    /**
     *  获取待办计数列表
     * @returns {Promise<Object|Array>}
     */
    async querytodoList() {
        try{
            let result = await this.axios('post','bt/wx/views/todo/querytodoList.do', {})
            if (result &&result.rows != null) {
                return result.rows || []
            } else {
                let err = {
                    tip: '获取待办信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  获取流程计数列表
     * @returns {Promise<Object|Array>}
     */
    async queryFlowList() {
        try{
            let result = await this.axios('post','bt/wx/views/todo/queryFlowList.do', {})
            if (result &&result.rows != null) {
                return result.rows || []
            } else {
                let err = {
                    tip: '获取流程信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  获取已办计数列表
     * @returns {Promise<Object|Array>}
     */
    async queryAlreadyList() {
        try{
            let result = await this.axios('post','bt/wx/views/todo/queryAlreadyList.do', {})
            if (result &&result.rows != null) {
                return result.rows || []
            } else {
                let err = {
                    tip: '获取已办信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  获取待办列表
     * @returns param 包含 {page: 1
     */
    async queryCurrenttodoList(param) {
        try{
            let result = await this.axios('post','bt/wx/views/todo/queryalCurrenttodoList.do',param)
            if (result &&result.rows != null) {
                return result || []
            } else {
                let err = {
                    tip: '获取转账待办信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  获取已办列表
     * @returns param 包含 {page: 1
     */
    async queryCurrentAlreadyList(param) {
        try{
            let result = await this.axios('post','bt/wx/views/todo/queryalreadyList.do',param)
            if (result &&result.rows != null) {
                return result || []
            } else {
                let err = {
                    tip: '获取流程列表信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  获取流程列表
     * @returns param 包含 {page: 1
     */
    async queryCurrentFlowList(param) {
        try{
            let result = await this.axios('post','bt/wx/views/todo/querygenzong.do',param)
            if ( result && result.rows != null) {
                return result || []
            } else {
                let err = {
                    tip: '获取流程列表信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  查询单据明细信息
     * @returns param 包含 {page: 1
     */
    async querydetail(param) {
        try{
            let result = await this.axios('post','bt/wx/views/todo/querydetail.do',param)
            if ( result &&result  != null) {
                return result || null
            } else {
                let err = {
                    tip: '获取代办信息失败',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  点击审批通过
     * @returns param 包含
     */
    async  passSubmit(param){
        try{
            let result = await this.axios('post','bt/wx/views/todo/pass.do',param)
            if (result && result  != null) {
                return result
            } else {
                let err = {
                    tip: '审批通过异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  点击审批打回
     * @returns param 包含
     */
    async  backSubmit(param){
        try{
            let result = await this.axios('post','bt/wx/views/todo/back.do',param)
            if (result && result  != null) {
                return result
            } else {
                let err = {
                    tip: '审批打回异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }


    /**
     *  查询账户余额列表
     * @returns param 包含
     */
    async  queryAccountList(param){
        try{
            let result = await this.axios('post','bt/wx/views/account/queryAccountList.do',param)
            if ( result && result.rows != null) {
                return result || []
            } else {
                let err = {
                    tip: '查询账户余额列表异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  查询账户明细列表
     * @returns param 包含accountCode，detailUUID:支出，收入标志0位收入,1位支出
     */
    async  queryAccountDetailList(param){
        try{
            let result = await this.axios('post','bt/wx/views/account/queryAccountDetail.do',param)
            if ( result && result.rows != null) {
                return result || []
            } else {
                let err = {
                    tip: '查询账户明细列表异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  查询用户信息
     * @returns param 包含accountCode，detailUUID:支出，收入标志0位收入,1位支出
     */
    async  queryUserInfo(){
        try{
            let userInfo =  JSON.parse(sessionStorage.getItem("user_info"));
            if(userInfo){
                return userInfo;
            }
            let result = await this.axios('post','bt/wx/views/home/getpersioninfo.do',{})
            if ( result ) {
                sessionStorage.setItem("user_info",JSON.stringify(result)) //存储用户信息
                return result || null
            } else {
                let err = {
                    tip: '查询用户信息异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  查询用户角色
     * @returns param 包含accountCode，detailUUID:支出，收入标志0位收入,1位支出
     */
    async  queryUserRole(param){
        try{
            let userRoleInfo =  JSON.parse(sessionStorage.getItem("user_role_info"));
            if(userRoleInfo !=null && userRoleInfo!=[] ){
                return userRoleInfo;
            }
            let result = await this.axios('post','bt/wx/views/home/queryUserRole.do',param)
            if ( result) {
                sessionStorage.setItem("user_role_info",JSON.stringify(result))
                return result || []
            } else {
                let err = {
                    tip: '查询用户角色异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  查询用户管理单位
     * @returns param 包含accountCode，detailUUID:支出，收入标志0位收入,1位支出
     */
    async  queryUserUnit(param){
        try{
            let result = await this.axios('post','bt/wx/views/home/queryUserUnit.do',param)
            if ( result &&  result.rows.length>0) {
                return result || null
            } else {
                let err = {
                    tip: '查询用户管理单位异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  查询用户授权账号
     * @returns param 包含accountCode，detailUUID:支出，收入标志0位收入,1位支出
     */
    async  queryUserAccount(param){
        try{
            let result = await this.axios('post','bt/wx/views/home/queryUserAccount.do',param)
            if ( result &&  result.rows.length>0) {
                return result || null
            } else {
                let err = {
                    tip: '查询用户授权账号异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  资金趋势查询
     * @returns param
     */
    async  loadYue(param){
        try{
            let result = await this.axios('post','bt/wx/views/report/loadYue.do',param)
            if ( result ) {
                return result || null
            } else {
                let err = {
                    tip: '查询用户授权账号异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  查询单位账号标签
     * @returns param 包含
     */
    async  queryDataDetailList(param){
        try{
            let result = await this.axios('post','bt/wx/views/report/dataDetail.do',param)
            if ( result !="" && result !=null) {
                return result;
            } else {
                let err = {
                    tip: '查询账户余额列表异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  结算量分析表
     * @returns param
     */
    async  loadSettle(param){
        try{
            let result = await this.axios('post','bt/wx/views/report/settle.do',param)
            if ( result ) {
                return result || null
            } else {
                let err = {
                    tip: '查询结算分析表异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }
    /**
     *  统计报表显示账户明细
     * @returns param
     */
    async  loadReortDetail(param){
        try{
            let result = await this.axios('post','bt/wx/views/report/loadDetail.do',param)
            if ( result ) {
                return result.rows || []
            } else {
                let err = {
                    tip: '查询结算分析表异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }

    /**
     *  获取账号
     * @returns param
     */
    async  loadAccount(param){
        try{
            let result = await this.axios('post','bt/wx/views/account/queryAccountDetailByUnit.do',param)
            if ( result && result.rows.length>0 ) {
                let newArray = [];
                if(param.showAll){
                    newArray.push({label:"全部",value:0})
                }
                result.rows.map((item,i)=>{
                    newArray.push({
                        label:item.accountCode,
                        value:item.accountCode
                    })
                })
                return newArray || []
            } else {
                let err = {
                    tip: '查询账号异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }


    /**
     *  查看是否绑定微信账号
     * @returns param
     */
    async  queryWxUserInfo(param){
        try{
            let result = await this.axios('post','bt/wx/views/home/queryUserInfo.do',param)
            if ( result  ) {
                return result
            } else {
                let err = {
                    tip: '查看是否绑定微信账号异常',
                    response: result,
                }
                throw err
            }
        } catch(err){
            throw err
        }
    }


}




export default new API()
