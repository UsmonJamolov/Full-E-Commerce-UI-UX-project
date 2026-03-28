"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

type HeaderProps = {
  cartCount?: number;
  wishlistCount?: number;
};

export default function Header({
  cartCount = 2,
  wishlistCount = 1,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-2 sm:px-4 text-[11px] sm:text-xs">
          <p className="truncate">
            Summer Sale For All Swim Suits And Free Express Delivery — OFF 50%!{" "}
            <Link href="/sale" className="underline ml-2">
              ShopNow
            </Link>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-xs sm:text-sm">
              English <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>O‘zbek</DropdownMenuItem>
              <DropdownMenuItem>Русский</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-2 sm:px-4">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile menu toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              {/* Mobile Menu Drawer */}
              <SheetContent side="left" className="w-[85vw] max-w-xs p-0 pt-2">
                <SheetHeader>
                  <SheetTitle className="px-4 pb-3">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 px-4">
                  {nav.map((i) => {
                    const active = pathname === i.href;
                    return (
                      <Link
                        key={i.href}
                        href={i.href}
                        className={cn(
                          "py-2 hover:underline",
                          active ? "font-bold text-primary" : ""
                        )}
                      >
                        {i.label}
                      </Link>
                    );
                  })}
                  {/* Mobile search */}
                  <div className="mt-2">
                    <div className="relative">
                      <Input className="h-9 pr-9" placeholder="Search..." />
                      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="font-bold text-lg sm:text-xl">Exclusive</Link>
          </div>

          {/* Center: nav (desktop only) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-[13px] lg:text-sm">
            {nav.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn(
                    "hover:underline py-1",
                    active ? "font-bold text-primary" : ""
                  )}
                >
                  {i.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: search + icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop search */}
            <div className="relative hidden sm:block">
              <Input
                className="h-9 w-36 sm:w-48 md:w-64 bg-muted pr-9 text-xs md:text-sm"
                placeholder="What are you looking for?"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full px-1 text-[9px]">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full px-1 text-[9px]">
                  {cartCount}
                </Badge>
              )}
            </Button>
            {/* User */}
            <Button variant="ghost" size="icon" aria-label="Account">
              <Link href={'/sign-in'}>
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}