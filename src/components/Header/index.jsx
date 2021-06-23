import React, { useState, useEffect } from 'react';

import "./index.less"

import { reqWeather, reqIp } from "../../api"

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

// 高德需要发送请求的参数
const params = {
 key: '55914c864c118ff8634f2789926785f3',
 city: '',
 extensions: 'base'
}

function Header(props) {
 const { user, singOut } = props
 const [cityweather, setCityweather] = useState({
  adcode: '',
  city: '',
  province: '',
  temperature: '',
  weather: '',
  reporttime: ''
 })

 useEffect(() => {
  // getWeather()
 }, [])
 const getWeather = async () => {
  console.log("定位获取城市信息");
  const resIp = await reqIp()
  params.city = resIp.adcode
  if (params.city) {
   const res = await reqWeather(params)
   setCityweather(res.lives[0]);
  }
 }

 function showConfirm() {
  getWeather()
  confirm({
    title: '你确定要退出登录吗？',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log('OK');
      singOut()
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

 return (
  <div className="main-header">
   <div className="logOut">Hello, {user.username} <span onClick={showConfirm}>退出</span></div>
   <div className="header-bottom">
    <div className="header-bottom-left">{props.title}</div>
    <div className="header-bottom-right">
     <div>{cityweather.reporttime.slice(0, 10)}</div>
     <div>{cityweather.city}</div>
     <div>{cityweather.weather}</div>
    </div>
   </div>
  </div>
 );
}

export default Header;