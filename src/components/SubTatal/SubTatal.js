import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { getCartTatal } from '../../Store/Reducer';
import { useStateValue } from '../../Store/StateProvider';
import './SubTatal.css'
import {useHistory} from 'react-router-dom'

function SubTatal() {

  const [{cart,user }, dispatch] = useStateValue()
  const history = useHistory()
  return (
    <div className="subtatal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            
              Subtotal ({cart?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTatal(cart)} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

<button  onClick={ e => 
  {user?history.push('/payment'):history.push('/login')}

}
>Proceed to Checkout</button> 
    </div>
  );
}

export default SubTatal
