import  React,{Component} from 'react'
import  './css/mine.css'
import  {List} from 'antd-mobile'
import  {withRouter} from 'react-router-dom'
import API from '../api/api'
const Item = List.Item;
const Brief = Item.Brief;
const  headImg = require('./files/head.png')
const  data = [
    {id:0,name:'登录账号'}
]

class Mine extends  Component{

    state={
        userName:undefined
    }

    queryUserInfo = async ()=>{
          let userInfo =    await  API.queryUserInfo()//查询用户信息
          if(userInfo !=null && userInfo!={}){
              let userUUID = userInfo.userUUID; //用户id
              let userCorpList =  await  API.queryUserRole({userUUID:userUUID})//查询用户权限
              let userCorp =[];
              if(userCorpList.length>0){
                  userCorpList.map((item,i)=>{
                      userCorp.push(item.roleName);
                  })
              }
              this.setState({
                    userName:userInfo.userName,
                    unitName:userInfo.unitName,
                    userCode:userInfo.userCode,
                    userCorp:userCorp.length==0?"暂无角色":userCorp.join(','),
                    userUUID:userUUID,
                    email:userInfo.userEmail
              })
          }
    }

    componentDidMount(){
        this.queryUserInfo();
    }

    render(){
        let headimgurl = sessionStorage.getItem('headimgurl')
        return(
                        <div className="aui-content">
                            <div className="aui-user-header">
                                <div className="aui-user-content">
                                    <div className="aui-user-fex">
                                        <div className="aui-user-fex-head">
                                            <div className="aui-user-fex-photo">
                                                <img src={headimgurl ==null? headImg:headimgurl} alt=""/>
                                            </div>
                                            <div className="aui-user-fex-title">
                                                <h2>{this.state.userName==undefined?"...":this.state.userName}</h2>
                                                <span>
                                                    <em>{this.state.unitName==undefined?"...":this.state.unitName}</em>
									            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mine-list">
                                <List renderHeader={() => ("")} className="my-list" >
                                    <Item    multipleLine
                                          thumb={require('./files/mine/user.png')}
                                    >
                                        登录账号 <Brief className='bif'>{this.state.userCode==undefined?"...":this.state.userCode}</Brief>
                                    </Item>
                                    <Item   multipleLine
                                            thumb={require('./files/mine/juese.png')}
                                    >
                                        当前角色 <Brief className='bif'>{this.state.userCorp==undefined?"...":this.state.userCorp}</Brief>
                                    </Item>
                                </List>
                                <List renderHeader={() => ("")} className="my-list" >
                                    <Item   arrow="horizontal"  multipleLine
                                            thumb={require('./files/mine/unit.png')}
                                            onClick={() => {
                                                this.props.history.push('/managerUnit/'+this.state.userUUID)
                                            }}
                                    >
                                        管理单位
                                    </Item>
                                    <Item   arrow="horizontal"  multipleLine
                                            thumb={require('./files/mine/account.png')}
                                            onClick={() => {
                                                this.props.history.push('/accountExec/'+this.state.userUUID)
                                            }}
                                    >
                                        授权账号
                                    </Item>
                                </List>
                                <List renderHeader={() => ("")} className="my-list" >
                                    <Item    multipleLine
                                            thumb={require('./files/mine/email.png')}
                                    >
                                        邮箱 <Brief className='bif'>{this.state.email==undefined?"...":this.state.email}</Brief>
                                    </Item>
                                  {/*  <Item   arrow="horizontal"  multipleLine
                                            thumb={require('./files/mine/setup.png')}
                                            onClick={() => {}}
                                    >
                                        设置
                                    </Item>*/}
                                </List>
                            </div>
                        </div>
        )
    }



}

export  default withRouter(Mine)
