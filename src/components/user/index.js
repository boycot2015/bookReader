import React,{Component} from 'react'
import { List, InputItem, Switch, Button } from 'antd-mobile';
import { createForm } from 'rc-form'
import './inedx.css'


class BasicInput extends Component {
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four charactors for account'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List
        renderHeader={() => '登录'}
        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
      >
        <InputItem
          {...getFieldProps('account', {
            // initialValue: 'little ant',
            rules: [
              { required: true, message: 'Please input account' },
              { validator: this.validateAccount },
            ],
          })}
          clear
          error={!!getFieldError('account')}
          onErrorClick={() => {
            alert(getFieldError('account').join('、'));
          }}
          placeholder="请输入用户名"
        >账 户</InputItem>
        <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
            密 码
          <Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })}>记住密码</Switch>
        </InputItem>
        <Button type="primary" size="small" inline onClick={this.onSubmit}>登录</Button>
        <Button type="warning" size="small" inline >注册</Button>
      </List>
    </form>);
  }
}
const BasicInputWrapper = createForm()(BasicInput);
export default BasicInputWrapper