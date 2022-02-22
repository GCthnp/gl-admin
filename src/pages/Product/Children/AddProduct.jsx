import React, { useState, useEffect, useRef } from 'react';

import { reqCategoryList, reqAddOrUpdateProduct } from "../../../api/index"
import UploadImgs from "./UploadImgs"
import RichTextEditor from "./RichTextEditor"

import { Card, Form, Input, Button, Cascader, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddProduct(props) {

   const getImgs = useRef();


   const [options, setOptions] = useState([]);
   const [editorValue, setEditorValue] = useState()
   // const [uimgs, setUimgs] = useState([])

   let product = {}
   let categorys = []
   let imgs = []
   let detail = ""
   if (props.location.state) {
      product = { ...props.location.state.product }
      console.log(product, props);
      detail = product.detail
      imgs = product.imgs
      categorys.push(product.categoryId)
      categorys.push(product.pCategoryId)
   }
   console.log(product);


   // 获取分类一级列表
   const getCategoryList = async (id) => {
      const res = await reqCategoryList(id)
      console.log(res.data);

      const category = res.data
      const options = category.map(item => ({
         value: item._id,
         label: item.name,
         isLeaf: false
      }))

      if (JSON.stringify(product) !== '{}') {
         console.log(product);

         const subCategorys = await reqCategoryList(product.categoryId)
         console.log(subCategorys);

         const childOption = subCategorys.data.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: true
         }))
         const targetOption = options.find(option => option.value === product.categoryId)

         console.log(options, product);

         targetOption.children = childOption
      }


      setOptions(options)
   }

   // 获取二级列表
   const loadData = async (selectedOptions) => {
      console.log(selectedOptions);
      // 获取点击的数据
      const targetOption = selectedOptions[0];
      targetOption.loading = true;

      //请求二级列表
      const childOption = await reqCategoryList(targetOption.value)
      targetOption.loading = false;
      if (childOption.status === 0) {
         targetOption.children = childOption.data.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: true
         }))
         setOptions([...options]);
      }
      console.log(targetOption);

   };
   useEffect(() => {
      getCategoryList("0")
      // eslint-disable-next-line
   }, [])


   const onFinish = async (values) => {
      values.imgs = getImgs.current.getImgs()
      values.detail = editorValue || <p />
      console.log('Success:', values);
      const { name, desc, price, imgs, detail, category } = values
      let categoryId = category[0]
      let pCategoryId = category[1]
      const product = { name, desc, price, imgs, detail, categoryId, pCategoryId }

      if (props.location.state) {
         product._id = props.location.state.product._id
      }
      console.log(product);
      const result = await reqAddOrUpdateProduct(product)
      if (result.status === 0) {
         message.success(`${props.location.state ? "更新" : "添加"}成功`)
      } else {
         message.error(`${props.location.state ? "更新" : "添加"}失败`)
      }
   }
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   }

   function onChange(value) {
      console.log(value);
   }

   const getEditorValue = (editorValue) => {
      setEditorValue(editorValue)
   }

   const title = (
      <div>
         <span onClick={() => { props.history.goBack() }}><ArrowLeftOutlined style={{ color: '#52c41a' }} /></span>
         <span style={{ marginLeft: "10px" }}>{props.location.state ? "修改" : "添加"}</span>
      </div>
   )


   return (
      <div>
         <Card title={title}>
            <Form name="basic"
               wrapperCol={{ span: 10 }}
               initialValues={{
                  remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
            >
               <Form.Item
                  initialValue={product.name}
                  label="商品名称"
                  name="name"
                  rules={[{ required: true, message: '商品名称' }]}>
                  <Input />
               </Form.Item>
               <Form.Item
                  initialValue={product ? product.desc : ''}
                  label="商品描述"
                  name="desc"
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} allowClear />
               </Form.Item>
               <Form.Item
                  initialValue={product.price}
                  label="商品价格"
                  name="price"
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input type="number" addonAfter="元" />
               </Form.Item>

               <Form.Item
                  initialValue={categorys}
                  name="category"
                  label="商品分类"
                  rules={[{ required: true, message: 'Please select your country!' }]}
               >
                  <Cascader options={options} loadData={loadData} onChange={onChange} placeholder="Please select" />
               </Form.Item>
               <Form.Item
                  label="&nbsp;&nbsp;&nbsp;商品图片"
                  name="imgs">
                  <UploadImgs ref={getImgs} imgs={imgs}></UploadImgs>
               </Form.Item>

               <Form.Item
                  wrapperCol={{ span: 20 }}
                  label="&nbsp;&nbsp;&nbsp;商品详情"
                  name="detail">
                  <RichTextEditor getEditorValue={getEditorValue} detail={detail} />
               </Form.Item>


               <Form.Item
                  wrapperCol={{
                     offset: 8,
                     span: 16,
                  }}
               >
                  <Button type="primary" htmlType="submit">
                     Submit
        </Button>
               </Form.Item>
            </Form>
         </Card>
      </div>
   );
}

export default AddProduct;