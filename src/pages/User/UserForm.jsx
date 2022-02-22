import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Select } from "antd"
const { Option } = Select;

function UserForm(props, ref) {
 const { roles, user } = props
 const [form] = Form.useForm()

 let userInfo = {}
 if (user._id) {
  userInfo = user
 }

 useImperativeHandle(ref, () => ({
  getUserForm: async () => {
   const values = await form.validateFields()
   return values
  },
  resetForm: () => {
   form.resetFields()
   userInfo = {}
  }
 }));

 return (
  <div>
   <Form
    form={form}
    wrapperCol={{ span: 16 }}
    labelCol={{ span: 4 }}
   >
    <Form.Item
     initialValue={userInfo.username}
     label="用户名"
     name="username"
     rules={[
      {
       required: true
      },
     ]}
    >
     <Input />
    </Form.Item>

    {
     userInfo._id ? null : (
      <Form.Item
       // initialValue={userInfo.password}
       label="密码"
       name="password"
       rules={[
        {
         required: true,
        },
       ]}
      >
       <Input.Password />
      </Form.Item>
     )
    }
    <Form.Item
     initialValue={userInfo.phone}
     label="手机号"
     name="phone"
    >
     <Input />
    </Form.Item>
    <Form.Item
     initialValue={userInfo.email}
     label="邮箱"
     name="email"
    >
     <Input />
    </Form.Item>
    <Form.Item
     initialValue={userInfo.role_id}
     label="所属角色"
     name="role_id"
    >
     <Select placeholder="请选择">
      {
       roles.map(role => {
        return <Option key={role._id} value={role._id}>{role.name}</Option>
       })
      }
     </Select>
    </Form.Item>
   </Form>
  </div>
 );
}

export default forwardRef(UserForm);