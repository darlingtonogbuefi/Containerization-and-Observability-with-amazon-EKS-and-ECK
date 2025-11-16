"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could send the data to an API or service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 mb-12 text-center">
          Have questions or want to get in touch? We're here to help! Fill out the form below or use the contact details.
        </p>

        <div className="mb-12 bg-white p-8 rounded-xl shadow-md border border-purple-600">
          <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Email:</strong> <a href="mailto:support@cribr.ai" className="text-red-600 hover:underline">cribrappcribr@gmail.com</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+1234567890" className="text-red-600 hover:underline">+1 (234) 567-890</a>
            </li>
            <li>
              <strong>Address:</strong> 123 AI Drive, Innovation City, CA 94000
            </li>
            <li>
              <strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM (PST)
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-purple-600">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg">
              Thank you for contacting us! We’ll get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
