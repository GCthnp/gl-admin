
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from "./pages/Login"
import Admin from "./pages/Admin"


function App() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route path='/' component={Admin}/>
        {/* <Route exact path="/" component={Login} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
