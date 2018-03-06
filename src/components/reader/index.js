import React, {Component} from 'react'
import axios from 'axios'
import {Toast} from 'antd-mobile'
import PubSub from 'pubsub-js'
import {withRouter} from 'react-router'
// import {Link} from 'react-router-dom'
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
            showStyle:false,
            isNight:false
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
        if(id){
            this.getData(id)            
        }
        this.setState({isAside:false,pageId:id})
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
            isNight:!this.state.isNight
        })
        if(this.state.showStyle){
            this.setState({
                isNight:false
            })
        }
        if(!this.state.isNight||this.state.showStyle){
            this.setState({
                bgColor:'#000',
                color:'#fff',
            })
        }else{
            this.setState({
                bgColor:'#FFE4C4',
                color:'#000',
            })
        }
    }
    goBack(){
        this.props.history.goBack()
    }
    componentWillMount() {
        this.getData();
        PubSub.publish('getBookId',true);
        window.onscroll = function(){
            this.setState({isTap: false,showStyle:false})
        }.bind(this)     
    }
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        PubSub.publish('getBookId',false);
        this.setState = (state,callback)=>{
          return;
        }; 
    }
    render() {
        return (          
            <div className="page"> 
                {this.state.isBack?                   
                    <div style={{backgroundColor:this.state.bgColor}} className="container reader">
                        <div style={{backgroundColor:this.state.bgColor,color:this.state.color}}  className={this.state.isTap?"topBar active":"topBar "}>              
                            {/* <Link to={{pathname:`/booklist/${this.state.data.id}`,state:this.state.data.id}}><span>&lt;</span></Link> */}
                            <span onClick={this.goBack.bind(this)}>&lt;</span>
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
                            <span>三</span>
                            </div>   
                            <div onClick={this.toDark.bind(this)} className="right">
                            夜间模式
                            </div>
                            
                            <Styles changeColor={{bgColor:this.state.bgColor,color:this.state.color}} showStyle={this.state.showStyle} callbackParent={this.getStyle.bind(this)} changeSize={this.getSize.bind(this)} ></Styles>                 
                            <h2 onClick={this.styleTogger.bind(this)}>显示</h2>    
                        </div>
                        <div style={{ minHeight: document.documentElement.clientHeight }}  className={this.state.isAside?"aside active":"aside"}>
                            <div onClick={this.showAside.bind(this)} className="right"></div>
                                <div style={{backgroundColor:this.state.bgColor,color:this.state.color}} className="content">
                                <h2>{this.state.capterData.name}</h2>
                                <ul className="capterlist">
                                    {this.state.capterData.titles.map((val,index)=>(
                                        <li onClick={this.getTitleContent.bind(this,index+1)} key={index}>{val}</li>
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
export default withRouter(Reader);
