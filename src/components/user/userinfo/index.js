import React,{ Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button,Toast} from 'antd-mobile'
import {withRouter} from 'react-router'
import PubSub from 'pubsub-js'
import './index.css'
import avator from '../../../images/avator.jpg'
class UserInfo extends Component {
  constructor(props){
super(props)
   this.state = {
    userInfo:'未登录，请先登录！',
    isBack:false,
    avator:avator
   }
 }
 get(options,callback){
  let url = `${window.hostName}${options.path}`
  axios.get(url).then(res=>{
      callback(res);         
  },err=>{})
}
 getData(){

  let userData = window.sessionStorage.getItem('user');
  let userInfo = JSON.parse(userData);
 if(userInfo){
     let bookIds = userInfo.likebookid
     this.get({
      path:`/booklist?ids=${bookIds}`
    },(res)=>{
      Toast.loading('loading...',1,()=>{        
        userInfo.collectionBook = res.data;
        window.sessionStorage.setItem('user',JSON.stringify(userInfo))
        this.setState({userInfo,isBack:true})
      })
    })
  }else{
    Toast.loading('loading...',1,()=>{
      this.setState({isBack:true})
    })
  }
}
logout(){
  window.sessionStorage.removeItem('user');
  this.setState({
    isBack:false
  })
  Toast.loading('loading...',1,()=>{
    this.setState({
      userInfo:'未登录，请先登录！',
      isBack:true
    })
  })
}
goLogin(){
  this.props.history.push('/login');
  PubSub.publish('headerTitle','登录')
}
 componentWillMount(){
    this.getData();
    PubSub.publish('headerTitle','我的')
 }
 componentDidMount(){

 }
 componentWillUnmount(){
 }
 render(){
 return(
    <div className="page">
    {this.state.isBack?
      <div className="container"> 
        <div className="userinfo">
          <div className="avator">
            <img src={this.state.avator} alt=""/>
          </div>  
          <h2>{this.state.userInfo.username?this.state.userInfo.username:this.state.userInfo}</h2>
          {this.state.userInfo.username?null:
            <Button type="warning" onClick={this.goLogin.bind(this)}>点我登录</Button>
          }
          
        </div>
          <div className="content">  
              <h3>收藏的书籍</h3>  
            {this.state.userInfo.likebookid?                
            <ul className="booklist">
              {this.state.userInfo.collectionBook.map(val=>(
              <li key={val.id}>
                <Link to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                  <img src={val.images} alt=""/>
                  <p>{val.name}</p>
                  <span>{val.author}</span>   
                </Link> 
              </li>
              ))}
            </ul>
             :<h4 style={{margin:'10px 0'}}>暂无,快去书城看看吧~</h4>
             }
             {this.state.userInfo.username? 
            <Button type="warning"  onClick={this.logout.bind(this)}>退出登录</Button> 
            :null}                        
          </div>
        
      </div>
      :null}      
    </div>
 )
 }
}
export default withRouter(UserInfo);