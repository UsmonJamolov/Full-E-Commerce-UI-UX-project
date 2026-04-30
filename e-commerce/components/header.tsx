import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ChevronDown,
  Heart,
} from "lucide-react";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import UserBox from "./shared/user-box";
import HeaderSearchPanel from "./shared/header-search-panel";
import { getProducts } from "@/actions/user.action";

export default async function Header({ wishlistCount = 1 }) {
  const session = await getServerSession(authOptions)
  const productsRes = await getProducts({
    searchQuery: '',
    filter: 'newest',
    category: '',
    targetGroup: '',
    page: '1',
    pageSize: '40',
  })
  const searchItems = productsRes?.data?.products || []

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
      <div className="border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-3xl tracking-[0.2em]">
              Exclusive
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm">
              <Link href="/">Home</Link>
              <Link href="/contacts">Contacts</Link>
              <Link href="/about">About Us</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button asChild variant="ghost" size="icon">
                <Link href="/dashboard/watch-list">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </div>

            <HeaderSearchPanel items={searchItems} />

            {!session?.currentUser?._id && (
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            )}

            {session?.currentUser?._id && <UserBox user={session.currentUser} />}
          </div>
        </div>
      </div>
    </>
  );
}