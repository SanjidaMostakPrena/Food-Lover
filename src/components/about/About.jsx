import { motion } from "framer-motion";
import { useEffect } from "react";

const About = () => {
   useEffect(() => {
      document.title = "About";
    }, []);
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
          About Us
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Local Food Lover was created for all food enthusiasts. Here you can read reviews of your favorite dishes, share your own reviews, 
          and discover new recipes or restaurants. Our goal is to make the culinary culture of Bangladesh enjoyable and accessible for everyone.
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <motion.div
          className="rounded-xl overflow-hidden shadow-2xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Our Story"
            className="w-full h-64 md:h-96 object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-yellow-400">Our Story</h2>
          <p className="text-gray-300 text-lg mb-4">
            Local Food Lover started in 2024 with the mission to increase interest and love for local food. 
            We want every review, recipe, and restaurant information to be easily accessible to all users.
          </p>
          <p className="text-gray-300 text-lg">
            Through our platform, you can share your opinions and learn from others’ experiences. 
            We believe great food creates joy, connections, and a strong community.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-yellow-400">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="bg-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Trust</h3>
            <p className="text-gray-300">
              We focus on verified information and genuine reviews only.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Community</h3>
            <p className="text-gray-300">
              Our platform brings all food lovers together to build a strong community.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Innovation</h3>
            <p className="text-gray-300">
              We are always updating with new recipes, food trends, and review features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-yellow-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join the Food Lover Community!
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sign up now and start sharing your food reviews.
        </motion.p>
        <motion.button
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
          whileHover={{ scale: 1.05 }}
        >
          Join Now
        </motion.button>
      </section>

    </div>
  );
};

export default About;
