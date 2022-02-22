import React, { useState, useEffect, useRef } from 'react';

import UpdatePassword from "./UpdatePassword"

import "./index.less"

import { reqWeather, reqIp, reqUpdatePwd } from "../../api"

import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


// 高德需要发送请求的参数
const params = {
  key: '55914c864c118ff8634f2789926785f3',
  city: '',
  extensions: 'base'
}

function Header(props) {

  const pwdForm = useRef()

  const { user, singOut } = props
  const [cityweather, setCityweather] = useState({
    adcode: '',
    city: '',
    province: '',
    temperature: '',
    weather: '',
    reporttime: ''
  })

  const [isUpdatePwd, setIsUpdatePwd] = useState(false)

  useEffect(() => {
    getWeather()
  }, [])
  const updatePwd = async () => {
    setIsUpdatePwd(true)
    // const res = await reqUpdatePwd({userId:user._id,oldPassword:"admin",password:"123456"})
    // console.log(res);
  }
  const getWeather = async () => {
    console.log("定位获取城市信息");
    const resIp = await reqIp()
    params.city = resIp.adcode
    if (params.city) {
      const res = await reqWeather(params)
      setCityweather(res.lives[0]);
    }
  }
  // 确认修改密码
  const changePwd = async () => {
    const pwdInfo = await pwdForm.current.getValue()
    console.log(pwdInfo);
    const {oldPassword, password } = pwdInfo
    if (pwdInfo.password) {
      const res = await reqUpdatePwd({ userId:user._id, oldPassword, password })
      if (res.status === 0) {
        message.success("密码更新成功,请重新登录")
        setIsUpdatePwd(false)
        singOut()
      } else {
        message.error(res.msg)
      }
    }
  }

  function showConfirm() {

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
      <div className="logOut">Hello, {user.username} <span onClick={showConfirm}>退出</span><span style={{ paddingLeft: "10px" }} onClick={updatePwd}>修改密码</span></div>
      <div className="header-bottom">
        <div className="header-bottom-left">{props.title}</div>
        <div className="header-bottom-right">
          <div>{cityweather.reporttime.slice(0, 10)}</div>
          <div>{cityweather.city}</div>
          <div>{cityweather.weather}</div>
        </div>
      </div>
      <Modal
        title="修改密码"
        visible={isUpdatePwd}
        onCancel={() => { setIsUpdatePwd(false) }}
        onOk={changePwd}
      >
        <UpdatePassword ref={pwdForm}></UpdatePassword>
      </Modal>
    </div>
  );
}

export default Header;