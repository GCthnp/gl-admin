import React, { useState, useEffect } from 'react';
import { Card, Button } from "antd"
import ReactECharts from "echarts-for-react"

import { reqCategoryList } from "../../api"

function Bar(props) {

 const [categorys, setCategorys] = useState([])
 const [sales, setSales] = useState([30, 10, 20, 18, 20, 36, 56, 23, 20, 43, 20, 5, 20, 36, 10, 10, 20])
 const [stores, setStores] = useState([52, 24, 36, 12, 40, 20, 8, 20, 36, 10, 19, 20, 36, 56, 10, 43, 20])

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
  setSales(sales.map(item => item + 1))
  setStores(
   stores.reduce((pre, next) => {
    pre.push(next - 1)
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
    text: '商品销量柱形图'
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
     type: 'bar',
     data: sales
    },
    {
     name: '库存',
     type: 'bar',
     data: stores
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

export default Bar;