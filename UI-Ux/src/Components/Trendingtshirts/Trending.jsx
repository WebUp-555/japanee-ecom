import React, { useState, useRef } from "react";
import productsData from "../data/mock_tshirt_products.json";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingShirts = () => {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const filteredProducts = productsData.products.filter((shirt) =>
    shirt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#111112] text-white p-6">
      {/* Heading & Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Trending T-Shirts</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search T-Shirts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 pr-10 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        >
          <ChevronRight size={24} />
        </button>

        {/* Shirt Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-4 px-2 no-scrollbar scroll-smooth"
        >
          {filteredProducts.slice(0, 8).map((shirt, idx) => {
            const img = shirt.images?.[0]?.src;
            return (
              <Link to={`/product/${shirt.id}`} key={idx} className="no-underline">

              <div
                key={idx}
                className="min-w-[200px] bg-zinc-800 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                >
                <img
                  src={img}
                  alt={shirt.title}
                  className="w-full h-48 object-contain rounded-2xl mx-auto mb-2 hover:brightness-110 hover:drop-shadow-[0_0_8px_#ff0000]"
                  />
                <p className="text-sm font-medium mb-1">{shirt.title}</p>
                
                <div
                  className="text-xs text-gray-400"
                  dangerouslySetInnerHTML={{ __html: shirt.description }}
                  />
              </div>
                  </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingShirts;
