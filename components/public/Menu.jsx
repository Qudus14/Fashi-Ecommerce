"use client"

import { useState } from 'react'
import { Command, Folder, ChevronRight, ChevronsUpDown, BadgeCheck, CreditCard, Bell, Sparkles, LogOut, MenuIcon } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const data = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://placehold.co/60x60',
  },
  projects: [
    {
      name: 'Project 1',
      url: '/project1',
      icon: Folder,
    },
    {
      name: 'Project 2',
      url: '/project2',
      icon: Folder,
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Command,
      isActive: true,
      items: [
        { title: 'Overview', url: '/dashboard/overview' },
        { title: 'Analytics', url: '/dashboard/analytics' },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: ChevronsUpDown,
      isActive: false,
      items: [
        { title: 'Profile', url: '/settings/profile' },
        { title: 'Security', url: '/settings/security' },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Help',
      url: '/help',
      icon: Bell,
    },
    {
      title: 'About',
      url: '/about',
      icon: Sparkles,
    },
  ],
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Command className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">FASHI</h2>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ul className="space-y-1">
            {data.projects.map((project) => (
              <li key={project.name}>
                <a href={project.url} className="flex items-center py-1 text-sm text-gray-600 hover:text-customYellow">
                  <project.icon className="mr-2 h-4 w-4" />
                  <span>{project.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav>
          {data.navMain.map((item) => (
            <Collapsible key={item.title} defaultOpen={item.isActive}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
                <div className="flex items-center">
                  <item.icon className="mr-1 h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className="ml-1 h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="ml-0 space-y-0">
                  {item.items?.map((subItem) => (
                    <li key={subItem.title}>
                      <a href={subItem.url} className="block py-1 text-sm text-gray-600 hover:text-customYellow">
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>

        <div className="mt-auto pt-2">
          <ul className="space-y-1">
            {data.navSecondary.map((item) => (
              <li key={item.title}>
                <a href={item.url} className="flex items-center py-1 text-sm text-gray-600 hover:text-customYellow">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center w-full">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2 text-left">
                <p className="text-sm font-medium">{data.user.name}</p>
                <p className="text-xs font-medium text-gray-500">{data.user.email}</p>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" /> Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" /> Upgrade to Pro
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Main Content */}
      <div className={`flex-1 p-4 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <button onClick={toggleSidebar} className="bg-customYellow flex text-white px-3 py-2 rounded lg:hidden">
          <MenuIcon className="mr-2" />
        </button>
      </div>
    </div>
  )
}

export default Menu