
const ContactUs = () => {
  return (
    <section className="bg-zinc-950 text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-6 font-family: 'Sawarabi Gohthic'">Contact Us</h2>
      <form className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition font-family: 'Sawarabi Gohthic'"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
