import React from 'react';
import { Redirect } from "react-router-dom"

import "./login.less"
import logo from "./images/logo.png"

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from "../../api"
import userInfo from "../../utils/memoryUtils"
import storeUtil from "../../utils/storeUtils"

function Login(props) {
 const [form] = Form.useForm();

 
 const user = userInfo.user
 if (user && user._id) {
  return <Redirect to="/admin"></Redirect>
 }



 const onFinish = async (values) => {
  const { username, password } = values
  const result = await reqLogin(username, password)

  if (result.status === 0) {
   message.success("登录成功")
   userInfo.user = result.data
   storeUtil.saveUser(result.data)
   props.history.replace('/admin')
  } else {
   message.error(result.msg)
  }


  // form.validateFields()
  //  .then(values => {
  //   console.log("成功", values);
  //  })
  //  .catch(errorInfo => {
  //   console.log("失败", errorInfo);
  //  });
 };
 // 自定义校检密码
 const validatorPwd = (rule, value) => {
  if(!value){
   return Promise.reject(new Error('请输入密码'))
  }
  if (value.length < 4) {
   return Promise.reject(new Error('密码最少4位'))
  } else if (value.indexOf(' ') !== -1) {
   return Promise.reject(new Error('密码不能有空格'))
  } else if (value.length > 12) {
   return Promise.reject(new Error('密码最多12位'))
  } else if (!/^[A-Za-z0-9_]+$/.test(value)) {
   return Promise.reject(new Error('密码必须是字母，数字下划线'))
  } else {
   return Promise.resolve();
  }
 }


 return (
  <div className="login">
   <div className="login-header">
    <img src={logo} alt="logo" />
    <span>后台管理系统</span>
   </div>
   <div className="login-main">
    <h2>用户登录</h2>
    <Form
     form={form}
     name="login-from"
     onFinish={onFinish}
    >
     <Form.Item
      name="username"
      rules={[
       { required: true, message: 'Please input your username!' },
       { required: true, min: 4, max: 12, message: '用户名4~12位' },
       { pattern: /^[A-Za-z0-9_]+$/, whitespace: false, message: '必须是字母，数字或_' },
      ]}
     >
      <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.3)' }} />} placeholder="Username" />
     </Form.Item>
     <Form.Item
      name="password"
      rules={[
       {
        validator: validatorPwd
       }
      ]}
     >
      <Input
       prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.3)' }} />}
       type="password"
       placeholder="Password"
      />
     </Form.Item>

     <Form.Item >
      <Button type="primary" htmlType="submit" className="login-form-button">
       Log in
      </Button>
     </Form.Item>
    </Form>
   </div>
  </div>
 );
}

export default Login;