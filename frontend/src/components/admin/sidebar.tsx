"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Plus,
  ArrowLeft,
  Home,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    name: "Add Property",
    href: "/admin/properties/new",
    icon: Plus,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-72 bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-center h-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white text-xl font-bold">EstateHub</div>
            <div className="text-white/80 text-sm">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700"
                )}
              />
              <span className="ml-3">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center px-4 py-4 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hover:scale-105 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
          <span className="ml-3">Back to Website</span>
        </Link>

        {/* Admin Info */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Admin User
              </div>
              <div className="text-xs text-gray-600">System Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
