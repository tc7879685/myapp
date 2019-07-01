import React,{Component} from 'react'
import  Header from '../common/header/header'
import  './messageDetail.css'
class  MessageDetail extends  Component{
    constructor(){
        super()
    }
        render(){
           let noticeJON = JSON.parse(sessionStorage.getItem('messageDetailJSON'));
           let p = this.props.match.params.noticeUUID;
            return(
                    <div>
                    <Header titleName={'公告详情'}/>
                    <div  style={{ paddingTop:'45px', minHeight: document.documentElement.clientHeight-45}} className="main-box" id="link">
                        <div className="white-bg" >
                            <div className="tpinfo">
                                <h1 className="new">{noticeJON.noticeTitle}</h1>
                                <div className="info"><span id="date">{noticeJON.createTime.substring(0,11)}</span><span id="writer">{noticeJON.userName}</span></div>
                                <p>{noticeJON.noticeContent}</p>
                            </div>
                        </div>
                    </div>
                    </div>
            )
        }
}
export  default  MessageDetail
