import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import { useStateContext } from '../context/stateContext'
import Cart from './Cart'
const Navbar = () => {
  const {showCart,setshowCart,totalQuantities}=useStateContext();
  var cartStatus;
  if(showCart) cartStatus=<Cart />

  return (
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">Welcome to shoppy</Link>
        </p>
        <button type="button" className="cart-icon" onClick={ ()=>setshowCart(true) }>
         <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
         {cartStatus} 
      </div>
  )
}

export default Navbar;