import React,{ Component } from 'react'
import AnimatedWrapper from "../animate/animate"
import axios from 'axios'
import {Toast} from 'antd-mobile'
import './index.css'
import Star from '../subcomponent/star/index'
import {Link} from 'react-router-dom'
import PubSub from 'pubsub-js'
class BookDetailComponent extends Component {
    constructor(props){
        super(props);        
        this.state = {
          id: props.children[0].props.location.state,
          data:{},
          recommend:[],
          isBack:false,
          isLike:"收藏",
          headerTitle:'详情'
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
        this.setState({isBack:false})
        let url = `${window.hostName}/booklist?id=`;
        if(param){            
            url +=param                                     
        }else if(this.state.data.id){
            url += this.state.data.id
        } else{
            url += this.state.id
        }        
          axios.get(url).then(res=>{
            Toast.loading('Loading...', 0.5, () => {
                this.setState({data:res.data,isBack:true,isLike:'收藏'})
                this.getRcommend()
            })
                          
          },err=>{console.log(err);
          })
      }
      changeLikeState(){
        this.setState({isLike:'已收藏'}) 
        if(this.state.isLike==="已收藏"){
            Toast.info('你已经收藏过该小说!', 1);
          }else{
            Toast.success('收藏成功!', 1);
          }                        
      }
      goReader(id){
        PubSub.publish('getBookId',id);
      }
    componentWillMount(){            
        this.getData();
        //通过PubSub库发布信息  
        PubSub.publish('headerTitle',this.state.headerTitle);      
    }
    componentDidMount(){
        this.setState({
            id:this.props.children[0].props.location.state
        })
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
                        <p className="totalwords">{this.state.data.like}人收藏</p>
                        <div className="star">
                        <Star value={this.state.data.ratings}></Star>
                        </div>    
                    </div>
                </div>
                <div className="bottom">
                    <Link  onClick={this.goReader.bind(this,this.state.data.id)} to={{pathname:`/reader/${this.state.data.id}`,state:this.state.data.id}}><button>开始阅读</button></Link>
                    <button onClick={this.changeLikeState.bind(this)}>{this.state.isLike}</button>
                </div> 
                <div className="desc">
                <h4>简介</h4>
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
                          <Link onClick={
                           this.getData.bind(this,val.id)} to={{pathname:`/booklist/${val.id}`,state:val.id}}>
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