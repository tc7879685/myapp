import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import  'antd/dist/antd.css'
import {Button }  from 'antd'
import Add from "./redux/Action/index";

class App extends Component {
    /**
     * constructor参数接受两个参数props,context
     * 可以获取到父组件传下来的的props,context,如果你想在constructor构造函数内部(注意是内部哦，在组件其他地方是可以直接接收的)使用props或context,则需要传入，并传入super对象。
     */
    constructor(){
        super();
        console.log("初始化")
    }

    /**
     *  1、组件刚经历constructor,初始完数据
        2、组件还未进入render，组件还未渲染完成，dom还未渲染
     */
    componentWillMount(){
        console.log("页面还未被渲染");
    }

    /**
     * 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
     */
    componentDidMount(){
        console.log("组件第一次已经渲染完成");
    }

    /**
     * 在接受父组件改变后的props需要重新渲染组件时用到的比较多它接受一个参数
     * 1.nextProps
        通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }

    /**
     * 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，（暂时这么理解，其实setState以后有些情况并不会重新渲染，比如数组引用不变）在这里return false可以阻止组件的更新
     因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
     对于react初学者，可能涉及这个生命周期的机会比较少，但是如果你的项目开始注重性能优化，随着你对react的喜爱和深入，你就会用到这个生命周期
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps,nextState){
        console.log("判断组件是否需要重新渲染")
        return true;
    }

    /**
     * shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps,nextState){
        console.log("组件即将重新渲染")
    }

    /**
     * 组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps,prevState){
        console.log("判断重新渲染完成")
    }

    /**
     * componentWillUnmount也是会经常用到的一个生命周期，初学者可能用到的比较少，但是用好这个确实很重要的哦
     * 1.clear你在组建中所有的setTimeout,setInterval
       2.移除所有组件中的监听 removeEventListener
       3.也许你会经常遇到这个warning:
        是因为你在组建中的ajax请求返回中setState,而你组件销毁的时候，请求还未完成，因此会报warning
         解决办法为
     */
    componentWillUnmount(){
        console.log("销毁")
    }
    render() {
    return (
      <div className="App">
          <span>{this.props.inputValue} </span>
          <Button onClick={this.props.changeValue}>点击事件</Button>
      </div>
    );
  }
}

function  mapState(state,ownProps) {
    return {
        inputValue:state.inputValue
    }
}

function  mapDispatch(dispatch,ownProps) {
   return{
       changeValue(e){
           const action ={
               type:"GET"
           }
               dispatch(Add())
       }
   }
}

export default connect(mapState,mapDispatch)(App);
