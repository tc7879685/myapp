import  React ,{Component} from 'react'
import { TabBar } from 'antd-mobile';
import Main from './main'
import  Message from './message'
import  Mine from './mine'
import  '../assets/iconfont/iconfont.css'
const  home = require('./files/home/home .png')
const home_fill = require('./files/home/home_fill .png')
const  message_fill = require('./files/home/message-fill.png')
const  message = require('./files/home/message.png')
const  user = require('./files/home/user.png')
const  user_fill = require('./files/home/user-fill.png')
export  default  class Home extends  Component{
    constructor(props) {
        super(props);
        document.title="主页"
        this.state = {
            selectedTab: sessionStorage.getItem('selectedTab')==null?'blueTab':sessionStorage.getItem('selectedTab'), //默认选中
            hidden: false, //是否隐藏下面兰
            fullScreen: true, //是否全部展示高度为100%
        };
    }
    renderContent(pageText) {
        if(pageText =='home'){
            return (
                <Main></Main>  /***主界面**/
            )
        }else if(pageText == 'message'){
            return(
                 <Message></Message> /***消息页面***/
                )
        }else if(pageText == 'my'){
            return(
                <Mine></Mine>
            )
        }
    }
    render() {
        return (

            <div style={this.state.fullScreen ? {
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0
            } : {height: 400}}>
                <TabBar prerenderingSiblingsNumber={0}  unselectedTintColor="#949494"   tintColor="#33A3F4" barTintColor="white"  hidden={this.state.hidden}>
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            backgroundImage:{home},
                            background: `url(${home}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selectedIcon={<div   style={{
                            width: '26px',
                            height: '26px',
                            background: `url(${home_fill}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        /*  badge={1}*/
                        onPress={() => {
                            sessionStorage.setItem('selectedTab','blueTab');
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('home')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '26px',
                                height: '26px',
                                background: `url(${message}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '26px',
                                height: '26px',
                                background: `url(${message_fill}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="消息"
                        key="message"
                        /*  badge={'new'}*/
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            sessionStorage.setItem('selectedTab','redTab');
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >

                        {this.renderContent('message')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: `${user}`}}
                        selectedIcon={{uri: `${user_fill}`}}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            sessionStorage.setItem('selectedTab','yellowTab');
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('my')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}