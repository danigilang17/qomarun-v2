'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, FileText, Settings, LogOut, Users } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const menuItems = [
    {
      href: '/admin/dashboard',
      icon: BarChart3,
      label: 'Dashboard',
      active: pathname === '/admin/dashboard'
    },
    {
      href: '/admin/reports',
      icon: FileText,
      label: 'Semua Laporan',
      active: pathname.startsWith('/admin/reports')
    },
    {
      href: '/admin/settings',
      icon: Settings,
      label: 'Pengaturan',
      active: pathname === '/admin/settings'
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {/* Replace Shield icon */}
          {/* <Shield className="h-8 w-8" /> */}
          <Image src="/images/logo-qomarun.png" alt="Qomarun Logo" width={32} height={32} />
          <div>
            <h1 className="text-xl font-bold qomarun-green">QOMARUN</h1>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'qomarun-bg-green text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 qomarun-green" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full text-gray-600 hover:text-red-600 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}