import React from "react";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-500" size={30} />
            <h2 className="text-2xl font-bold text-white">
              SmartLibrary
            </h2>
          </div>

          <p className="text-gray-400 leading-7">
            A modern digital library platform that helps students,
            teachers, and readers discover, borrow, and manage books
            effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/books" className="hover:text-blue-400 transition">
                Books
              </a>
            </li>

            <li>
              <a href="/categories" className="hover:text-blue-400 transition">
                Categories
              </a>
            </li>

            <li>
              <a href="/authors" className="hover:text-blue-400 transition">
                Authors
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Library Services
          </h3>

          <ul className="space-y-3">
            <li>📚 Book Borrowing</li>
            <li>📖 Digital Library</li>
            <li>⭐ New Arrivals</li>
            <li>👨‍💻 Online Membership</li>
            <li>🔔 Book Reservation</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <MapPin className="text-blue-500 mt-1" size={18} />
              <p>New Delhi, India</p>
            </div>

            <div className="flex gap-3">
              <Phone className="text-blue-500" size={18} />
              <p>+91 9354136934 / 8755306869</p>
            </div>

            <div className="flex gap-3">
              <Mail className="text-blue-500" size={18} />
              <p>support@smartlibrary.com</p>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">

            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <BookOpen size={18} />
            </a>

            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-sky-500 transition"
            >
              <BookOpen size={18} />
            </a>

            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 transition"
            >
              <BookOpen size={18} />
            </a>

            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-blue-700 transition"
            >
              <BookOpen size={18} />
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SmartLibrary. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-blue-400">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-blue-400">
              Help Center
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;