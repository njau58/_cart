import React from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link } from 'react-router-dom'
import {useStateValue} from '../../Store/StateProvider'
import {auth}  from '../../firbase'

function Header() {
  const [{cart,user}, dispatch ] = useStateValue()

  const handleAuth = () =>{
    if(user){
      auth.signOut()
    }
  }
 
  return ( 
    <>
      <div className="header">
  <Link to='/'> <img
          alt="amazon_clone_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          className="header__logo"
        ></img></Link>
       
      
      <div  className="header__search">
        <input type="text" className="header__searchInput"></input>
        <SearchIcon className='header__searchIcon'/>
      </div>
      <div className="header__nav">  
      <Link  style={{textDecoration:'none'}}to={!user && '/login'}>
        <div onClick={handleAuth} className="header__option">
        <span className='header__optionLineOne'> Hello, {!user? 'Guest':user.email} </span>
        <span className='header__optionLineTwo' style={{color:'white'}}>{user?'SignOut':'SignIn'}</span>
        </div></Link>
        <Link style={{textDecoration:'none', color:'white'}} to="/orders">  <div className="header__option">
       <span className='header__optionLineOne'>Return</span>
            <span className='header__optionLineTwo'>& Orders</span>
        </div></Link>
        <div className="header__option">
        <span className='header__optionLineOne'>Your </span>
            <span className='header__optionLineTwo'>Prime</span>
        </div>
        <div className="header__basketOption">
       <Link to='/checkout'> <ShoppingBasketIcon  style={{color:'white'}}/></Link>
        <span className="header__optionLineTwo header__basketCount">{cart?.length}</span>
            
        </div>
      </div>
      </div>
    </>
  );
}

export default Header;
