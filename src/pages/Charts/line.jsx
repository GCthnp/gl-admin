import React, { useState, useEffect } from 'react';
import { Card, Button } from "antd"
import ReactECharts from "echarts-for-react"

import { reqCategoryList } from "../../api"

function Line(props) {

 const [categorys, setCategorys] = useState([])
 const [sales, setSales] = useState([14, 28, 20, 18, 20, 56, 32, 23, 20, 43, 20, 5, 20, 36, 10, 10, 20])
 const [stores, setStores] = useState([52, 20, 36, 12, 40, 20, 8, 20, 36, 10, 19, 20, 36, 56, 10, 43, 20])

 const getCate = async () => {
  const res = await reqCategoryList(0)
  console.log(res);

  if (res.status === 0) {
   const cate = res.data.reduce((pre, next, i) => {
    pre[i] = next.name
    return pre
   }, [])
   setCategorys(cate)
  }

 }

 useEffect(() => {
  getCate()
  // eslint-disable-next-line
 }, [])

 const updateBar = () => {
  console.log("更新");
  setSales(sales.map(item => item + Math.floor(Math.random()*3)))
  setStores(
   stores.reduce((pre, next) => {
    pre.push(next - Math.floor(Math.random()*3))
    return pre
   }, [])
  )

 }
 const getOption = () => {
  return {
   grid: {
    height: 220
   },
   title: {
    text: '商品销量折线图'
   },
   tooltip: {},
   legend: {
    data: ['销量', '库存']
   },
   xAxis: {
    data: categorys
   },
   yAxis: {},
   series: [
    {
     name: '销量',
     data: sales,
     type: 'line'
    },
    {
     name: '库存',
     data: stores,
     type: 'line'
    }
   ]
  };
 }

 return (
  <div>
   <Card title={<Button onClick={() => updateBar()}>更新</Button>}>


    <ReactECharts option={getOption()} />
   </Card>
  </div>
 );
}

export default Line;