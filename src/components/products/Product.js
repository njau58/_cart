import React from "react";
import "./Product.css";
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from "../../Store/StateProvider";

function Product({id, title, image, rating, price}) {

  const [{cart}, dispatch ] = useStateValue()

  const addToCart = () => {
   
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <>
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>KSH</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="product__ratingIcon"/>
            ))}
           
          </div>
        </div>
        <img
          alt="dummy_image"
          src={image}
        ></img>

        <button onClick={addToCart} >Add To Cart</button>
      </div>
    </>
  );
}

export default Product;
