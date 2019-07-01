import  React,{Component} from 'react'
import  {List,PullToRefresh} from 'antd-mobile'
import  API from '../api/api'
import  {withRouter} from 'react-router-dom'
require('../assets/iconfont/iconfont.css')


const Item = List.Item;
const Brief = Item.Brief;
class MainContent extends  Component{


    state = {
        disabled: false,
    }
    sendHtml(data){
        this.props.history.push(data.url)
    }
    returnNewData = (menus)=>{
        let newArray = [];
        let newArrayCH = [];
        if(menus && menus.rows){
            menus.rows.map((item,i)=>{
                if(item.parent =='weixin'){
                    newArray.push(item)
                }else{
                    newArrayCH.push(item);
                }
            })
        }
        let menuListArray = [];
        if(newArray.length>0){
            newArray.map((item,i)=>{
                let param ={
                    id:i,
                    sort:item.order,
                    name:item.name
                }
                let childrenArray = [];
                newArrayCH.map((itemCH,j)=>{
                    if(itemCH.parent!="0" && itemCH.parent ==item.code){
                        let type =  (itemCH.code.indexOf('todo')>-1)?'1':(itemCH.code.indexOf('flow')>-1)?'2':(itemCH.code.indexOf('already')>-1)?"3":''
                        childrenArray.push({
                            id:j,
                            sort:itemCH.order,
                            type:type,
                            name:itemCH.name,
                            img: itemCH.iconSmall,
                            url: itemCH.link,
                        })
                    }
                })
                param.data =childrenArray;
                menuListArray.push(param)
            })
        }
        return menuListArray;
    }

    countTo = async ()=>{
        let menus =  await  API.menus(null);
        let menuList =   this.returnNewData(menus);
        this.setState({
            menuList:menuList
        })
         let todoList =   await  API.querytodoList();
        let queryAlreadyList =   await  API.queryAlreadyList();
        let queryFlowList =   await  API.queryFlowList();

        let todoCount = 0;
        todoList.map((item,i)=>{
            todoCount += item.billNumber;
        })
        let alreadyCount = 0;
        queryAlreadyList.map((item,i)=>{
            alreadyCount += item.billNumber;
        })
        let flowCount = 0;
        queryFlowList.map((item,i)=>{
            flowCount += item.billNumber;
        })
        //设置
        this.setState({
            todoCount:todoCount,
            alreadyCount:alreadyCount,
            flowCount:flowCount,

        })
    }

    componentDidMount(){
        this.countTo();

    }

    render() {
        let menuList = this.state.menuList;
      let  showListItem = (data) =>(
            data.map((item,i)=>{
                let count = '';
                if(item.type == '1'){
                    count = this.state.todoCount;
                }else if(item.type =='2' ){
                    count = this.state.flowCount;
                }else if(item.type == '3'){
                    count = this.state.alreadyCount;
                }
                return(
                <Item  key={i}
                      arrow="horizontal"
                     /* thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/
                      multipleLine
                      extra = {count==undefined?(<Loadding/>):count}
                      onClick={() => {
                            this.sendHtml(item)
                      }}
                >

                   {/* <svg className='iconfont' aria-hidden="true">
                        <use  xlinkHref={"#"+item.img}></use>
                    </svg>*/}
                    <span style={{paddingRight:"10px"}}><img src={require('./files/main/'+item.img+'.png')}/></span> {item.name}
                </Item>
                )
            })
        )
      let ListShow   =menuList!=undefined?menuList.map((item,i)=>(
          <List renderHeader={() => (item.name)} className="my-list" key={i}>
              {showListItem(item.data)}
          </List>
      )):""

        return (
            <div>
                    {ListShow}
            </div>
        );
    }
}

export  const  Loadding = ()=>{
    return(
        <div><img src={require('./files/main/loadding.gif')}/> </div>
    )
}


export  default withRouter(MainContent)
