import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CheckOut from "./components/CheckOut/CheckOut";
import Login from "./components/Authentication/Login/Login";
import {auth} from './firbase'
import React, {useEffect} from 'react'
import { useStateValue } from "./Store/StateProvider";
import Payment from "./components/Payment/Payment"
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe}  from '@stripe/stripe-js'
import Orders from "./components/Orders/Orders";
import axios from 'axios'
import unirest from 'unirest'


const promise = loadStripe('pk_test_51KD2h7G80qy2ZwPvBQ9oufVeDk881gAfv6A1buRUsx54t7WOZvEFAmUf1DO5RKmuTkgDoxYSs778hiloNEzRksK400OOMLLAIj')

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{

    auth
    .onAuthStateChanged((authUser)=>{

      if(authUser){

        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })

      }

    })



  }, [])



  return (
   <Router>
    <div className="app">
     
      <Switch>
     
      <Route path="/checkout">
      <Header />
          <CheckOut />
        </Route>
      <Route path="/login">
          <Login/>
        </Route>
      <Route path="/orders">
          <Orders/>
        </Route>
      <Route path="/payment">
      <Elements stripe={promise}>
      <Payment/>
      </Elements>
        
        </Route>
        <Route path="/">
        <Header />
          <Home />
        </Route>
      
      </Switch>
    </div>
    </Router> 
  );
}

export default App;
