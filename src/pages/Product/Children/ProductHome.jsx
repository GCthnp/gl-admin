import React, { useState, useEffect } from 'react';

import { reqProduct, reqSearch, reqStatus, reqDeleteProduct } from "../../../api"

import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Space,
  message,
  Modal
} from "antd"
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


// 配置分页的参数
const tablePage = {
  pageSize: 2,
  total: 0,
  current: 1
}

function ProductHome(props) {
  const [products, setProducts] = useState([])//商品列表
  const [pageNum, setPageNum] = useState()
  const [loading, setLoading] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('productName')
  // 获取商品列表
  const getProducts = async (pageNum) => {
    setPageNum(pageNum)
    tablePage.current = pageNum
    let result;
    if (searchName) {
      setLoading(true)
      result = await reqSearch({
        pageNum,
        pageSize: tablePage.pageSize,
        searchName,
        searchType
      })
    } else {
      result = await reqProduct(pageNum, tablePage.pageSize)
    }
    setLoading(false)
    if (result.status === 0) {
      tablePage.total = result.data.total
      setProducts(result.data.list)
    }
  }
  const changeStatus = async (_id, status) => {
    const res = await reqStatus(_id, status)
    if (res.status === 0) {
      message.success("更新成功")
      getProducts(pageNum)
    }
  }

  // 删除商品
  const deleteProduct = async (productId) =>{
    
    
    Modal.confirm({
      title: '确认删除该商品吗？',
      onOk: async () => {
        const res = await reqDeleteProduct({productId})
        if (res.status === 0) {
          message.success("删除商品成功")
          getProducts(pageNum)
        } else {
          message.error(res.msg)
        }
      }
    }) 
  }
  useEffect(() => {
    getProducts(1)
    // eslint-disable-next-line
  }, [])

  // 卡片标题 搜索
  const title = (
    <div>
      <Select defaultValue={searchType} onChange={value => setSearchType(value)}>
        <Option value="productName" key="pname">按名称搜索</Option>
        <Option value="productDesc" key="pinfo">按详情搜索</Option>
      </Select>
      <Input
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        style={{ width: '200px', margin: '0 10px' }}
        placeholder="关键字"></Input>
      <Button onClick={() => { getProducts(1) }} type="primary" >搜索</Button>
    </div>
  )

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) => "￥" + price
    },
    {
      title: '状态',
      // dataIndex: 'status',
      render: (product) => {
        const { status, _id } = product
        return (
          <span>
            <div><Button
              onClick={() => {
                changeStatus(_id, status === 1 ? 2 : 1)
              }}
              type="primary"
              size="small"
            >{product.status === 1 ? "下架" : "上架"}</Button></div>
            <div>{product.status === 1 ? "在售" : "已下架"}</div>
          </span >
        )
      },
    },
    {
      title: '操作',
      render: (product) => (
        <Space size="small">
          <Button onClick={() => {
            props.history.push('/product/pdetail', { product })
          }}
            type="primary"
            size="small">详情</Button>
          <Button
            onClick={() => {
              props.history.push('/product/addproduct', { product })
            }}
            type="primary" size="small">修改</Button>
          <Button
            onClick={()=>{
              deleteProduct(product._id)
            }}
            type="primary" danger size="small">删除</Button>
        </Space>
      ),
    }
  ];

  return (
    <div>
      <Card title={title} extra={
        <Button
          onClick={() => { props.history.push("/product/addproduct") }}
          icon={<PlusOutlined />}
          type="primary">添加商品
        </Button>
      } style={{ width: '100%' }}>
        <Table

          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={columns}
          // onChange:(pageNum) => {getProducts(pageNum)}
          pagination={{ ...tablePage, onChange: getProducts }} />;
   </Card>
    </div>
  );

}

export default ProductHome;