import React, {useState, useEffect} from "react";
import CurrencyFormat from 'react-currency-format';

import { useStateValue } from "../../Store/StateProvider";
import CheckOutProduct from '../../components/products/CheckOutProduct/CheckOutProduct'
import {Link, useHistory } from 'react-router-dom'
import "./Payment.css";
import {useElements, CardElement, useStripe} from '@stripe/react-stripe-js' 
import {getCartTatal} from '../../Store/Reducer'
import axios from '../../axios'
import {db} from '../../firbase'
import unirest from 'unirest'

function Payment() {
  const [{ user, cart }, dispatch] = useStateValue();
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)
  
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(null)
  const [tatalMpesa, setTatalMpesa] = useState(null)
  
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            // Stripe expects the total in a currencies subunits
            url: `/payments/create?total=${getCartTatal(cart) * 100}`
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
}, [cart])

useEffect(()=>{

  setTatalMpesa(getCartTatal(cart))

}, [cart])
 
  console.log("the secret is>>>>",clientSecret)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {
       

        db
          .collection('users') 
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
              cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created
          })

        setSucceeded(true);
        setError(null)
        setProcessing(false)

        dispatch({
            type: 'EMPTY_CART'
        })

        history.replace('/orders')
    })

}

  const handleChange = e =>{
      setDisabled(e.empty)
      setError(e.error?e.error.message:"")


  }


  return (
    <div className="payment">
      <div className="payment__container">
      <h1>Checkout (<Link to='checkout'>{cart?.length} items</Link>)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>kitisuru Lane</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>

        <div className="payment__section">
     
        <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
          {cart?.map((item)=>
            <CheckOutProduct
          
          id={item.id}
          price={item.price}
          rating={item.rating}
          title={item.title}
          image={item.image}


        />
          )}

          </div>

        </div>


        </div>
        <div className="payment__section">
            <div className="payment__title">
                <h3>Payment Method</h3>
                <div  className="header__search">
       
      </div>
            </div>
            <div className="payment__details">
            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getCartTatal(cart)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"KSH"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                {error && <div>{error}</div>}
                            </form>
                     


            </div>
        </div>
    
      </div>
  
  );
}

export default Payment;
