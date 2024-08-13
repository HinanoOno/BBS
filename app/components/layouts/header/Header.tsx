'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./../../../../components/ui/avator"; 
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./../../../../components/ui/hover-card";
import { Card, CardContent } from "./../../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { UserResponse } from "@supabase/supabase-js";

const Header = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const data  = await supabase.auth.getUser();
      setUser(data);
    };

    fetchUser();
  }, []);

  console.log(user);

  const handleLogout = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      console.log('User logged out');
      setUser(null); 
    }
  };


  return (
    <div className="flex justify-between divide-y border-gray-200 dark:border-gray-800 border-b">
      <div className="px-4 py-3 md:py-6 lg:px-6">
        <div className="flex items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter mr-4">
            Bulletin Board
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/about"
            >
              About
            </Link>
            <Link
              className="bg-black py-3 px-4 text-white rounded-md font-medium"
              href="/bbs-posts/create"
            >
              Create Post
            </Link>
          </nav>
        </div>
      </div>
      <div className="mr-6 flex items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Avatar>
            <AvatarImage src="/image.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-48 bg-white mr-4">
          <div className="text-sm">
            <Label>Username:</Label>
            <p>{user?.data?.user?.email}</p>
          </div>
          <Button onClick={handleLogout}>ログアウト</Button>
        </HoverCardContent>
      </HoverCard>
        
      </div>
    </div>
  );
};

export default Header;