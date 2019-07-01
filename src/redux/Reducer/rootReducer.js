import  {combineReducers} from 'redux-immutable'
import  login from './login'
import message from './message'
import  fundTrend from './fundTrend'
import  amountReport from './amountReport'
import  todoList from './todoList'
import  taskSearch from './taskSearch'


const RootReducer = combineReducers(
    {
        login:login,                 //登录
        message:message,             //信息
        fundTrend:fundTrend,         //资金趋势
        amountReport:amountReport,   //结算量
        todoList:todoList,          //待办列表
        taskSearch:taskSearch       //流程查询条件

    }
)

export  default  RootReducer
