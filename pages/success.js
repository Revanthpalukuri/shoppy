import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import confetti from '../lib/canvaConfetti';
import { useStateContext } from '../context/stateContext';

const success = () => {
    const {setcartItems,settotalQuantities,settotalPrice} =useStateContext();
    // const [Order, setOrder] = useState(null);
    useEffect(()=>{
        setcartItems([]);
        settotalPrice(0);
        settotalQuantities(0);
        confetti();
    },[])
  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <AiFillHeart />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="description">If you have any questions contact us from<a href="mailto:revanthpalukuri@gmail.com" className='email'>here</a> </p>
            <Link href='/'>
                <button width="300px" className='btn' type='button'>
                    Continue Shopping  
                </button>
            </Link>
        </div>
    </div>
  )
}

export default success;