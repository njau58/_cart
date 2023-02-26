import React from "react";
import CheckOutProduct from "../products/CheckOutProduct/CheckOutProduct";
import SubTatal from "../SubTatal/SubTatal";
import './CheckOut.css'
import {useStateValue} from '../../Store/StateProvider'
import FlipMove from 'react-flip-move';

function CheckOut() {
  const[{cart}, dispatch] = useStateValue()
  const emptyCart = () =>{

    dispatch({
      type:'EMPTY_CART'
    })

  }
   return (
    <div className="checkout">
      <div className="checkout__left">
        <img
        className="checkout__ad"
          alt="advert_banner"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />
        <div >
           <h2 className="checkout__title" >Your Shopping Cart</h2>
           {cart?.map((item, i)=>
           <FlipMove>
           <CheckOutProduct
          
             id={item.id}
             price={item.price}
             rating={item.rating}
             title={item.title}
             image={item.image}


           />
           </FlipMove>)}


      
          
        </div>

       {cart.length===0||cart.length===1?null:<button onClick={emptyCart} className="emptyCart__button">Empty cart</button>} 
      </div>
      <div className="checkout__right">
       <SubTatal/>
      </div>
    </div>
  );
}

export default CheckOut;
