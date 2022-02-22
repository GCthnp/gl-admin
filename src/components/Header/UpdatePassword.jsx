import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input } from "antd"

function UpdatePassword(props, ref) {

 const [form] = Form.useForm();

 useImperativeHandle(ref, () => ({
  // getValue 就是暴露给父组件的方法
  getValue: async () => {
   const values = await form.validateFields()
   return values
  }
 }));

 return (
  <div>
   <Form form={form}>
    <Form.Item
     label="原密码"
     name="oldPassword"
     rules={[{ required: true, message: '请输入初始密码' }]}
    >
     <Input placeholder="请输入初始密码"/>
    </Form.Item>
    <Form.Item
     label="新密码"
     name="password"
     rules={[{ required: true, message: '请输入新密码' }]}
    >
     <Input placeholder="请输入新密码"/>
    </Form.Item>
    <Form.Item
     label="确认新密码"
     name="newPassword"
     rules={[
      { required: true},
      ({ getFieldValue }) => ({
       validator(rule, value) {
        if (getFieldValue('password') === value) {
         return Promise.resolve()
        }
        return Promise.reject("两次密码输入不一致")
       }
      })
     ]}
    >
     <Input placeholder="确认密码"/>
    </Form.Item>
   </Form>
  </div>
 );
}

export default forwardRef(UpdatePassword);