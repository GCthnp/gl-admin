import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import "./index.less"
import menuList from "../../utils/menuList"
import memoryUtils from "../../utils/memoryUtils"

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

    if (nowPath.indexOf("/charts/") !== -1) {
      setSelectItem([nowPath])
    } else {
      const newPath = nowPath.slice(1)
      if (newPath.indexOf("/") === -1) return
      const i = newPath.indexOf("/")
      nowPath = "/" + newPath.slice(0, i)
      setSelectItem([nowPath])
    }
  }

  useEffect(() => {
    getPath(nowPath)
    // eslint-disable-next-line
  }, [])


  const [selectItem, setSelectItem] = useState([nowPath])


  // 默认打开的submenu
  function openkey(nowPath) {
    let openkeyValue = ''

    if (nowPath === "/category" || nowPath === "/product" || nowPath.indexOf("/product/") !== -1) {
      openkeyValue = "/appstore"
    } else if (nowPath.indexOf("/charts/") !== -1) {
      openkeyValue = "/charts"
      console.log(nowPath.indexOf("/charts/"));
    } else {
      return nowPath
    }
    console.log(openkeyValue);
    return openkeyValue
  }

  const hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username

    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      return !!(item.children.find(child => menus.indexOf(child.key) !== -1))
    }


    return false
  }

  // 使用map+递归
  const getMenuList = (menuList) => {
    // eslint-disable-next-line
    return menuList.map(item => {
      if (hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>)
        } else {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {
                getMenuList(item.children)
              }
            </SubMenu>)
        }
      }
    })
  }

  return (
    <div className="leftnav">
      {
        // console.log(showTitle)
      
      }
      <div className="logo" ></div>
      <Menu

        onSelect={(item) => {
          setSelectItem([item.key]); console.log(item, selectItem);
        }}
        selectedKeys={selectItem[0] === "/admin" ? ["/home"] : selectItem}
        defaultOpenKeys={[openkey(nowPath)]}
        theme="dark"
        mode="inline"
        
      >
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