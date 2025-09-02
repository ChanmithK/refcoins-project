"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Plus, Settings, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                EstateHub
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:scale-105"
            >
              Home
            </Link>
            <Button
              onClick={toggleAdminMode}
              variant={isAdminMode ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-200 hover:scale-105 ${
                isAdminMode
                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isAdminMode ? (
                <>
                  <User className="w-4 h-4 mr-2" />
                  User Mode
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Mode
                </>
              )}
            </Button>
            {isAdminMode && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
