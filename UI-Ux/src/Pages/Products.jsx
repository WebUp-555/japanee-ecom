import React from "react";
import productsData from "../Components/data/mock_tshirt_products.json";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

const Products = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-wrap justify-center gap-6 p-6">
      {productsData.products.map((product) => {
        const image = product.images.find((img) => img.is_default);
        const variant = product.variants.find((v) => v.is_enabled);
        const price = variant?.price;

        const originalPrice = Math.round(price * 1.6);
        const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

        const handleAdd = (e) => {
          e.stopPropagation(); // 🔥 prevent parent click (optional)
          addToCart({
            id: product.id,
            name: product.title,
            image: image?.src,
            price,
            quantity: 1,
            size: variant?.title,
            color: variant?.color || "Default",
          });
          navigate("/cart");
        };

        return (
         <div key={product.id} className="w-[220px] bg-zinc-800 text-black p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow hover:shadow-xl">
  
     {/* Wrap only the image and product info in Link */}
     <Link to={`/product/${product.id}`}>
     <img
      src={image?.src}
      alt={product.title}
      className="w-full h-48 object-contain rounded-md mb-3 hover:brightness-110 hover:drop-shadow-[0_0_8px_#ff0000]"
     />
     <div className="text-left">
      <h3 className="text-base font-semibold text-white mb-1">{product.title}</h3>
      <p
        className="text-sm text-gray-500 mb-2"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-white">₹{price}</span>
        <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
        <span className="text-sm text-red-500 font-medium">({discountPercent}% OFF)</span>
      </div>
     </div>
     </Link> {/* ✅ THIS was missing */}

     {/* Button placed outside the Link */}
     <button
     onClick={handleAdd}
     className="mt-3 bg-red-600 text-white hover:bg-red-500 font-bold py-1.5 px-3 rounded-md w-full transition duration-300"
     >
     Add to Cart
     </button>

  </div>
        );
      })}
    </div>
  );
};

export default Products;