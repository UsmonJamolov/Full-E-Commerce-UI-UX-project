"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { nav } from "@/components/constants";
import { getCurrentUser } from "@/actions/auth.action";
// import { getServerSession } from 'next-auth'
import { useSession } from "next-auth/react";
import { authOptions } from '@/lib/auth-options'
import UserBox from "./shared/user-box";

export default function Header({ cartCount = 2, wishlistCount = 1 }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  // ✅ USERNI BACKENDDAN OLISH
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log('user kelishi kerak', res);
        
        setUser(res?.user || null);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.reload();
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-xs">
          <p>
            Summer Sale — OFF 50%!{" "}
            <Link href="/sale" className="underline ml-2">
              ShopNow
            </Link>
          </p>

          <div className="flex items-center gap-1 cursor-pointer">
            English <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="font-bold text-xl">
              Exclusive
            </Link>
          </div>

          {/* CENTER */}
          <nav className="hidden md:flex gap-6">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={cn(
                  "hover:underline",
                  pathname === i.href && "font-bold text-primary"
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div className="relative hidden sm:block">
              <Input className="h-9 w-56 pr-9" placeholder="Search..." />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>

            {/* WISHLIST */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* CART */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* 🔥 USER BLOCK */}
            {/* {user ? (
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
            
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border rounded-xl shadow-lg p-2 z-50 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-200">
                                
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    Profile
                  </Link>
            
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    Dashboard
                  </Link>
            
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-red-100 text-red-500 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/sign-in">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )} */}
            {session?.currentUser?._id ? (
              <UserBox user={session.currentUser} />
            ) : (
              <Button asChild size="icon">
                <Link href="/sign-in">
                  <User />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}