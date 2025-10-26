import { useCartStore } from './cartStore';
import { useNavigate, Link } from "react-router-dom";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const addToCart = useCartStore((state) => state.addToCart);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = +(subtotal * 0.05).toFixed(2);
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + shipping + tax - discount;


  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">


      <h1 className="text-red-600 text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">No items in cart.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left: Cart Items */}
          <div className="flex-1 bg-zinc-900 p-6 rounded-lg overflow-y-auto max-h-[600px]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id + item.size + item.color}
                  className="bg-zinc-800 p-4 rounded-lg flex gap-4"
                >
                  <div className="w-36 h-36 bg-white border border-gray-200 overflow-hidden rounded-lg shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain scale-125"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-400">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-red-500 font-semibold mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-zinc-700 text-white px-2 rounded text-lg"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-zinc-700 text-white px-2 rounded text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-sm text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="flex-1 bg-zinc-900 p-6 rounded-lg h-full">
            <h3 className="text-xl font-semibold mb-4 text-white">Order Summary</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Shipping: ₹{shipping}</p>
              <p>Tax: ₹{tax}</p>
              <p>Discount: -₹{discount}</p>
              <hr className="my-2 border-gray-600" />
              <p className="text-lg text-white font-bold">Total: ₹{total}</p>
            </div>

            <Link to="/payment">
              <button className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold">
                Proceed to Checkout
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}
