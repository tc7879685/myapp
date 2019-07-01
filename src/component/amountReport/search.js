import  React,{Component} from 'react'
import { List,Tag,Button,Picker   } from 'antd-mobile';
const colorStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '16px',
    height: '16px',
    marginRight: '10px',
};
const colors = [
    {
        label:
            (<div>
      <span
          style={{ ...colorStyle, backgroundColor: '#FF0000' }}
      />
                <span>红色</span>
            </div>),
        value: '#FF0000',
    },
    {
        label:
            (<div>
      <span
          style={{ ...colorStyle, backgroundColor: '#00FF00' }}
      />
                <span>绿色</span>
            </div>),
        value: '#00FF00',
    },
    {
        label:
            (<div>
      <span
          style={{ ...colorStyle, backgroundColor: '#0000FF' }}
      />
                <span>蓝色</span>
            </div>),
        value: '#0000FF',
    },
];
class  Search extends  Component{
    state = {
        open: false,
        selected1:false,
        selected2:false,
        selected3:true,
        colorValue:['#00FF00']
    }



    onChange(e,flag) {
        if(flag==1){//单位
            this.setState({
                selected1Class:'am-tag-active',
                selected2Class:'',
                selected3Class:'',
                selected1:true,
                selected2:false,
                selected3:false,
                value:1
            });
        }else if(flag==2){//账号
            this.setState({
                selected2Class:'am-tag-active',
                selected1Class:'',
                selected3Class:'',
                selected1:false,
                selected2:true,
                selected3:false,
                value:2
            });
        }else if(flag==3){//银行类别
            this.setState({
                selected3Class:'am-tag-active',
                selected1Class:'',
                selected2Class:'',
                selected1:false,
                selected2:false,
                selected3:true,
                value:3
            });
        }
    }

    //选择颜色
    onChangeColor = (color) => {
        this.setState({
            colorValue: color,
        });
    };

    render(){
            return(
                <div className="tag-container">
                    <div className={"tongjiWeidu"} >
                        统计维度:
                        <Tag selected={this.state.selected1} className={this.state.selected1Class}   onChange={(e)=>this.onChange(e,1)}>单位</Tag>
                        <Tag selected={this.state.selected2} className={this.state.selected2Class}  onChange={(e)=>this.onChange(e,2)}>单位标签</Tag>
                        <Tag selected={this.state.selected3} className={this.state.selected3Class}   onChange={(e)=>this.onChange(e,3)}>银行类别</Tag>
                    </div>
                    <div className={'search_unit'}>
                        <Picker
                            data={colors}
                            value={this.state.colorValue}
                            cols={1}
                            key={3}
                            onChange={this.onChangeColor}
                        >
                            <List.Item  key={1} arrow="horizontal">统计单位:</List.Item>
                        </Picker>
                        <Picker
                            data={colors}
                            value={this.state.colorValue}
                            cols={1}
                            key={1}
                            onChange={this.onChangeColor}
                        >
                            <List.Item key={2} arrow="horizontal">银行类别:</List.Item>
                        </Picker>
                        <Picker
                            data={colors}
                            value={this.state.colorValue}
                            cols={1}
                            key={2}
                            onChange={this.onChangeColor}
                        >
                            <List.Item key={3} arrow="horizontal">单位标签:</List.Item>
                        </Picker>
                    </div>
                    <div className={"tongjiWeidu"} >
                        展示周期:
                        <Tag style={{display:'black'}} selected onChange={this.onChange(1)}>一天</Tag>
                        <Tag  onChange={this.onChange(2)}>七天</Tag>
                        <Tag  onChange={this.onChange(3)}>一个月</Tag>
                    </div>
                    <div className={'btn_tag'}>
                        <Button  onClick={()=>{}} type="primary" size={'small'} inline style={{ marginRight: '4px',width:'40%' }}>确定</Button>
                        <Button onClick={()=>{}} type="ghost" size={'small'} inline style={{ marginRight: '4px',width:'40%' }} className="am-button-borderfix">取消</Button>
                    </div>
                </div>
            )
    }
}
export  default Search