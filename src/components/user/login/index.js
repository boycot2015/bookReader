import React,{Component} from 'react'
import { List, InputItem, Switch, Button } from 'antd-mobile';
import { createForm } from 'rc-form'
import {Toast} from 'antd-mobile'
import {withRouter} from 'react-router'
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
        console.log(JSON.stringify(this.props.form.getFieldsValue()));
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
        console.log(res.data);
        if(res.data.code===200){
          window.sessionStorage.setItem('user',userData.account)
          Toast.info(res.data.message,1)
          this.props.history.push('/userinfo');
        }else{
          Toast.info(res.data.message,1)
        }
      })     
    })
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
    Toast.loading('Loading...', 0.2, () => {
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
      renderHeader={() => '登录'}
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
      <Button type="warning" size="small" inline >注册</Button>
    </List>
  </form>
  :null}
    </div>
    );
  }
}
const BasicInputWrapper = createForm()(BasicInput);
export default withRouter(BasicInputWrapper);