import React,{ Component } from 'react'
import AnimatedWrapper from "../animate/animate"
import axios from 'axios'
import {Toast} from 'antd-mobile'
import './index.css'
import Star from '../subcomponent/star'
import {Link} from 'react-router-dom'
class BookDetailComponent extends Component {
    constructor(props){
        super(props);        
        this.state = {
          id: props.children[0].props.location.state,
          data:{},
          recommend:[],
          isBack:false
        };
      }
      getRcommend(){
        let url = `${window.hostName}/booklist`;
        axios.get(url).then(res=>{
            let startCount = Math.floor(Math.random()*(res.data.length-3));            
            this.setState({recommend:res.data.splice(startCount,3)})                       
        },err=>{console.log(err);
        }) 
      }
      getData(param){
          if(param){            
              this.setState({id:param,isBack:false});                         
          }
          let url = `${window.hostName}/booklist?id=${this.state.id}`;
          axios.get(url).then(res=>{
            Toast.loading('Loading...', 0.5, () => {
                this.setState({data:res.data,isBack:true})
                this.getRcommend()
            })
                          
          },err=>{console.log(err);
          })
      }
    componentWillMount(){
        this.getData();
    }
    render(){
        return(
            <div className="page">
                {this.state.isBack?
                <div className="content">
                    <div className="top">
                    <div className="left">
                        <img src={this.state.data.images} alt=""/>
                    </div>
                    <div className="right">
                        <h2 className="title">{this.state.data.name}</h2>
                        <p className="author">作者：{this.state.data.author}</p>
                        <p className="type">分类：{this.state.data.type}</p>
                        <p className="totalwords">{this.state.data.wordcount}万字</p>
                        <div className="star">
                        <Star value={this.state.data.ratings}></Star>
                        </div>    
                    </div>
                </div>
                <button>开始阅读</button>
                <div className="desc">
                    <p>{this.state.data.intro}</p>
                </div>
                <div className="tips">
                    <h4>标签</h4>
                    <button>{this.state.data.type}</button>
                </div>
                <div className="bottom">
                <h3>猜你喜欢</h3>
                    <ul className="list" >
                        {this.state.recommend.map((val,index)=>(
                          <li key={index}>
                          <Link onClick={()=>{
                           this.getData(val.id)}} to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                          <img className="cover" src={val.images} alt=""/>
                          <p>{val.name}</p>
                          <p>{val.author}</p>
                          </Link>
                        </li>
                        ))}  
                    </ul>
                </div>
                </div>
                
                :null}
            </div>
        )
    }
}
const BookDetail = AnimatedWrapper(BookDetailComponent);
export default BookDetail;