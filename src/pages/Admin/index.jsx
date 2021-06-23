import React, { useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import Header from "../../components/Header";
import LeftNav from "../../components/Left-Nav";
import userInfo from "../../utils/memoryUtils";
import storeUtils from "../../utils/storeUtils";
import menuList from "../../utils/menuList"

import Home from "../Home";
import Category from "../Category";
import Product from "../Product";
import User from "../User";
import Role from "../Role";
import Bar from "../Charts/bar";
import Line from "../Charts/line";
import Pie from "../Charts/pie";

import { Layout } from "antd";
const { Content, Footer, Sider } = Layout;




function Admin(props) {

 const [collapsed, setCollapsed] = useState(false)
 const onCollapse = () => {
  setCollapsed(!collapsed)
 };

 const singOut = () => {
  storeUtils.removeUser()
  userInfo.user = {}
  props.history.replace('/login')
 }


 // 对title 标题进行处理
 const getTitle = (menuList) => {
  let title = ''
  menuList.forEach(item => {
   const { pathname } = props.location
   if (pathname === item.key) {
    title = item.title
   } else if (item.children) {
    item.children.forEach(item => {
     // 路径包含item的key
     if (pathname === item.key || pathname.indexOf(item.key) === 0) {
      title = item.title
     }
    })
   }
  })
  return title;
 }
 const title = getTitle(menuList)


 const { user } = userInfo
 if (!user || !user._id) {
  return <Redirect to="/login"></Redirect>
 }

 return (
  <div style={{ minWidth: '1024px' }}>

   <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
     {/* 左侧menu */}
     <LeftNav nowPath={props.location.pathname}></LeftNav>
    </Sider>
    <Layout className="site-layout">
     {/* 网页头部 */}
     <Header title={title} user={user} singOut={singOut}></Header>
     {/* 网页内容区 */}
     <Content style={{ margin: '20px 16px 0', backgroundColor: '#fff' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
       <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/category" component={Category}></Route>
        <Route path="/product" component={Product}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/role" component={Role}></Route>
        <Route path="/charts/bar" component={Bar}></Route>
        <Route path="/charts/line" component={Line}></Route>
        <Route path="/charts/pie" component={Pie}></Route>
        <Redirect to="/home"></Redirect>
       </Switch>
      </div>
     </Content>
     {/* 底部 */}
     <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
   </Layout>

  </div>
 );
}

export default Admin;