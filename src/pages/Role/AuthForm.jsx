import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import { Form, Input, Tree } from "antd"

import menuList from "../../utils/menuList"


const AuthForm = (props, ref) => {
 const [form] = Form.useForm();
 const { menus, name } = props.selectedRole



 const [expandedKeys, setExpandedKeys] = useState([]);  //选中的值
 const [checkedKeys, setCheckedKeys] = useState([]);  //选中的集合
 const [selectedKeys, setSelectedKeys] = useState([]);
 const [autoExpandParent, setAutoExpandParent] = useState(true);  //自动展开父级列表

 useImperativeHandle(ref, () => ({
  // getValue 就是暴露给父组件的方法
  getAuthValue: () => {
   return checkedKeys
  },
  resetForm: () => {
   setCheckedKeys(menus)
  }
 }));

 useEffect(() => {
  setCheckedKeys(menus)
  setExpandedKeys(menus)
  // eslint-disable-next-line
 }, [])

 const onExpand = (expandedKeysValue) => {
  console.log('onExpand', expandedKeysValue);
  setExpandedKeys(expandedKeysValue);
  setAutoExpandParent(false);
 };

 const onCheck = (checkedKeysValue) => {
  console.log('onCheck', checkedKeysValue);
  setCheckedKeys(checkedKeysValue);
 };

 const onSelect = (selectedKeysValue, info) => {
  console.log('onSelect', info);
  setSelectedKeys(selectedKeysValue);
 };

 return (

  <Form form={form}>
   <Form.Item
    label="角色名称"
   >
    <Input disabled value={name} />
   </Form.Item>
   <Form.Item
    name="menus"
   >
    <Tree
     checkable
     onExpand={onExpand}
     expandedKeys={expandedKeys}
     autoExpandParent={autoExpandParent}
     onCheck={onCheck}
     checkedKeys={checkedKeys}
     onSelect={onSelect}
     selectedKeys={selectedKeys}
     treeData={menuList}
    />
   </Form.Item>
  </Form>

 );
};

export default forwardRef(AuthForm);