import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BugerBuilder from './containers/BugerBuilder/Bugerbuider';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Signup from './containers/Signup/signup';
import Logout from './containers/Signup/Logout/logout';
import {authicatedRefresh} from './store/actions/index';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount(){
    this.props.authRefresh()
  
  }

  render(){
  return (
    <div className="App">
     <Layout>
       <Switch>
       <Route path="/auth" component={Signup}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/home" component={BugerBuilder}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Redirect  from="/" to="/home"/>
       </Switch>
     
     </Layout>
    </div>
  );
}
}

const mapDispatchtoProps=(dispatch)=>{
  return{
    authRefresh:()=>dispatch(authicatedRefresh())
  }
}

export default withRouter(connect(null,mapDispatchtoProps)(App));
