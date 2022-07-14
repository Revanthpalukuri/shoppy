import {React,useContext,createContext,useState,useEffect} from "react";

import toast from 'react-hot-toast'; //gives popup notfication when we add item into cart

const Context=createContext();

export const StateContext= ({children})=>{
    const [showCart, setshowCart] = useState(0);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);
    //some variables
    let foundProduct;
    let index;
    //deleting items from cart
    const onDelete=(product)=>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        settotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setcartItems(newCartItems);
    }
    // adding items from cart
    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find((item)=> item._id===product._id);
        // set total price and quantity
        settotalPrice((prevtotalPrice)=> prevtotalPrice+quantity*product.price);
        settotalQuantities((prevtotalQuantities)=> prevtotalQuantities+quantity);

        if(checkProductInCart)
        {
            const updatedCartItems=cartItems.map((cartProduct)=>{
                if(cartProduct._id===product._id) 
                {
                    return{
                        ...cartProduct,
                        quantity: cartProduct.quantity+quantity
                    }
                }
            })
            setcartItems(updatedCartItems);
        }
        else
        {
            product.quantity = quantity;
            setcartItems([...cartItems,{...product}]);
        }

        //succes after adding using react-hot-toast
        toast(`${qty} ${product.name} added to the cart.`);
    }
    // cart lo items ni inc or dec cheyyadanikii
    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setcartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setcartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }
    //quantity increase and decrease
    const incQty = () => {
        setqty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setqty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
          return prevQty - 1;
        });
      }
    return(
        <Context.Provider value={
            {
                showCart,
                setshowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onDelete,
                toggleCartItemQuanitity,
                settotalPrice,
                setcartItems,
                settotalQuantities
            }
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);