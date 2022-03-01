export const initialState = {
  cart: [],
  user: null
};

//selector
export const getCartTatal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {

 console.log(state)


  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
      case "REMOVE_FROM_CART":
        const index = state.cart.findIndex(
          (cartItem) => cartItem.id === action.id
        );
        let newCart = [...state.cart];
  
        if (index >= 0) {
          newCart.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in cart!`
          )
        }
  
        return {
          ...state,
          cart:newCart
        }
        case 'EMPTY_CART':
          return{
            ...state, 
            cart:[]
          }

          case 'SET_USER' :

       
            return{
              ...state,
              user:action.user
            }


    default:
      return state;
  }
};
