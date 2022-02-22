import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input } from "antd"
// import { reqAddRole } from "../../api"

function AddRole(props, ref) {
 const [form] = Form.useForm();
 useImperativeHandle(ref, () => ({
  // getValue 就是暴露给父组件的方法
  getValue: async () => {
   const values = await form.validateFields()
   // form.validateFields().then((values) => {
   // console.log(values);
   // role = values
   // })
   return values
  }
 }));

 return (
  <div>
   <Form form={form}>

    <Form.Item
     label="角色名称"
     name="roleName"
     rules={[
      {
       required: true,
       message: 'Please input your roleName!',
      },
     ]}
    >
     <Input />
    </Form.Item>
   </Form>
  </div>
 );
}

export default forwardRef(AddRole);