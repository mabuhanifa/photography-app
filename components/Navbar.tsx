"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-accent">
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="/services"
              className="px-3 py-2 rounded-md hover:bg-accent"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md hover:bg-accent"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden transition-all duration-600 ease-in-out overflow-hidden",
          isOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/70 backdrop-blur-md">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/services"
            className="block px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
