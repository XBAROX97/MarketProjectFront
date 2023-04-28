import React from 'react'; 
 import { GoArrowSmallLeft, GoArrowSmallRight } from 'react-icons/go'; 
 const Paginate = ({ 
   postsPerPage, 
   totalPosts, 
   paginate, 
   previousPage, 
   nextPage 
 }) => { 
   const pageNumbers = []; 
  
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) { 
     pageNumbers.push(i); 
   } 
  
   return ( 
     <div className="flex justify-center max-w-[600px] mx-auto my-2"> 
       <ul className="flex gap-2"> 
         <li 
           onClick={previousPage} 
           className="border py-1 cursor-pointer px-2 bg-secondary rounded text-white hover:bg-primary duration-500" 
         > 
           <GoArrowSmallLeft size={20} /> 
         </li> 
         {pageNumbers.map((number) => ( 
           <li 
             key={number} 
             onClick={() => paginate(number)} 
             className="border py-1 cursor-pointer px-2 bg-secondary rounded text-white hover:bg-primary duration-500" 
           > 
             {number} 
           </li> 
         ))} 
         <li 
           onClick={nextPage} 
           className="border py-1 cursor-pointer px-2 bg-secondary rounded text-white hover:bg-primary duration-500" 
         > 
           <GoArrowSmallRight size={20} /> 
         </li> 
       </ul> 
     </div> 
   ); 
 }; 
  
 export default Paginate;