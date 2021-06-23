import React from 'react';
import { Card, List, Typography } from "antd"


import { ArrowLeftOutlined } from '@ant-design/icons';
const Item = List.Item

const title = (
 <div>
  <span><ArrowLeftOutlined style={{ color: '#52c41a' }} /></span>
  <span style={{ marginLeft: "10px" }}>商品详情</span>
 </div>
)

const data = [
 'Racing car sprays burning fuel into crowd.',
 'Japanese princess to wed commoner.',
 'Australian walks 100km after outback crash.',
 'Man charged over missing wedding girl.',
 'Los Angeles battles huge wildfires.',
];

function Pdetail(props) {
 console.log(props.location.state);
 const { product } = props.location.state

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
      {product.name}--{product.price}
     </Item>
     <Item>
      <Typography.Title style={{ display: "inline-block" }} level={4}>商品图片：</Typography.Title>
      {product.name}
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