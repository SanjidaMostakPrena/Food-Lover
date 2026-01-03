import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
 useEffect(() => {
    document.title = "contact";
  }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation: all fields required
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }
    setSubmitted(true);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 md:px-16 py-12">

      {/* Hero Section */}
      <section className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Have questions, suggestions, or want to share your food experiences? Reach out to us!
        </motion.p>
      </section>

      {/* Contact Info + Map */}
      <section className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold mb-4 text-yellow-400">Get in Touch</h2>
          <p className="text-gray-300 text-lg">
            We love hearing from fellow food lovers! You can reach us via:
          </p>
          <div className="space-y-3">
            <p><strong>Phone:</strong> +880986999990</p>
            <p><strong>Email:</strong> contact@YUMYARD.com</p>
            <p><strong>Address:</strong> 34 Awal Centre, Banani, Dhaka, Bangladesh</p>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.906694558972!2d90.39945291543004!3d23.794457684561187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a2f8b7e31b%3A0xa6a9f0d7c93b2c56!2sAwal%20Centre%2C%20Banani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            className="h-64 md:h-96 w-full"
            allowFullScreen=""
            loading="lazy"
            title="Food Lover Location"
          ></iframe>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold text-yellow-400 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Send a Message
        </motion.h2>

        {submitted && (
          <motion.p
            className="text-green-400 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your message has been sent successfully!
          </motion.p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-8 rounded-xl shadow-lg space-y-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-600"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-600"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-600"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-600"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
