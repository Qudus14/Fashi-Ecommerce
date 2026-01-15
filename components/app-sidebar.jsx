"use client";

import * as React from "react";
import { Command, Home, Package, ShoppingCartIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { CategorySelectorComponent } from "./ui/category-selector";
import { Business, Storefront } from "@mui/icons-material";
import Image from "next/image";
import logo from "@/public/img/logo.png";

const data = {
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "About",
      url: "/about",
      icon: Storefront,
    },
    {
      name: "Contact",
      url: "/contacts",
      icon: Business,
    },
    {
      name: "Basket",
      url: "/basket",
      icon: ShoppingCartIcon,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: Package,
    },
  ],
};

export function AppSidebar() {
  const { user } = useUser();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      // {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="justify-self-start bg-gray-50">
                <Image
                  src={logo}
                  alt="logo"
                  className="h-14 w-14 object-contain"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
          <ul className="space-y-1">
            {data.projects.map((project) => (
              <li key={project.name}>
                <a
                  href={project.url}
                  className="flex items-center py-2 text-sm text-gray-600 hover:bg-customYellow rounded p-2 transition"
                >
                  <project.icon className="mr-2 h-6 w-6" />
                  <span className="text-base font-semibold">
                    {project.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="justify-self-start mt-1.5">
            <CategorySelectorComponent />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="mt-6 pt-6 border-t-2 border-gray-200" />
        <Link
          href="/contact"
          className="text-gray-800 hover:text-gray-600 py-2"
        >
          <ClerkLoaded>
            {user && <link href="/"></link>}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton width={200} height={200} />
                <div className="text-xs text-customYellow font-bold">
                  {user.fullName}
                </div>
              </div>
            ) : (
              <SignInButton
                className="bg-customYellow text-white p-2 rounded font-bold text-lg"
                mode="modal"
              />
            )}
          </ClerkLoaded>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
