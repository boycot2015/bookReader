import React, {Component} from 'react'
import axios from 'axios'
import {Toast} from 'antd-mobile'
import PubSub from 'pubsub-js'
import './index.css'
class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookId:props.children[0].props.location.state,
            data:[],
            pageId:1,
            isBack:false,
            isTap:false,
            isAside:false
        }
    }
    getData(id=1){
        this.setState({isBack:false})
        let url = `${window.hostName}/book?book=${this.state.bookId}&id=${id}`
        axios.get(url).then(res=>{
            Toast.loading('loading....',1,()=>{
                res.data.content = res.data.content.split('-').slice(1);
                this.setState({data:res.data,isBack:true})
            })          
        })
    }
    prevPage(){
        if(this.state.pageId<=1){
            return;
        }
        this.setState(function (prevState, props) {
            return {
                pageId: prevState.pageId - 1
            }
           })
        this.getData((this.state.pageId)-1)           
    }
    nextPage(){
        this.setState(function (prevState, props) {
            return {
                pageId: prevState.pageId + 1
            }
           })
        this.getData(this.state.pageId+1)
    }
    showCover(){
        this.setState({isTap: !this.state.isTap})
                      
    }
    showCapter(){
        if(!this.state.isAside){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
        this.setState({isAside:!this.state.isAside})
    }
    componentWillMount() {
        this.getData()
        PubSub.publish('getBookId');
        window.onscroll = function(){
            this.setState({isTap: false})
        }.bind(this)
    }
    componentDidMount() {
        // this.setState({isAside: !this.state.isAside})
    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div className="page">           
                {this.state.isBack?                   
                    <div className="container reader">
                        <div className={this.state.isTap?"topBar active":"topBar "}>              
                            <span>&lt;</span>                    
                            <h2>设置</h2>
                        </div>
                        <h3>{this.state.data.title}</h3>
                        <div className="content">
                            {this.state.data.content.map((val,index)=>(
                                <p key={index}>
                                    {val}
                                </p>
                            ))}
                        </div>
                        <div onClick={this.showCover.bind(this)} className="cover">
                        </div> 
                        <button onClick={this.prevPage.bind(this)}>上一章</button>
                        <button onClick={this.nextPage.bind(this)}>下一章</button>
                        <div className={this.state.isTap?"bottomBar active":"bottomBar "}>              
                            <div onClick={this.showCapter.bind(this)} className="left">
                            <span>——</span>
                            <span>——</span>
                            <span>——</span>
                            </div>   
                            <div className="right">
                            夜间模式
                            </div>                 
                            <h2>字体</h2>    
                        </div>
                        <div   className={this.state.isAside?"aside active":"aside"}>
                            <div onClick={this.showCapter.bind(this)} className="right"></div>
                                <div className="content">
                                <h2>标题</h2>
                                <ul className="list">
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                </ul>
                            </div>                           
                        </div>
                    </div>
                    :null}
            </div>
        )
    }
}
export default Reader;
