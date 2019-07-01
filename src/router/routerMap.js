import  React ,{Component} from 'react'
import  {HashRouter  as Router,Route} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import  Filter from '../component/common/filter/filter'
import  Home from '../containers/home'
import  Notice from '../containers/notice'
import  Login from '../containers/login'
import  MessageDetail from '../component/message/messageDetail'
import Todo from '../component/task/todo'
import TodoList from '../component/task/todoList'
import TodoDetail from '../component/task/todoDetail'
import Flow from '../component/task/flow'
import FlowList from '../component/task/flowList'
import FlowDetail from '../component/task/flowDetail'
import AlreadyDone from '../component/task/alreadydone'
import AlreadyDoneList from '../component/task/alreadydoneList'
import AlreadyDoneDetail from '../component/task/alreadydoneDetail'
import  AccBalanceList from '../component/account/accBalanceList'
import AccountDetail from "../component/account/accountDetail";
import  QueryDetailList from '../component/accountDetail/queryDetailList'
import  QueryDetailInfo from '../component/accountDetail/queryDetailInfo'

import AccountExec from '../component/accountExec/accountExec' //账号管理
import ManagerUnit from '../component/managerUnit/manageUnit'

import FundTrend from "../component/fundTrend/fundTrend";
import DateUnitDetail from "../component/fundTrend/dateUnitDetail";
import  QueryList from '../component/fundTrend/queryList'
import  UnitLabel from '../component/fundTrend/unitLabel'

import AmountReport from "../component/amountReport/amountReport";
import QueryDetailByunit from "../component/amountReport/queryDetailByunit";



const history = createHistory();
export default  class RouterMap extends  Component{

    render(){
        return(
                <Router history={history}>
                        <div>
                            <Route exact path='/:a/:weixinpk/:openid/:isWeixin' component = {Login} />
                            <Route  path='/home' component = {Home} />
                            <Route  path='/filter' component = {Filter} />
                            <Route path= '/notice' component = {Notice} />
                            <Route path= '/messageDetail/:noticeUUID' component = {MessageDetail} />

                            <Route path= '/task/todo' component = {Todo} />
                            <Route path= '/todoList/:busiCode/:billType' component = {TodoList} />
                            <Route path= '/todoDetail/:billType/:billCode/:busiCode/:auditStatus' component = {TodoDetail} />

                            <Route path= '/task/flow' component = {Flow} />
                            <Route path= '/flowList/:busiCode/:billType' component = {FlowList} />
                            <Route path= '/flowDetail/:billType/:billCode/:busiCode/:auditStatus' component = {FlowDetail} />

                            <Route path= '/task/alreadyDone' component = {AlreadyDone} />
                            <Route path= '/alreadyDoneList/:busiCode/:billType' component = {AlreadyDoneList} />
                            <Route path= '/alreadyDoneDetail/:billType/:billCode/:busiCode/:auditStatus' component = {AlreadyDoneDetail} />

                            <Route path= '/account/accBalanceList' component = {AccBalanceList} />
                            <Route path= '/accountDetail' component = {AccountDetail} />

                            <Route path= '/account/queryDetailList' component = {QueryDetailList} />
                            <Route path= '/queryDetailInfo' component = {QueryDetailInfo} />

                            <Route path= '/accountExec/:userUUID' component = {AccountExec} />
                            <Route path= '/managerUnit/:userUUID' component = {ManagerUnit} />

                            <Route path= '/report/fundTrend' component = {FundTrend} />
                            <Route path= '/dateUnitDetail' component = {DateUnitDetail} />
                            <Route path= '/queryList/:code' component = {QueryList} />
                            <Route path= '/UnitLabel/:code' component = {UnitLabel} />

                            <Route path= '/report/amountReport' component = {AmountReport} />
                            <Route path= '/queryDetailByunit/:unitCode' component = {QueryDetailByunit} />
                        </div>
                </Router>
        )
    }

}


