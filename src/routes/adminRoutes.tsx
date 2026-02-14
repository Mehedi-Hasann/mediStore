// navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Admin Dashboard",
//           url: "admin-dashboard",
//         },
//         {
//           title: "Customer Dashboard",
//           url: "customer-dashboard",
//         },
//         {
//           title: "Seller Dashboard",
//           url: "seller-dashboard",
//         }
//       ],
//     },
//   ]

import { Route } from "@/types/routes.type";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Admin Dashboard",
        url: "admin-dashboard",
      },
    ],
  },
]
