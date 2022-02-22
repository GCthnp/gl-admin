import React, { useEffect, useState } from 'react';
import { Card, List, Typography } from "antd"

import { reqInfo } from "../../../api/index"
import style from './pdetail.module.css'
import { ArrowLeftOutlined } from '@ant-design/icons';
const Item = List.Item


function Pdetail(props) {
  const [cname, setCname] = useState('')
  const [pname, setPname] = useState('')

  const { product } = props.location.state
  console.log(product);
  const { imgs } = product
  if (imgs.length > 0) {
    
  }


  const reqCataInfo = async (categoryId) => {
    const res = await reqInfo(categoryId)
    const { name } = res.data
    if (res.data.parentId === "0") {
      setPname(name)
    } else {
      setCname(name)
    }
    console.log(res.data);
  }

  useEffect(() => {
    reqCataInfo(product.categoryId)
    reqCataInfo(product.pCategoryId)
    // eslint-disable-next-line
  }, [])

  const title = (
    <div>
      <span onClick={() => { props.history.goBack() }}><ArrowLeftOutlined style={{ color: '#52c41a' }} /></span>
      <span style={{ marginLeft: "10px" }}>商品详情</span>
    </div>
  )

  return (
    <div>

      <Card title={title}>
        <List >
          <Item>
            <Typography.Title style={{ display: "inline-block" }} level={4}>商品名称：</Typography.Title>
            {product.name}
          </Item>
          <Item>
            <Typography.Title style={{ display: "inline-block" }} level={4}>商品描述：</Typography.Title>
            {product.desc}
          </Item>
          <Item className={"ant-list-item-no-flex"}>
            <Typography.Title style={{ display: "inline-block" }} level={4}>商品价格：</Typography.Title>
            {product.price}
          </Item>
          <Item>
            <Typography.Title style={{ display: "inline-block" }} level={4}>所属分类：</Typography.Title>
            {pname}--{cname}
          </Item>
          <Item className={style.shopImg}>
            <Typography.Title level={4}>商品图片：</Typography.Title>
            {
              imgs.length > 0 ? imgs.map((item, index) => (<img style={{ width: "100px", height: "80px",marginLeft:"10px" }} src={"http://localhost:5000/upload/" + item} alt={item.name} />)) : "暂无"
            }
          </Item>
          <Item>
            <Typography.Title style={{ display: "inline-block" }} level={4}>商品详情：</Typography.Title>
            {product.detail}
          </Item>

        </List>
      </Card>
    </div>
  );
}

export default Pdetail;