import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { customerRoutes } from "@/routes/customerRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"
import { Route } from "@/types/routes.type"


export function AppSidebar({user, ...props }: {user : {role: string} & React.ComponentProps<typeof Sidebar>}) {
  
  let routes: Route[] = [];
  switch (user.role) {
    case 'admin':
      routes = adminRoutes;
      break;
    case 'customer':
      routes = customerRoutes;
      break;
    case 'seller':
      routes = sellerRoutes
      break;
  
    default:
      routes = [];
      break;
  }

  // routes.forEach(item => console.log(item.items));

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
