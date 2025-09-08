"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, ChevronRight } from "lucide-react"
import ThemeToggle from "@/components/global/ThemeToggle"
import Image from "next/image"

interface AppHeaderProps {
  showBrand?: boolean
  searchPlaceholder?: string
  userName?: string
  userInitials?: string
}

export default function AppHeader({ 
  showBrand = true,
  searchPlaceholder = "Search projects, tasks, teams...",
  userName = "You",
  userInitials = "YU"
}: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-3 border-b px-4 md:px-6 bg-card/60 backdrop-blur-sm">
      <SidebarTrigger />
      
      {showBrand && (
        <div className="hidden md:flex items-center gap-2">
          <Image src="/assets/main_logo.png" alt="CMPTasks" width={24} height={24} className="rounded" />
          <span className="text-sm font-semibold">CMPTasks</span>
        </div>
      )}
      
      <div className="flex-1" />
      
      <div className="relative w-full max-w-md">
        <Input 
          placeholder={searchPlaceholder}
          className="pl-9 h-9 rounded-md" 
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>
      
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <ThemeToggle />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="pl-1 pr-2">
            <Avatar className="size-7">
              <AvatarImage alt="User" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="ml-2 hidden sm:inline">{userName}</span>
            <ChevronRight className="ml-1 size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Notifications</DropdownMenuItem>
          <DropdownMenuItem>Preferences</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
