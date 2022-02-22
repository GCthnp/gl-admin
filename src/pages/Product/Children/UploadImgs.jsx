import React, { useState, useImperativeHandle, useRef, forwardRef, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';

import { delImg } from "../../../api/index"
// import ImgCrop from 'antd-img-crop';

function getBase64(file) {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
 });
}

function UploadImgs(props, ref) {
 console.log(props);




 const [previewVisible, setPreviewVisible] = useState(false)//展示Modal
 const [previewImage, setPreviewImage] = useState('')
 const [fileList, setFileList] = useState([]);

 useEffect(() => {
  isImgs()
  // eslint-disable-next-line
 }, [])

 const isImgs = () => {
  let upFileList = []
  if (props.imgs.length > 0) {
   const { imgs } = props
   upFileList = imgs.map((img, index) => {
    return {
     uid: -index,
     name: img,
     status: 'done',
     url: 'http://localhost:5000/upload/' + img
    }
   })
   setFileList(upFileList)
   console.log("有图片", upFileList);
  } else {
   console.log("无图");
  }
 }




 const onChange = async ({ file, fileList }) => {
  console.log(file, fileList);
  if (file.status === "done") {
   const result = file.response;
   if (result.status === 0) {
    message.success("上传成功")
    file = fileList[fileList.length - 1]
    file.name = result.data.name
    file.url = result.data.url
   } else {
    message.error("失败")
   }
  } else if (file.status === "removed") {
   const { name } = file.response ? file.response.data : file
   const res = await delImg(name)
   if (res.status === 0) {
    message.success("删除成功")
   } else {
    message.error("删除失败")
   }
  }
  console.log(fileList);

  setFileList(fileList);
 };

 const childRef = useRef();
 useImperativeHandle(ref, () => ({
  getImgs
 }));
 const getImgs = () => {
  return fileList.map(item => item.name)
 }

 const handlePreview = async file => {
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
  }
  setPreviewImage(file.url || file.preview)
  setPreviewVisible(true)
 };

 return (
  <div ref={childRef}>
   <Upload

    name="image"  //请求参数名
    action="/manage/img/upload"
    listType="picture-card"
    accept="image/*"
    fileList={fileList}
    onChange={onChange}
    onPreview={handlePreview}
   >
    {fileList.length < 5 && '+ Upload'}
   </Upload>
   <Modal
    visible={previewVisible}
    title=''
    footer={null}
    onCancel={() => { setPreviewVisible(false) }}
   >
    <img alt="example" style={{ width: '100%' }} src={previewImage} />
   </Modal>
  </div>
 );
}

export default forwardRef(UploadImgs);