import React, { useState } from "react";
import { Link } from "react-router";

const LocalFoodPage = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [email, setEmail] = useState("");

  const toggleFaq = (id) => {
    setFaqOpen(faqOpen === id ? null : id);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <div className="font-sans text-gray-800 bg-white">

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🥬", text: "Fresh Ingredients Straight From Local Farms" },
              { icon: "🧼", text: "Hygienic Cooking & Safe Handling" },
              { icon: "⚡", text: "Fast Local Delivery Within 45 Minutes" },
              { icon: "💰", text: "Affordable Prices For Everyone" },
              { icon: "🏠", text: "Authentic Homemade Taste in Every Bite" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-gray-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <p className="text-lg font-semibold text-center">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Our Services ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Online Food Ordering Made Simple",
              "Home Delivery Straight To Your Door",
              "Takeaway Options for Busy Schedules",
              "Event & Small Party Catering",
              "Corporate Lunch Service with Variety",
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-200">
                <p className="font-semibold text-lg">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= How It Works ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How Our Service Works</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            {[
              { step: "1", title: "Browse Our Menu" },
              { step: "2", title: "Place Your Order Online" },
              { step: "3", title: "We Cook Fresh With Love" },
              { step: "4", title: "Receive Fast Delivery" },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-2xl shadow flex-1 hover:shadow-lg transition border border-gray-200">
                <div className="text-3xl font-bold mb-2">{item.step}</div>
                <p className="font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ Section ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          {[
            { id: 1, q: "What is the typical delivery time?", a: "Delivery usually takes 30–45 minutes depending on location and order volume." },
            { id: 2, q: "Which payment methods are accepted?", a: "We accept Cash on Delivery, bKash, Nagad, Debit & Credit Cards, and online payments." },
            { id: 3, q: "Do you separate Veg and Non-Veg foods?", a: "Yes, we strictly maintain separate utensils, cooking areas, and storage for veg and non-veg items." },
            { id: 4, q: "What is your refund & cancellation policy?", a: "Orders can be cancelled within 5 minutes. Refunds are processed within 3–5 working days." },
          ].map((faq) => (
            <div key={faq.id} className="mb-4 border rounded-2xl overflow-hidden shadow hover:shadow-lg transition border-gray-200">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left px-6 py-4 bg-orange-500 text-white flex justify-between items-center font-medium hover:bg-orange-600 transition"
              >
                {faq.q}
                <span className="text-xl">{faqOpen === faq.id ? "−" : "+"}</span>
              </button>
              {faqOpen === faq.id && (
                <div className="p-6 bg-white text-gray-800">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= Newsletter ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated With Our Newsletter</h2>
          <p className="mb-6 text-gray-700">Subscribe to receive latest offers, discounts, and new menu alerts!</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-4 py-3 rounded-full flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= Final CTA ================= */}
      <section className="relative py-32 px-6 bg-white text-black text-center rounded-b-full overflow-hidden">
  {/* Optional decorative background */}
  <div className="absolute inset-0 -z-10">
    <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="url(#grad1)"
        fillOpacity="0.2"
        d="M0,64L80,85.3C160,107,320,149,480,144C640,139,800,85,960,85.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF4500" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
    Ready to Taste Local Delights?
  </h2>
  <p className="text-lg sm:text-xl mb-12 max-w-xl mx-auto leading-relaxed text-gray-700">
    Order now and enjoy <strong className="text-orange-500">fresh, authentic homemade meals</strong> delivered fast!
  </p>

  <div className="flex justify-center gap-6 flex-wrap">
    <Link
  to="/orderPage" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-600">
      Customer Review
    </Link>
   
<Link
  to="/contact"
  className="px-8 py-4 bg-white text-orange-500 font-bold rounded-full shadow-lg border border-orange-500 transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-100 inline-block text-center"
>
  Contact Us
</Link>

  </div>
</section>

    </div>
  );
};

export default LocalFoodPage;
