import React, {Component} from 'react';
import {Route, Switch, Link} from "react-router-dom";
// import AmazeUIReact from 'amazeui-react'
import TransitionGroup from "react-transition-group/TransitionGroup";
import PubSub from 'pubsub-js'

import 'antd-mobile/dist/antd-mobile.css';
import './App.css';

import Home from './components/home';
import Category from './components/category';
import Login from './components/user/login';
import Userinfo from './components/user/userinfo';
import Register from './components/user/register';
import Top from './components/top';
import BookDetail from './components/bookdetail';
import Reader from './components/reader';

const firstChild = props => {
  const childrenArray = React
    .Children
    .toArray(props.children);
  return childrenArray[0] || null;
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '移动书城',
      data: [
        {
          pathname: '/home',
          name: '首页'
        }, {
          pathname: '/category',
          name: '分类'
        }, {
          pathname: '/top',
          name: '排行'
        }, {
          pathname: '/userinfo',
          name: '我的'
        }
      ],
      isReader:false
    }
  }
  changeTitle(path) {    
    switch (path) {
      case '/home':
        this.setState({title: '移动书城'});
        break;
      case '/category':
        this.setState({title: '分类'});
        break;
      case '/top':
        this.setState({title: '排行榜'});
        break;
      case '/userinfo':
        this.setState({title: '我的'});
        break;
      default:
        break;
    }
  }
  componentWillMount() {
    window.hostName = 'http://localhost:3333';
    this.changeTitle(window.location.pathname);
    this.pubsub_token = PubSub.subscribe('headerTitle', function (topic,message) { 
      this.setState({  
        title: message  
      });  
      
    }.bind(this));
    this.pubsub_token = PubSub.subscribe('getBookId', function (topic,message) { 
      this.setState({  
        isReader: message  
      });  
      
    }.bind(this));
  }
  componentWillUnmount(){  
    PubSub.unsubscribe(this.pubsub_token);
  }
  render() {
    return (
      <div className="App">
        {this.state.isReader?null:
        <header className="App-header">
            <h1 className="App-title">{this.state.title}</h1>
        </header>
        }
           <main className={this.state.isReader?'hideBar':''}>
           <Switch>
             <Route
               exact
               path="/"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Home {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/home"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Home {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/category"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Category {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/login"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Login {...rest}/>}
               </TransitionGroup>
             )}/>
              <Route
               path="/userinfo"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Userinfo {...rest}/>}
               </TransitionGroup>
             )}/>
              <Route
               path="/register"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Register {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/top"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={firstChild}>
                 {match && <Top {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/booklist/:id"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={BookDetail}>
                 {match && <BookDetail {...rest}/>}
               </TransitionGroup>
             )}/>
             <Route
               path="/reader/:id"
               children={({
               match,
               ...rest
             }) => (
               <TransitionGroup component={Reader}>
                 {match && <BookDetail {...rest}/>}
               </TransitionGroup>
             )}/>
           </Switch>
         </main>
        {this.state.isReader?null:
        <footer className="tabbar">
        {this
          .state
          .data
          .map(val => (
            <Link
              to={val.pathname}
              onClick={() => {
              this.changeTitle(val.pathname) 
              }} key={val.name}>{val.name}
            </Link>
          ))}
        </footer>
        }
        
      </div>
    );
  }
}

export default App;
