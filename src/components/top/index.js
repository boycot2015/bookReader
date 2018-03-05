import React,{Component} from 'react'
import AnimatedWrapper from "../animate/animate";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import './index.css'
// const Brief = Item.Brief;

class TopComponent extends Component{
    constructor(){
        super()
        this.state = {
            isBack:false,
            data:{},
            title:[{name:'热门榜单',color:'hotpink'},{name:'新书推荐',color:'yellowgreen'},{name:'经典小说',color:'deepskyblue'}]
        }
    }
    get(options,callback){
        let url = `${window.hostName}${options.path}`
        axios.get(url).then(res=>{
            Toast.loading('加载中......',.5,()=>{              
                callback(res);
            })
        },err=>{})
    }
    componentWillMount(){
        this.setState({
            isBack:false
        })
        this.get({path:'/top'},(res)=>{
            for (const key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    res.data[key].forEach(el => {
                        if(el.author.length>4){
                            el.author = el.author.slice(0,4)+'...'; 
                        }
                        if(el.intro){
                            el.intro = el.intro.slice(0,30)+'...';
                        }
                        else{
                            el.intro='暂无简介，点击查看更多'
                        }
                    });
                }
            }
            this.setState({
                data:res.data,
                isBack:true
            })      
        })
    }

    render(){
        return(
            <div className="page">
                {this.state.isBack?
                 <div className="container">
                    <section>                  
                        <h2 style={{color:this.state.title[0].color,
                            borderColor:this.state.title[0].color}} className="title">{this.state.title[0].name}TOP({this.state.data.hot.length})</h2>
                        <ul className="toplist">               
                            {this.state.data.hot.map(val=>(
                            <li key={val.id}>
                                <Link to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                                   <div className="left">
                                        <img src={val.images} alt=""/>
                                   </div>
                                   <div className="right">
                                        <h3>{val.name}</h3>
                                        <p>{val.intro}</p>
                                        <div className="bottom">
                                            <div className="autor">
                                                <i></i>
                                                <span>{val.author}</span>
                                            </div>
                                            <div className="desc">
                                                <span>{val.type}</span>
                                                <span>{val.serialize}</span>
                                                <span>{val.wordcount}万字</span>
                                            </div>
                                        </div>
                                   </div>             
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </section>
                    <section>                  
                        <h2 style={{color:this.state.title[1].color,
                            borderColor:this.state.title[1].color}}
                             className="title">{this.state.title[1].name}TOP({this.state.data.new.length})</h2>
                        <ul className="toplist">               
                            {this.state.data.new.map(val=>(
                            <li key={val.id}>
                                <Link to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                                    <div className="left">
                                        <img src={val.images} alt=""/>
                                    </div>
                                    <div className="right">
                                        <h3>{val.name}</h3>
                                        <p>{val.intro}</p>
                                        <div className="bottom">
                                            <div className="autor">
                                                <i></i>
                                                <span>{val.author}</span>
                                            </div>
                                            <div className="desc">
                                                <span>{val.type}</span>
                                                <span>{val.serialize}</span>
                                                <span>{val.wordcount}万字</span>
                                            </div>
                                        </div>
                                    </div> 
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </section>
                    <section>                  
                        <h2 style={{color:this.state.title[2].color,
                            borderColor:this.state.title[2].color}} 
                            className="title">{this.state.title[2].name}TOP({this.state.data.classes.length})</h2>
                        <ul className="toplist">               
                            {this.state.data.classes.map(val=>(
                            <li key={val.id}>
                                <Link to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                                    <div className="left">
                                        <img src={val.images} alt=""/>
                                    </div>
                                    <div className="right">
                                        <h3>{val.name}</h3>
                                        <p>{val.intro}</p>
                                        <div className="bottom">
                                            <div className="autor">
                                                <i></i>
                                                <span>{val.author}</span>
                                            </div>
                                            <div className="desc">
                                                <span>{val.type}</span>
                                                <span>{val.serialize}</span>
                                                <span>{val.wordcount}万字</span>
                                            </div>
                                        </div>
                                    </div> 
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </section>
                 </div>               
                :null}
            </div>
        )
    }
}
const Top = AnimatedWrapper(TopComponent);
export default Top;