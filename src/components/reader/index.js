import React, {Component} from 'react'
import axios from 'axios'
import {Toast} from 'antd-mobile'
import PubSub from 'pubsub-js'
import Styles from '../subcomponent/styles'
// import Drawer from '../subcomponent/drawer';
import './index.css'
class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookId:props.children[0].props.location.state,
            data:[],
            pageId:1,
            capterData:[],
            bgColor:'#FFE4C4',
            color:'#000',
            fontSize:20,
            isBack:false,
            isTap:false,
            isAside:false,
            showStyle:false
        }
    }
    get(options,callback){
        let url = `${window.hostName}${options.path}`
        axios.get(url).then(res=>{
            callback(res);         
        },err=>{})
    }
    getData(id=1,event){
        // console.log(id);      
        this.setState({isBack:false})
        this.get({path:`/book?book=${this.state.bookId}&id=${id}`},(res)=>{
         Toast.loading('loading....',1,()=>{
            res.data.content = res.data.content.split('-').slice(1);
            this.setState({data:res.data})
            this.getCapterData();
            }) 
        })
    }
    getCapterData(){
        this.get({path:`/titles?id=${this.state.bookId}`},(res)=>{
            res.data.titles = res.data.titles.split('-');
            // console.log(res.data);        
            this.setState({capterData:res.data,isBack:true,isTap:false});
        })
    }
    getTitleContent(id){
        this.getData(id)
        this.setState({isAside:false})
        document.body.style.overflow = "auto";
    }

    getStyle(colorStyle){
        this.setState({
            bgColor:colorStyle.bgColor,
            color:colorStyle.color
        })
    }
    getSize(fontSize){
        this.setState({
           fontSize
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
        if(this.state.isTap){
            this.setState({showStyle:false})
        }
        this.setState({isTap: !this.state.isTap})
                      
    }
    showAside(){
        if(!this.state.isAside){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
        this.setState({isAside:!this.state.isAside})
    }
    styleTogger(){
        this.setState({
            showStyle:!this.state.showStyle
        })
    }
    toDark(){
        this.setState({
            bgColor:'#000',
            color:'#fff'
        })
    }
    componentWillMount() { 
        this.getData();
        PubSub.publish('getBookId');
        window.onscroll = function(){
            this.setState({isTap: false})
        }.bind(this)     
        
        // document.querySelector('.aside').onscroll = function(){
        //     console.log(1);          
        // }.bind(this)
    }
    componentDidMount() {
        console.log(this.refs);
    }
    componentWillUnmount() {

    }
    render() {
        return (
            
            <div className="page"> 
                {this.state.isBack?                   
                    <div style={{backgroundColor:this.state.bgColor}} className="container reader">
                        <div style={{backgroundColor:this.state.bgColor,color:this.state.color}}  className={this.state.isTap?"topBar active":"topBar "}>              
                            <span>&lt;</span>                    
                            <h2 >设置</h2>
                        </div>
                        <h3 style={{backgroundColor:this.state.bgColor,color:this.state.color}}>{this.state.data.title}</h3>
                        <div className="content">
                            {this.state.data.content.map((val,index)=>(
                                <p style={{fontSize:this.state.fontSize,color:this.state.color}} key={index}>
                                    {val}
                                </p>
                            ))}
                        </div>
                        <div onClick={this.showCover.bind(this)} className="cover">
                        </div> 
                        <button onClick={this.prevPage.bind(this)}>上一章</button>
                        <button onClick={this.nextPage.bind(this)}>下一章</button>
                        <div style={{backgroundColor:this.state.bgColor,color:this.state.color}} className={this.state.isTap?"bottomBar active":"bottomBar "}>              
                            <div onClick={this.showAside.bind(this)} className="left">
                            <span>——</span>
                            <span>——</span>
                            <span>——</span>
                            </div>   
                            <div onClick={this.toDark.bind(this)} className="right">
                            夜间模式
                            </div>
                            
                            <Styles showStyle={this.state.showStyle} callbackParent={this.getStyle.bind(this)} changeSize={this.getSize.bind(this)} ></Styles>                 
                            <h2 onClick={this.styleTogger.bind(this)}>显示</h2>    
                        </div>
                        <div   style={{ minHeight: document.documentElement.clientHeight }}  className={this.state.isAside?"aside active":"aside"}>
                            <div onClick={this.showAside.bind(this)} className="right"></div>
                                <div style={{backgroundColor:this.state.bgColor,color:this.state.color}} className="content">
                                <h2>{this.state.capterData.name}</h2>
                                <ul className="capterlist">
                                    {this.state.capterData.titles.map((val,index)=>(
                                        <li onClick={this.getTitleContent.bind(this,index+1)} key={val}>{val}</li>
                                    ))}
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
