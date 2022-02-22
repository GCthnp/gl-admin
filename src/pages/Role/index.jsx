import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button, message, Modal } from "antd"
import { reqRole, reqAddRole, reqUpdateRole } from "../../api"

import AddRole from "./AddRole"
import AuthForm from "./AuthForm"

import userInfo from "../../utils/memoryUtils"
import { formetDate } from "../../utils/formetDate"


const columns = [
 {
  title: '角色名称',
  dataIndex: 'name'
 },
 {
  title: '创建时间',
  dataIndex: 'create_time',
  render: (create_time) => formetDate(create_time)
 },
 {
  title: '授权时间',
  dataIndex: 'auth_time',
  render: formetDate
 },
 {
  title: '授权人',
  dataIndex: 'auth_name',
 },
];


function Role(props) {
 const user = userInfo.user

 const inputForm = useRef()
 const menusForm = useRef()

 const [selectedRole, setSelectedRole] = useState({})  //选中的角色
 const [roles, setRoles] = useState([]) //所有的角色列表
 const [isShowAddRole, setIsShowAddRole] = useState(false) //是否显示添加角色
 const [isShowAuth, setIsShowAuth] = useState(false)  //是否显示设置角色权限

 const addRoleOk = async () => {
  const roleName = await inputForm.current.getValue()
  console.log(roleName);
  const res = await reqAddRole(roleName)
  console.log(res);

  if (res.status === 0) {
   message.success("添加角色成功")
   getRole()
  } else {
   message.error(res.msg)
  }
  setIsShowAddRole(false);
 };

 const setAuth = async () => {
  // 获取AuthForm 数据
  const menus = menusForm.current.getAuthValue()

  const updateRole = {
   _id: selectedRole._id,
   menus,
   auth_time: Date.now(),
   auth_name: user.username
  }
  const res = await reqUpdateRole(updateRole)
  if (res.status === 0) {
   message.success("更新成功")
   getRole()
  } else {
   message.error(res.msg)
  }

  console.log(updateRole);



  setIsShowAuth(false)
  // console.log(menusForm.current.getValue());
  // console.log(menusForm.current.getAuthValue());
 }

 // 表格标题 创建角色，设置角色权限
 const title = (
  <div>
   <Button onClick={() => { setIsShowAddRole(true) }} type="primary">创建角色</Button>
   <Button onClick={() => { setIsShowAuth(true) }} style={{ marginLeft: "10px" }} type="primary" disabled={selectedRole._id && user.role_id !== selectedRole._id ? false : true}>设置角色权限</Button>
  </div>
 )

 useEffect(() => {
  getRole()
  // eslint-disable-next-line
 }, [])

 // 获取role列表
 const getRole = async () => {
  const res = await reqRole()
  // console.log(res);
  const { status, data } = res
  if (status === 0) {
   // message.success("成功获取角色列表")
   // console.log(data);
   setRoles(data)
  }
  // console.log(roles);
 }

 // 点击行选择但选项
 const selectRow = (_, selectedRows) => {
  console.log(selectedRows);
  setSelectedRole(selectedRows[0])
 }

 const oncloseAuth = () => {

  menusForm.current.resetForm()
  setIsShowAuth(false);
 }

 return (
  <div>
   <Card title={title}>
    <Table
     // pagination={tablePage}
     onRow={record => {
      return {
       onClick: event => { // 点击行 
        setSelectedRole(record)
       },
      };
     }}
     rowKey="_id"
     rowSelection={{
      type: "radio",
      onChange: selectRow,
      selectedRowKeys: [selectedRole._id]
     }}
     bordered
     columns={columns}
     dataSource={roles}
     pagination={{ defaultPageSize: 3 }}
    />
   </Card>

   <Modal
    title="添加角色"
    visible={isShowAddRole}
    onOk={addRoleOk}
    onCancel={() => {

     setIsShowAddRole(false);
    }}
   >
    <AddRole ref={inputForm}></AddRole>
   </Modal>

   <Modal
    title="设置角色权限"
    visible={isShowAuth}
    onOk={setAuth}
    onCancel={
     oncloseAuth
    }
    key={selectedRole._id}
   // destroyOnClose
   >

    <AuthForm selectedRole={selectedRole} ref={menusForm}></AuthForm>
   </Modal>
  </div>
 );
}

export default Role;