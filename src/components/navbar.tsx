'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 qomarun-bg-green rounded-lg flex items-center justify-center">
               <Image src="/images/logo-qomarun.png" alt="Qomarun Logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold qomarun-green">Qomarun</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/report" 
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Buat Laporan
            </Link>
            <Link 
              href="/status" 
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Cek Status
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Tentang
            </Link>
            <Link 
              href="/admin/login" 
              className="text-gray-500 hover:text-green-700 font-medium transition-colors text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/report" 
                className="text-gray-700 hover:text-green-700 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Buat Laporan
              </Link>
              <Link 
                href="/status" 
                className="text-gray-700 hover:text-green-700 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Cek Status
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-700 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                href="/admin/login" 
                className="text-gray-500 hover:text-green-700 font-medium transition-colors px-2 py-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}