import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Card, Space, message, Modal } from "antd"
import { reqUsers, reqAddUser, reqDeleteUser, reqUpdateUser } from "../../api"
import UserForm from "./UserForm"

let user = {}

function User(props) {
  const userForm = useRef()

  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [isShowAddUser, setIsShowAddUser] = useState(false)
  const [roleNames, setRoleNames] = useState({})

  // 添加用户
  const createUser = async () => {
    let userInfo = await userForm.current.getUserForm()
    let res
    if (user._id) {
      userInfo._id = user._id
      res = await reqUpdateUser(userInfo)
    } else {
      res = await reqAddUser(userInfo)
    }


    if (res.status === 0) {
      getUsers()
      message.success(user._id?"修改成功":"添加成功")
    } else {
      message.error(res.msg)
    }
    console.log(res);
    setIsShowAddUser(false)
    userForm.current.resetForm()
  }
  const getUsers = async () => {
    const result = await reqUsers()
    const { users, roles } = result.data
    if (result.status === 0) {
      initRoleNames(roles)
      setUsers(users)
      setRoles(roles)
    } else {
      message.error(result.msg)
    }
  }
  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [])

  const deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}用户吗？`,
      onOk: async () => {
        const userId = {
          userId: user._id
        }
        const result = await reqDeleteUser(userId)
        if (result.status === 0) {
          message.success("删除用户成功")
          getUsers()
        } else {
          message.error(result.msg)
        }
      }
    })
    console.log(user);
  }
  const showUpdate = (role) => {
    user = role
    setIsShowAddUser(true)
  }

  const initRoleNames = (roles) => {
    // console.log(roles);
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    setRoleNames(roleNames)
    // console.log(roleNames);
  }
  const userTitle = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (role_id) => roleNames[role_id]
      //  roles.length > 0 && role_id ? roles.find(item => item._id === role_id).name : null
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="small">
          <Button onClick={() => { showUpdate(record) }} size="small" type="primary">修改</Button>
          <Button onClick={() => { deleteUser(record) }} size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const addUser = (<Button onClick={() => { setIsShowAddUser(true); user = {} }} type="primary">创建用户</Button>)

  return (
    <div>
      <Card title={addUser}>
        <Table
          dataSource={users}
          columns={userTitle}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 4 }}
        >
        </Table>
      </Card>

      <Modal
        title={user._id ? "修改用户" : "创建用户"}
        visible={isShowAddUser}
        onOk={createUser}
        onCancel={() => {
          userForm.current.resetForm()
          setIsShowAddUser(false);
        }}
        destroyOnClose
      >
        <UserForm user={user} ref={userForm} roles={roles}></UserForm>
      </Modal>
    </div>
  );
}

export default User;