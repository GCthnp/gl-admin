import React, { useState, useEffect } from 'react';
import { Card, Button } from "antd"
import ReactECharts from "echarts-for-react"

import { reqCategoryList } from "../../api"

function Pie(props) {

 const [categorys, setCategorys] = useState([])
 const [sales, setSales] = useState([14, 28, 20, 18, 20, 56, 32, 23, 20, 43, 20, 5, 20, 36, 10, 10, 20])
 const [stores, setStores] = useState([52, 20, 36, 12, 40, 20, 8, 20, 36, 10, 19, 20, 36, 56, 10, 43, 20])
 const [shopstores,setShopstores] = useState([])

 const getCate = async () => {
  const res = await reqCategoryList(0)
  console.log(res);

  if (res.status === 0) {
   const cate = res.data.reduce((pre, next, i) => {
    pre[i] = { name: next.name, value: sales[i] }
    return pre
   }, [])

   const store = res.data.reduce((pre, next, i) => {
    pre[i] = { name: next.name, value: stores[i] }
    return pre
   }, [])
   setShopstores(store)
   setCategorys(cate)
  }

 }

 useEffect(() => {
  getCate()
  // eslint-disable-next-line
 }, [])

 const updateBar = () => {
  console.log("更新");
  setSales(sales.map(item => item + Math.floor(Math.random() * 3)))
  setStores(
   stores.reduce((pre, next) => {
    pre.push(next - Math.floor(Math.random() * 3))
    return pre
   }, [])
  )

 }
 const getOption = () => {
  return {
   title: {
    text: '商品销量可视化',
    subtext: '饼图',
    left: 'center'
   },
   tooltip: {
    trigger: 'item'
   },
   legend: {
    orient: 'vertical',
    left: 'left',
   },
   series: [
    {
     name: '销量',
     type: 'pie',
     radius: '50%',
     data: categorys,
     emphasis: {
      itemStyle: {
       shadowBlur: 10,
       shadowOffsetX: 0,
       shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
     }
    }
   ]
  };
 }
 const getOptions = () => {
  return {
   backgroundColor: '#2c343c',

   title: {
    text: '商品库存',
    left: 'center',
    top: 20,
    textStyle: {
     color: '#ccc'
    }
   },

   tooltip: {
    trigger: 'item'
   },

   visualMap: {
    show: false,
    inRange: {
     colorLightness: [0, 1]
    }
   },
   series: [
    {
     name: '库存',
     type: 'pie',
     radius: '55%',
     center: ['50%', '50%'],
     data: shopstores.sort(function (a, b) { return a.value - b.value; }),
     roseType: 'radius',
     label: {
      color: 'rgba(255, 255, 255, 0.3)'
     },
     labelLine: {
      lineStyle: {
       color: 'rgba(255, 255, 255, 0.3)'
      },
      smooth: 0.2,
      // length: 10,
      // length2: 20
     },
     itemStyle: {
      color: '#c23531',
      shadowBlur: 200,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
     },

     animationType: 'scale',
     animationEasing: 'elasticOut',
     animationDelay: function (idx) {
      return Math.random() * 200;
     }
    }
   ]
  };

 }

 return (
  <div>
   <Card title={<Button onClick={() => updateBar()}>更新</Button>}>
    <ReactECharts option={getOption()} />
    <ReactECharts option={getOptions()} />
   </Card>
  </div>
 );
}

export default Pie;