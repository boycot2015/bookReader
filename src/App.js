import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import { Link } from 'react-router-dom'
// import AmazeUIReact from 'amazeui-react'

import 'antd-mobile/dist/antd-mobile.css';
import './App.css';


import Home from './components/home';
import Category from './components/category';
import User from './components/user';
import Top from './components/top';


class App extends Component {
  componentWillMount(){
    window.hostName = 'http://localhost:3333';    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">移动书城</h1>
        </header>
        <main>
        
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" component={Home}></Route>
            <Route path="/category" component={Category}></Route>
            <Route path="/User" component={User}></Route>
            <Route path="/Top" component={Top}></Route>
        </Switch>
        </main>
        <footer className="tabbar">
          <Link to='/home'>首页</Link>
          <Link to='/category'>分类</Link>
          <Link to='/top'>排行</Link>
          <Link to='/user'>我的</Link>
        </footer>
      </div>
    );
  }
}

export default App;
