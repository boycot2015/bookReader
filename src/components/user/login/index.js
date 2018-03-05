import React,{Component} from 'react'
import { List, InputItem, Switch, Button } from 'antd-mobile';
import { createForm } from 'rc-form'
import {Toast} from 'antd-mobile'
import {withRouter} from 'react-router'
import PubSub from 'pubsub-js'
import axios from 'axios'
import './inedx.css'


class BasicInput extends Component {
  state = {
    value: 1,
    isBack:false,
    data:''
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        let userData  = this.props.form.getFieldsValue();
        this.post(userData);
      }
    });
  }
  post = (userData) =>{
    let url = `${window.hostName}/login`
    axios({url,
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: userData,
  }).then(res=>{
      Toast.loading('正在登录...',1,()=>{
        if(res.data.code===200){
          window.sessionStorage.setItem('user',JSON.stringify(res.data.userinfo));         
          setTimeout(function(){
            Toast.success(res.data.message,1,()=>{
              this.props.history.push('/userinfo');            
            })
          }.bind(this),100)
        }else{
          setTimeout(function(){
            Toast.info(res.data.message,1)
          },100)
          
        }
      })     
    })
  }
  toRegister(){
    this.props.history.push('/register')
    PubSub.publish('headerTitle','注册')
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('请输入有效的用户名!'));
    }
  }
  componentWillMount(){
    PubSub.publish('headerTitle','登录')              
    Toast.loading('Loading...', 0.8, () => {
      this.setState({isBack:true})
    })
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
    <div className="page">
    {this.state.isBack?
    <form>
    <List
      renderFooter={() => getFieldError('account') && getFieldError('account').join(':')}
    >
      <InputItem
        {...getFieldProps('account', {
          // initialValue: 'little ant',
          rules: [
            { required: true, message: '错误' },
            { validator: this.validateAccount },
          ],
        })}
        clear
        error={!!getFieldError('account')}
        placeholder="请输入用户名"
      >账 户</InputItem>
      <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
          密 码
        <Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })}>记住密码</Switch>
      </InputItem>
      <Button type="primary" size="small" inline onClick={this.onSubmit}>登录</Button>
      <Button type="warning" size="small" inline onClick={this.toRegister.bind(this)}>注册</Button>
    </List>
  </form>
  :null}
    </div>
    );
  }
}
const BasicInputWrapper = createForm()(BasicInput);
export default withRouter(BasicInputWrapper);