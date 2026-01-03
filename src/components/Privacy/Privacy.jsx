import { motion } from "framer-motion";
import { useEffect } from "react";

const Privacy = () => {
     useEffect(() => {
        document.title = "privacy";
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
                    Privacy Policy
                </motion.h1>
                <motion.p
                    className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Your privacy is important to us. This page explains how we collect, use, and protect your data on the Food Lover platform.
                </motion.p>
            </section>

            {/* Sections */}
            <section className="space-y-12">

                {/* Data Collection */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-700 rounded-xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Data Collection</h2>
                    <p className="text-gray-300 text-lg">
                        We collect personal data such as your name, email, and reviews when you register or interact with our platform.
                        This information helps us provide a personalized and safe experience.
                    </p>
                </motion.div>

                {/* Data Usage */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-700 rounded-xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-semibold text-yellow-400 mb-4">How We Use Your Data</h2>
                    <p className="text-gray-300 text-lg">
                        Your data is used to improve user experience, manage reviews, send updates, and communicate with you.
                        We never sell your personal information to third parties.
                    </p>
                </motion.div>

                {/* User Rights */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-700 rounded-xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Your Rights</h2>
                    <p className="text-gray-300 text-lg mb-2">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Access your personal information stored on our platform</li>
                        <li>Request corrections or updates to your data</li>
                        <li>Request deletion of your account or personal information</li>
                        <li>Opt-out of marketing communications</li>
                    </ul>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-700 rounded-xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Security Measures</h2>
                    <p className="text-gray-300 text-lg">
                        We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration.
                        All sensitive data is encrypted and stored securely.
                    </p>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-gray-300 text-lg mb-4">
                        If you have any questions regarding this privacy policy, feel free to contact us.
                    </p>
                    <p className="text-yellow-400 font-semibold">
                        Email: contact@foodlover.com | Phone: +880 1234 567890
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default Privacy;
