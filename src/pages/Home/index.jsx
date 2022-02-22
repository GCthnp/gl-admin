import React, { useState } from 'react';
import { Card, DatePicker } from 'antd';

import moment from 'moment';

import {
 // G2,
 Chart,
 Tooltip,
 Interval,
 LineAdvance
} from "bizcharts";

const data = [
 { name: '店铺访问量', 月份: '1月', 访问量: 508 },
 { name: '店铺访问量', 月份: '2月', 访问量: 280 },
 { name: '店铺访问量', 月份: '3月', 访问量: 319 },
 { name: '店铺访问量', 月份: '4月', 访问量: 812 },
 { name: '店铺访问量', 月份: '5月', 访问量: 437 },
 { name: '店铺访问量', 月份: '6月', 访问量: 210 },
 { name: '店铺访问量', 月份: '7月', 访问量: 242 },
 { name: '店铺访问量', 月份: '8月', 访问量: 325 },
 { name: '店铺访问量', 月份: '9月', 访问量: 471 },
 { name: '店铺访问量', 月份: '10月', 访问量: 205 },
 { name: '店铺访问量', 月份: '11月', 访问量: 224 },
 { name: '店铺访问量', 月份: '12月', 访问量: 335 },
];

const data2 = [
 { month: "1", city: "访问量", temperature: 508 },
 { month: "1", city: "销量", temperature: 120 },
 { month: "2", city: "访问量", temperature: 280 },
 { month: "2", city: "销量", temperature: 92 },
 { month: "3", city: "访问量", temperature: 319 },
 { month: "3", city: "销量", temperature: 86 },
 { month: "4", city: "访问量", temperature: 812 },
 { month: "4", city: "销量", temperature: 340 },
 { month: "5", city: "访问量", temperature: 437 },
 { month: "5", city: "销量", temperature: 137 },
 { month: "6", city: "访问量", temperature: 210 },
 { month: "6", city: "销量", temperature: 63 },
 { month: "7", city: "访问量", temperature: 242 },
 { month: "7", city: "销量", temperature: 64 },
 { month: "8", city: "访问量", temperature: 325 },
 { month: "8", city: "销量", temperature: 120 },
 { month: "9", city: "访问量", temperature: 471 },
 { month: "9", city: "销量", temperature: 140 },
 { month: "10", city: "访问量", temperature: 205 },
 { month: "10", city: "销量", temperature: 56 },
 { month: "11", city: "访问量", temperature: 224 },
 { month: "11", city: "销量", temperature: 88 },
 { month: "12", city: "访问量", temperature: 335 },
 { month: "12", city: "销量", temperature: 92 }
];


const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const tabListNoTitle = [
 {
  key: 'tab1',
  tab: '访问量',
 },
 {
  key: 'tab2',
  tab: '销量',
 }
];

const contentListNoTitle = {
 tab1: (
  <Chart height={400} padding="auto" data={data} autoFit>
   <Interval
    adjust={[
     {
      type: 'dodge',
      marginRatio: 0,
     },
    ]}
    color="name"
    position="月份*访问量"
   />
   <Tooltip shared />
  </Chart>
 ),
 tab2: (
  <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data2} >
   <LineAdvance
    shape="smooth"
    point
    area
    position="month*temperature"
    color="city"
   />

  </Chart>
 ),
};


function Home(props) {

 // const [key, setKey] = useState('tab1')
 const [noTitleKey, setNoTitleKey] = useState('tab1')

 const date = new Date()
 const getTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const nowTime = year + "/" + month + "/" + day
  return nowTime
 }
 const getTopTime = (date) => {
  const year = date.getFullYear() - 1
  const month = date.getMonth() + 1
  const day = date.getDate() 
  const nowTime = year + "/" + month + "/" + day
  return nowTime
 }


 const onTabChange = (key, type) => {
  console.log(key, type);
  // this.setState({ [type]: key });
  setNoTitleKey(key)
 };

 const moreDate = (
  <RangePicker
   defaultValue={[moment(getTopTime(date)), moment(getTime(date))]}
   format={dateFormat}
  />
 )

 return (
  <div>
   <Card
    style={{ width: '100%' }}
    tabList={tabListNoTitle}
    activeTabKey={noTitleKey}
    onTabChange={key => {
     onTabChange(key, 'noTitleKey');
    }}
    extra={moreDate}
   >
    {contentListNoTitle[noTitleKey]}
   </Card>
  </div>
 );
}

export default Home;