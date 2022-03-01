import React from 'react'
import './CheckOutProduct.css'
import StarIcon from '@mui/icons-material/Star';
import {useStateValue} from '../../../Store/StateProvider'

function CheckOutProduct({id,rating, price, image, title, hideButton}) {

    const [{cart}, dispatch] = useStateValue()

    const removeFromCart = () =>{

    dispatch({
        type:'REMOVE_FROM_CART',
        id:id
    })


    }

    return (
        <div className="checkoutProduct">
        <img src={image} alt="checkout_product"></img>
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
                <small>KSH</small>
                <strong>{price}</strong>
            </p>
           <div className="checkoutProductRating">
            {Array(rating).fill().map((_, i)=>{
               return  <StarIcon key={i}></StarIcon>

            })}
           </div>
         {!hideButton &&  <button onClick={removeFromCart} className="checkoutProduct__button">Remove from cart</button>} 
        </div>
            
        </div>
    )
}

export default CheckOutProduct
