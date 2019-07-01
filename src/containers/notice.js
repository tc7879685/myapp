import  React ,{Component} from 'react'



export  default  class Notice extends  Component{

    componentDidMount(){
        fetch('cms/bt/wx/views/home/menus.do',{
        })
            .then(response =>{
                console.log(response)
                return response.json();
            })
            .then(data =>{
                console.log(data)
            }).catch(function(e) {
            console.log("Oops, error");
        })
    }
    render(){
        return(
            <div>公告页面</div>
        )


    }


}