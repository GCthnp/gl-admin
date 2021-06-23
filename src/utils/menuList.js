import {
 AppstoreOutlined,
 HomeOutlined,
 AreaChartOutlined,
 UserOutlined,
} from '@ant-design/icons';

const menuList = [
 {
  title: '首页',
  icon: <HomeOutlined />,
  key: '/home'
 },
 {
  title: '商品',
  icon: <AppstoreOutlined />,
  key: '/appstore',
  children: [
   {
    title: '品类管理',
    icon: <HomeOutlined />,
    key: '/category'
   },
   {
    title: '商品管理',
    icon: <HomeOutlined />,
    key: '/product'
   },
  ]
 },
 {
  title: '用户管理',
  icon: < UserOutlined />,
  key: '/user'
 },
 {
  title: '角色管理',
  icon: < UserOutlined />,
  key: '/role'
 },
 {
  title: '图形图标',
  icon: <AreaChartOutlined />,
  key: '/charts',
  children: [
   {
    title: '柱形图',
    icon: <AreaChartOutlined />,
    key: '/charts/bar'
   },
   {
    title: '折线图',
    icon: <AreaChartOutlined />,
    key: '/charts/line'
   },
   {
    title: '饼图',
    icon: <AreaChartOutlined />,
    key: '/charts/pie'
   },
  ]
 }
]
export default menuList