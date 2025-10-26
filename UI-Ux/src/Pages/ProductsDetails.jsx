import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../Components/data/mock_tshirt_products.json";
import { useCartStore } from "./cartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  // Fix: Ensure type match by converting id to number
  const product = productsData.products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Set variant once product is found
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Optional console logs for debugging
  console.log("URL param id:", id);
  console.log("Matched product:", product);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        ⚠ Product not found for ID: {id}
      </div>
    );
  }

  const image = product.images.find((img) => img.is_default);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      image: image?.src,
      price: selectedVariant?.price,
      quantity,
      size: selectedVariant?.title,
      color: selectedVariant?.color || "Default",
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={`/${image?.src}`}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded bg-white p-4"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div
            className="text-gray-300 mb-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="mb-4">
            <span className="font-semibold text-lg">Price: </span>
            <span className="text-green-400 font-bold text-xl">
              ₹{selectedVariant?.price}
            </span>
          </div>

          {/* Variant Selector */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Available Sizes & Colors:</h4>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant)}
                  className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                    selectedVariant?.id === variant.id
                      ? "bg-red-600 text-white border-red-400"
                      : "bg-zinc-800 border-zinc-700 text-white"
                  }`}
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Quantity:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-zinc-700 px-3 py-1 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-zinc-700 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded w-fit mt-4"
          >
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;