import React, {Component} from 'react'
import  {NavBar,Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Header extends Component {
  render(){
      let isApp = sessionStorage.getItem('isApp');
      let titleName = this.props.titleName;
    return(
        <div >
         {
            isApp?
            <NavBar style={{position:'fixed',width:'100%',zIndex:2}}
                icon={<Icon type="left" />}
                onLeftClick={()=>{this.props.history.goBack()}}
                /* rightContent={[
                     <Icon key="0" type="search" style={{ marginRight: '10px' }}
                           onClick={this.onOpenChange} />,
                 ]}*/
            >{titleName}</NavBar>
            :''
           }
        </div>
    )
  }

}

export  default  withRouter(Header)