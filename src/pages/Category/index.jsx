import React, { useEffect, useState } from 'react';

import { reqCategoryList, reqUpdateCategory, addCotegory } from "../../api/index"
import { Card, Button, Table, Space, Modal, Input, Select, message } from 'antd';
import {
  ArrowRightOutlined
} from '@ant-design/icons';
const { Option } = Select;


function Category(props) {
  const [listData, setListData] = useState([]) //一级分类数据
  const [categorId, setCategorId] = useState('')
  const [subCategorys, setSubCategorys] = useState([])
  const [parentId, setParentId] = useState('0')
  const [parentName, setParentName] = useState('')
  const [showModal, setShowModal] = useState(0)  //0不显示，1显示修改，2显示添加
  const [updataValue, setUpdataValue] = useState('') //获取修改框的数据
  const [parentRecord, setParentRecord] = useState({})
  const [subName, setSubName] = useState('')
  const [selectId, setSelectId] = useState('0')

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      width: '70%'
      // render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      className: 'column-money',
      align: 'left',
      width: '30%',
      render: (record) => (
        <Space size="middle">
          <Button type="link" onClick={() => { showUpdataModal(record) }}>修改分类</Button>
          {
            parentId === '0' ?
              <Button onClick={() => { seeChildren(record) }}>查看子分类</Button> : null
          }
        </Space>
      ),
    }
  ];

  // 查看子分类列表
  const seeChildren = async (record) => {
    const result = await reqCategoryList(record._id)
    setParentRecord(record)
    setSubCategorys(result.data);
    setParentId(record._id)
    setParentName(record.name)
    setSubName(record.name)
  }
  // 点击展示一级分类数据
  const showListData = () => {
    setParentId('0');
    setSubCategorys([])
    setParentName('')
  }

  // 展示修改分类的modal
  const showUpdataModal = async (record) => {
    setCategorId(record._id)
    if (record.parentId === '0') {
      setParentName(record.name)
    } else {
      setSubName(record.name)
    }
    setShowModal(1)
  }

  // 添加分类的确定
  const handleAddOk = async () => {
    setShowModal(0)

    const result = await addCotegory(selectId, updataValue)
    if (result.status === 0 && selectId === "0") {
      fetchData()
    } else {
      seeChildren(parentRecord)
    }

  }
  // 请求一级分类参数
  const fetchData = async () => {
    const response = await reqCategoryList("0")
    setListData(response.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  // 修改更新分类信息的方法
  const updataCategory = async (categorId) => {
    if (!updataValue.trim()) return message.error("不能为空");
    setShowModal(0)
    const result = await reqUpdateCategory(categorId, updataValue)
    if (result.status === 0) {
      // 根据父级id是否为0决定需要更新的数据
      if (parentId === '0') {
        fetchData()
      } else {
        seeChildren(parentRecord)
      }
    }
    setUpdataValue('')
  }


  // 设置分页的参数
  const tablePage = {
    pageSize: 4
  }

  return (
    <div>
      <Card title={parentId === '0' ? '一级分类列表' : (
        <div>
          <Button onClick={showListData} type="link">一级分类列表</Button>
          <ArrowRightOutlined />
          <span>{parentName}</span>
        </div>

      )
      } extra={<Button onClick={() => { setShowModal(2) }} type="primary">+  添加</Button>}>
        <Table
          columns={columns}
          dataSource={parentId === '0' ? listData : subCategorys}
          bordered
          rowKey="_id"
          pagination={tablePage}
        />
      </Card>

      <Modal
        destroyOnClose
        key={parentName}
        title="修改分类"
        visible={showModal === 1}
        onCancel={() => { setSubName(''); setShowModal(0) }}
        onOk={() => { updataCategory(categorId) }}
      >
        
        <Input
          onChange={(e) => { setUpdataValue(e.target.value) }}
          defaultValue={parentId === '0' ? parentName : subName}
          placeholder="修改分类名称" />
      </Modal>

      <Modal
        destroyOnClose
        title="添加分类"
        visible={showModal === 2}
        onCancel={() => { setShowModal(0) }}
        onOk={handleAddOk}
      >
        <Select
          onSelect={(_, option) => { setSelectId(option.key) }}
          style={{ width: '100%', margin: '30px 0' }}
          defaultValue="一级分类" >
          <Option key="0" value="一级分类">一级分类</Option>
          {

            listData.map(item => {
              return <Option value={item.name} key={item._id}>{item.name}</Option>
            })

          }
        </Select>
        <Input
          onChange={(e) => { setUpdataValue(e.target.value) }}
          placeholder="添加分类" />
      </Modal>
    </div>
  );
}

export default Category;