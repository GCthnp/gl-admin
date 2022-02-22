import { post, get } from "./ajax"

// 登录接口
const reqLogin = (username, password) => post('/login', { username, password })
// 添加用户
const reqAddUser = (user) => post('/manage/user/add', user)
// 删除用户
const reqDeleteUser = (userId) => post("/manage/user/delete",userId)
// 更新用户
const reqUpdateUser = (user) => post("/manage/user/update",user)
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
// 删除商品
const reqDeleteProduct = (productId) => post("/mange/product/delete",productId)
// 根据ID/Name搜索产品分页列表
/** 
 * searchType 两个值：productName/productDesc
*/
const reqSearch = ({ pageNum, pageSize, searchName, searchType }) => get("/manage/product/search", {
 pageNum,
 pageSize,
 [searchType]: searchName
})
// 根据分类ID获取分类
const reqInfo = (categoryId) => get("/manage/category/info", { categoryId })
// 对商品进行上架/下架处理
const reqStatus = (productId, status) => post("/manage/product/updateStatus", { productId, status })
// 删除图片
const delImg = (name) => post("/manage/img/delete", { name })

// 添加商品 或 修改商品
const reqAddOrUpdateProduct = (product) => post("/manage/product/" + (product._id ? "update" : "add"), product)
// 修改商品
// const reqUpdateProduct = (product) => post("/manage/product/add",product)

// 获取角色列表
const reqRole = () => get("/manage/role/list")
// 添加角色
const reqAddRole = (roleName) => post("/manage/role/add", roleName)
// 设置角色权限
const reqUpdateRole = (role) => post("/manage/role/update", role)
// 获取用户列表
const reqUsers = () => get("/manage/user/list")
// 修改密码
const reqUpdatePwd = ({userId,oldPassword,password}) => post("/manage/user/updatepwd",{userId,oldPassword,password})



export {
 reqLogin,
 reqAddUser,
 reqDeleteUser,
 reqUpdateUser,
 reqWeather,
 reqIp,
 reqCategoryList,
 reqUpdateCategory,
 addCotegory,
 reqProduct,
 reqDeleteProduct,
 reqSearch,
 reqInfo,
 reqStatus,
 delImg,
 reqAddOrUpdateProduct,
 // reqUpdateProduct
 reqRole,
 reqAddRole,
 reqUpdateRole,
 reqUsers,
 reqUpdatePwd
}