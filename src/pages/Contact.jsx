import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaRegEnvelopeOpen,
  FaPhone,
  FaTag,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message cannot be empty";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="bg-background-light min-h-screen pb-16">
      {/* Main Details and Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h2 className="font-display font-bold text-2xl text-primary mb-6">
                Get in Touch
              </h2>

              {/* Address card */}
              <div className="bg-white p-6 rounded-lg border border-gray-150 flex items-start space-x-4 shadow-sm hover:border-accent/40 transition-colors">
                <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent text-lg shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-800 text-sm sm:text-base">
                    Head Office
                  </h3>
                  <p className="font-sans text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    111, Nayapaltan 3rd Floor, Dhaka-1000, Bangladesh
                  </p>
                </div>
              </div>

              {/* Phones card */}
              <div className="bg-white p-6 rounded-lg border border-gray-150 flex items-start space-x-4 shadow-sm hover:border-accent/40 transition-colors">
                <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent text-lg shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-800 text-sm sm:text-base">
                    Direct Contact
                  </h3>
                  <div className="font-sans text-gray-500 text-xs sm:text-sm mt-2 space-y-1">
                    <p className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-600">Tel:</span>
                      <span>+880 1988 887744</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-600">Mob:</span>
                      <span>+880 1898 213233</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Emails card */}
              <div className="bg-white p-6 rounded-lg border border-gray-150 flex items-start space-x-4 shadow-sm hover:border-accent/40 transition-colors">
                <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent text-lg shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-800 text-sm sm:text-base">
                    Electronic Inquiries
                  </h3>
                  <div className="font-sans text-gray-500 text-xs sm:text-sm mt-2 space-y-2">
                    <p className="flex flex-col">
                      <span className="font-semibold text-gray-600 text-[10px] uppercase">
                        General Desk
                      </span>
                      <a
                        href="mailto:info@maanengineeringltd.com"
                        className="hover:text-accent font-mono"
                      >
                        info@maanengineeringltd.com
                      </a>
                    </p>
                    <p className="flex flex-col">
                      <span className="font-semibold text-gray-600 text-[10px] uppercase">
                        Sales & Benders
                      </span>
                      <a
                        href="mailto:sales@maanengineeringltd.com"
                        className="hover:text-accent font-mono"
                      >
                        sales@maanengineeringltd.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-gray-150 shadow-sm text-left">
              <h2 className="font-display font-bold text-2xl text-primary mb-2">
                Send a Message
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mb-8">
                Complete the form below and our response department will follow
                up within 24 hours.
              </p>

              {/* Success Notification */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-3 mb-6"
                  >
                    <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />
                    <div>
                      <p className="text-sm font-bold">
                        Thank you for your message!
                      </p>
                      <p className="text-xs">
                        Your inquiry has been successfully sent to Maan
                        Engineering Ltd.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                      <FaUser className="text-[10px]" />{" "}
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`px-4 py-3 rounded border text-sm focus:outline-none transition-colors ${
                        formErrors.name
                          ? "border-red-400 focus:border-red-400"
                          : "border-gray-300 focus:border-accent"
                      }`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <span className="text-red-500 text-[10px] mt-1 font-semibold">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                      <FaBuilding className="text-[10px]" />{" "}
                      <span>Company Name</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-accent text-sm transition-colors"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                      <FaRegEnvelopeOpen className="text-[10px]" />{" "}
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`px-4 py-3 rounded border text-sm focus:outline-none transition-colors ${
                        formErrors.email
                          ? "border-red-400 focus:border-red-400"
                          : "border-gray-300 focus:border-accent"
                      }`}
                      placeholder="client@example.com"
                    />
                    {formErrors.email && (
                      <span className="text-red-500 text-[10px] mt-1 font-semibold">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                      <FaPhone className="text-[10px]" />{" "}
                      <span>Phone / Mobile</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-accent text-sm transition-colors"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                    <FaTag className="text-[10px]" /> <span>Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`px-4 py-3 rounded border text-sm focus:outline-none transition-colors ${
                      formErrors.subject
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-300 focus:border-accent"
                    }`}
                    placeholder="e.g. Quotation for Busbar System"
                  />
                  {formErrors.subject && (
                    <span className="text-red-500 text-[10px] mt-1 font-semibold">
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`px-4 py-3 rounded border text-sm focus:outline-none transition-colors resize-none ${
                      formErrors.message
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-300 focus:border-accent"
                    }`}
                    placeholder="Explain your electrical requirements..."
                  />
                  {formErrors.message && (
                    <span className="text-red-500 text-[10px] mt-1 font-semibold">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-secondary-accent text-white font-sans font-bold text-sm tracking-wider uppercase rounded shadow hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:bg-orange-400"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-lg" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="h-[450px] w-full border-t border-gray-150">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.8858277591316!2d90.41175857531788!3d23.734996968102255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85f1a5ae7dd%3A0x633144f46651206a!2sMaan%20Engineering%20Ltd!5e1!3m2!1sen!2sbd!4v1782236053269!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Maan Engineering Ltd. Head Office location map"
        ></iframe>
      </section>
    </div>
  );
}
