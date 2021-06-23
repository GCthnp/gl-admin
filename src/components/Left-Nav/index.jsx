import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import "./index.less"
import menuList from "../../utils/menuList"

import { Menu } from "antd"

const { SubMenu } = Menu;

// reduce渲染组件
// const getMenuListReduce = (menuList) => {
//  return menuList.reduce((preItem, item) => {
//   if (!item.children) {
//    preItem.push((
//     <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
//    ))
//   } else {
//    preItem.push((
//     <SubMenu key={item.key} icon={item.icon} title={item.title}>
//      {
//       getMenuListReduce(item.children)
//      }
//     </SubMenu>
//    ))
//   }
//   return preItem
//  }, [])
// }


function LeftNav(props) {
  let nowPath = props.nowPath
  // 对menu的 selectedKeys 进行判断
  const getPath = (nowPath) => {
    const newPath = nowPath.slice(1)
    if (newPath.indexOf("/") === -1) return
    const i = newPath.indexOf("/")
    nowPath = "/" + newPath.slice(0, i)
    setSelectItem(nowPath)
  }

  useEffect(() => {
    getPath(nowPath)
  }, [])


  const [selectItem, setSelectItem] = useState([nowPath])


  // 默认打开的submenu
  function openkey(nowPath) {
    let openkeyValue = ''
    if (nowPath === "/category" || nowPath === "/product" || nowPath.indexOf("/product/") !== -1) {
      openkeyValue = "/appstore"
    } else if (nowPath.indexOf("/charts/") !== -1) {
      openkeyValue = "/charts"
    } else {
      return nowPath
    }
    return openkeyValue
  }

  // 使用map+递归
  const getMenuList = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (<Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>)
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {
              getMenuList(item.children)
            }
          </SubMenu>)
      }
    })
  }

  return (
    <div className="leftnav">
      <div className="logo" >后台管理</div>

      <Menu
        onSelect={(item) => { setSelectItem(item.key) }}
        selectedKeys={selectItem}
        defaultOpenKeys={[openkey(nowPath)]}
        theme="dark"
        // selectedKeys={[nowPath]}
        defaultSelectedKeys={['/home']}
        mode="inline">
        {/* 第一种方法 */}
        {/* {
     menuList.map(item => {
      return !item.children ?
       (<Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>)
       :
       (<SubMenu key={item.key} icon={item.icon} title={item.title}>
        {
         item.children.map((itemChild) => {
          return (<Menu.Item key={itemChild.key} icon={itemChild.icon}><Link to={itemChild.key}>{itemChild.title}</Link></Menu.Item>)
         })
        }
       </SubMenu>)
     })
    } */}


        {
          getMenuList(menuList)
        }
        {/* reduce {getMenuListReduce(menuList)} */}
      </Menu>
    </div>
  );
}

export default LeftNav;