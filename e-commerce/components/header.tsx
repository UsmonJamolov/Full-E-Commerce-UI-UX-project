import Link from "next/link";
// import { usePathname } from "next/navigation";
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
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import UserBox from "./shared/user-box";

export default async function Header({ cartCount = 2, wishlistCount = 1 }) {
  const session = await getServerSession(authOptions)

  console.log("HEADER SESSION:", session);
  

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
                  "font-bold text-primary"
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
            {session?.currentUser?._id && <UserBox user={session.currentUser} />}
            {!session?.currentUser?._id && (
              <Button asChild size={'icon'}>
                <Link href={'/sign-in'}>
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