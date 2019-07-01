/*
    滑动组件层
 */
import  React,{Component} from 'react'
import  {SwipeAction,List} from 'antd-mobile'
const  Item = List.Item

export  default  class SwipeContent  extends  Component{

    render(){
        return(
            <List>
                <SwipeAction
                    style={{backgroundColor:'gray'}}
                    right = {
                        [
                            {text:"cancal",onPress:()=>{console.log('cancal')},style:{backgroundColor:'#ddd,'}},
                            {text:"delete",onPress:()=>{console.log('delete')},style:{backgroundColor:'red,'}},
                        ]
                    }

                >
                    <Item
                        extra ="跟多"
                        arrow ="horizontal"
                    >
                        右侧滑动按钮

                    </Item>
                </SwipeAction>


            </List>

        )


    }
}




