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

const nav = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Sign Up", href: "/signup" },
];

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
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-xs">
          <p className="truncate">
            Summer Sale For All Swim Suits And Free Express Delivery — OFF 50%!{" "}
            <Link href="/sale" className="underline ml-2">
              ShopNow
            </Link>
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1">
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
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-2">
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
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-2">
                  {nav.map((i) => {
                    const active = pathname === i.href;
                    return (
                      <Link
                        key={i.href}
                        href={i.href}
                        className={cn(
                          "hover:underline",
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
            <Link href="/" className="font-bold text-lg">Exclusive</Link>
          </div>
          {/* Center: nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn(
                    "hover:underline",
                    active ? "font-bold text-primary" : ""
                  )}
                >
                  {i.label}
                </Link>
              );
            })}
          </nav>
          {/* Right: search + icons */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <div className="relative hidden sm:block">
              <Input
                className="h-9 w-64 bg-muted pr-9"
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
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
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
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Button>
            {/* User */}
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}