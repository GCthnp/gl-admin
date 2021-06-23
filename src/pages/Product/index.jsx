import React from 'react';
import { Switch, Route } from "react-router-dom"

import ProductHome from "./Children/ProductHome"
import  AddProduct  from "./Children/AddProduct"
import  Pdetail  from "./Children/Pdetail"

function Product(props) {
 return (
  <div>
   <Switch>
    <Route path="/product" component={ProductHome} exact></Route>{/*exact 路径完全匹配 */}
    <Route path="/product/addproduct" component={AddProduct}></Route>
    <Route path="/product/pdetail" component={Pdetail}></Route>
   </Switch>
  </div>
 );
}

export default Product;