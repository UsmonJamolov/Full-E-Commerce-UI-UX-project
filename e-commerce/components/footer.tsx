"use client";

import { Mail, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-4 border-t border-t-gray-800">
      <div className="max-w-6xl mx-auto w-full px-3 sm:px-4">
        {/* Top multi-columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-5 pb-10 border-b border-gray-800">
          
          {/* Exclusive */}
          <div>
            <div className="font-semibold text-lg mb-3">Exclusive</div>
            <div className="font-medium mb-2">Subscribe</div>
            <div className="text-xs mb-3 text-gray-300">Get 10% off your first order</div>
            <form className="flex items-center max-w-xs">
              <input
                type="email"
                aria-label="Your email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 placeholder:text-gray-400 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 p-2 rounded bg-gray-700 hover:bg-gray-600 transition"
                aria-label="Subscribe"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Support */}
          <div>
            <div className="font-semibold mb-3">Support</div>
            <div className="text-sm text-gray-300">
              111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.<br />
              <span className="block mt-2">exclusive@gmail.com</span>
              <span className="block mt-1">+88015-88888-9999</span>
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="font-semibold mb-3">Account</div>
            <ul className="flex flex-col gap-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-white transition">My Account</a></li>
              <li><a href="#" className="hover:text-white transition">Login / Register</a></li>
              <li><a href="#" className="hover:text-white transition">Cart</a></li>
              <li><a href="#" className="hover:text-white transition">Wishlist</a></li>
              <li><a href="#" className="hover:text-white transition">Shop</a></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <div className="font-semibold mb-3">Quick Link</div>
            <ul className="flex flex-col gap-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <div className="font-semibold mb-3">Download App</div>
            <div className="text-[11px] text-gray-400 mb-3">Save $3 with App New User Only</div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/images/qr.png" alt="qr" width={65} height={65} className="rounded" />
              <div className="flex flex-col gap-2">
                <Image src="/images/googleplay.png" alt="googleplay" width={90} height={28} />
                <Image src="/images/appstore.png" alt="appstore" width={90} height={28} />
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5 hover:text-pink-400 transition" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-blue-300 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-7 text-center text-gray-400 text-sm flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl"><Mail className="w-4 h-4 inline" /></span>
            Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </div>
    </footer>
  );
}