import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { FaArrowRight } from "react-icons/fa";

function HomeImageSlider() {
    const allProducts = useSelector(state => state.products.allProducts);
    const [current, setCurrent] = useState(0)





    const images= allProducts?allProducts.flatMap(product=>(
       {
        url:product.images[2],
        alt:product.images[1],
        title:product.title,
        description:product.description,
        id:product._id
      }
    )) :[]

    const currImg=images[current]

    
 useEffect(()=>{
  if(current >= images.length) setCurrent(0)

 },[images.length, current])
    useEffect(()=>{
      if(images.length ===0) return 
      const timer= setInterval(()=>{
          setCurrent(prev=>( prev+1)% images.length)
      },3000)

      return ()=> clearInterval(timer)
    },[images.length])
    if(!images.length) return <div>Loading...</div>

 


    return (
        <div className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <img
                className="h-full w-full object-cover"
                src={currImg.url || currImg.alt}
                alt={currImg.title}
            />

            <div className="
                absolute 
                top-1/2 left-10 
                transform -translate-y-1/2
                max-w-xl flex flex-col gap-5
                bg-white/60 backdrop-blur-md
                p-8 rounded-2xl shadow-2xl
                text-gray-900
            ">
                <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow">{currImg.title}</h1>
                <p className="hidden md:block">{currImg.description}</p>
                <Link
                    to={`/product/${currImg._id || "/homepage"}`}
                    className="btn btn-primary flex items-center gap-2 max-w-max shadow-md"
                >
                    Shop now <FaArrowRight />
                </Link>
            </div>
        </div>
    );
}

export default HomeImageSlider;
