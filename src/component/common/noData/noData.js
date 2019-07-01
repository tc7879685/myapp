import React, {Component} from 'react'
import  './css/noData.css'
const  noData = require('./files/noData.png')
class NoData extends Component {
    render () {
        return (
            <div className='backHome'>
                <div className={'content'}>
                    <div style={{textAlign:'center'}}><img src={noData} alt=""/></div>
                    <div style={{textAlign:'center'}}><span>暂无数据</span></div>
                </div>
            </div>
        )
    }
}
export default NoData