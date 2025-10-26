import React, { useState } from "react";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (Object.values(formData).some((val) => val.trim() === "")) {
      alert("Please fill in all address fields.");
      return;
    }
    alert(`✅ Payment initiated with ${selectedMethod.toUpperCase()}`);
  };

  const methods = [
    { id: "gpay", name: "GPay", logo: "/gpay.png" },
    { id: "phonepe", name: "PhonePe", logo: "/phonepe.png" },
    { id: "paytm", name: "Paytm", logo: "/paytm.png" },
    { id: "upi", name: "Other UPI", logo: "/upi.png" },
    { id: "cod", name: "Cash on Delivery", logo: "/cod.png" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout Details</h2>

        {/* User Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400 col-span-1 md:col-span-2"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="bg-zinc-800 p-2 rounded text-white placeholder-gray-400"
          />
        </div>

        {/* Payment Method Selection */}
        <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>
        <div className="space-y-4">
          {methods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                selectedMethod === method.id
                  ? "border-red-500 bg-zinc-800"
                  : "border-zinc-700"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="mr-4"
              />
              <img
                src={method.logo}
                alt={method.name}
                className="w-10 h-10 mr-3 object-contain"
              />
              <span className="text-lg">{method.name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-bold transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
