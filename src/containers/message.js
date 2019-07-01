import  React,{Component} from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank,List  } from 'antd-mobile';
import  {withRouter} from 'react-router-dom'
import  {connect} from 'react-redux'
import  NoData from '../component/common/noData/noData'
import  Loader from '../component/common/loader/loader'
import {Toast} from "antd-mobile/lib/index";
import  API from '../api/api'
import {fromJS, is} from "immutable";
const Item = List.Item;
const Brief = Item.Brief;


class Message extends  Component{

    state = {
        noticeArray: undefined,
        isHide:false   //默认查出长度打点隐藏

    };
    getNotice = async() =>{
       let noticeList =  await API.getNoticeList();
        this.setState({
            noticeArray:noticeList,
            isHide:false
        })
    }

    componentWillMount(){
        this.getNotice();
    }
    sendMessageDetail = (item) =>{
        //添加sessionStroe数据
        sessionStorage.setItem('messageDetailJSON',JSON.stringify(item))
        this.props.history.push("/messageDetail/"+item.noticeUUID);
    }
    render() {
        let noticeListShow;
        let noticeArrayList = this.state.noticeArray;
        if(noticeArrayList == undefined){
            noticeListShow = "";
            return (
                <div className='site-loader'>
                    <Loader/>
                </div>
            )
        }
        noticeListShow =noticeArrayList.map((item,i)=>(
            <Item key ={i}
                arrow="horizontal"
                extra={(item.createTime).substring(0,11)}
                  activeStyle={{color:'red'}}
                thumb={require('./files/message/message.png')}
                wrap = {this.state.isHide}
                onClick={() => {this.sendMessageDetail(item)}
                    }
            >
                {item.noticeTitle} <Brief>{item.userName}</Brief>
            </Item>
        ))

        return (<div>
            {/* <SearchBar  placeholder="Search" maxLength={8} />*/}
             <div ></div>
            <WhiteSpace />
            {
                noticeArrayList.length==0?( <NoData/>):(
                    <List  className="my-list">
                        {noticeListShow}
                    </List>
                )
            }
        </div>
        );
    }
}
function  mapState(state) {
    debugger
    return {
        loginStatus:state.getIn(['login','valueName'])
    };
}
export  default  withRouter(connect(null,null)(Message))