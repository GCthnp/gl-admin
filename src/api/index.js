import { post, get } from "./ajax"

// 登录接口
const reqLogin = (username, password) => post('/login', { username, password })
// 登录接口
const reqAddUser = (user) => post('/manage/user/add', user)
// 高德地图天气查询
const reqWeather = (parameters) => get("https://restapi.amap.com/v3/weather/weatherInfo", parameters)
// 高德 获取定位ip信息  key为高德key
const reqIp = () => get("http://restapi.amap.com/v3/ip?key=55914c864c118ff8634f2789926785f3")
// 获取categoryList 一级分类
const reqCategoryList = (parentId) => get("/manage/category/list", { parentId })
// 修改分类名称
const reqUpdateCategory = (categoryId, categoryName) => post("/manage/category/update", { categoryId, categoryName })
// 添加分类
const addCotegory = (parentId, categoryName) => post("/manage/category/add", { parentId, categoryName })
// 获取商品分类列表
const reqProduct = (pageNum, pageSize) => get("/manage/product/list", { pageNum, pageSize })
// 根据ID/Name搜索产品分页列表
/** 
 * searchType 两个值：productName/productDesc
*/
const reqSearch = ({ pageNum, pageSize, searchName, searchType }) => get("/manage/product/search", {
 pageNum,
 pageSize,
 [searchType]: searchName
})

export {
 reqLogin,
 reqAddUser,
 reqWeather,
 reqIp,
 reqCategoryList,
 reqUpdateCategory,
 addCotegory,
 reqProduct,
 reqSearch
}