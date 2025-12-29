// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router';

// const RecentView = () => {
//     // const [recentProducts, setRecentProducts] = useState([]);
//     // console.log(recentProducts);
//     // useEffect(() => {
//     //     const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
        
//     // }, []);
//     // if (recentProducts.length === 0) return null;

//     return (
//         <div className="mt-12">
//             <h2 className="text-xl font-semibold mb-4">
//                 Recently Viewed
//             </h2>

//             <div className="flex gap-4 overflow-x-auto pb-2">
//                 {recentProducts.map(product => (
//                     <Link
//                         key={product._id}
//                         to={`/product/${product._id}`}
//                         className="min-w-40 border rounded-lg p-2 hover:shadow"
//                     >
//                         <img
//                             src={product.images}
//                             className="h-32 w-full object-cover rounded"
//                         />
//                         <p className="text-sm mt-2 line-clamp-2">
//                             {product.name}
//                         </p>
//                         <p className="font-semibold text-sm">
//                             TK {product.price}
//                         </p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecentView;