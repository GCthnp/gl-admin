
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from "./pages/Login"
import Admin from "./pages/Admin"
import ShopHome from "./pages/ShopHome"


function App() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path="/login" component={Login} />
        <Route path="/shophome" component={ShopHome}></Route>
        <Route exact path="/" component={Admin} />
        <Route path='/' component={Admin}/>
        {/* <Route exact path="/" component={Login} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
