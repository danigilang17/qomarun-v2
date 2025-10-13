'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Eye
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsLoading(false)
  }, [router])

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Laporan Masuk',
      value: '124',
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Laporan Baru',
      value: '8',
      icon: AlertCircle,
      color: 'bg-red-500',
      change: '+3'
    },
    {
      title: 'Sedang Diproses',
      value: '15',
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-2'
    },
    {
      title: 'Telah Selesai',
      value: '101',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+9%'
    }
  ]

  const categoryData = [
    { category: 'Kekerasan Fisik', count: 35, percentage: 28 },
    { category: 'Kekerasan Verbal/Psikologis', count: 42, percentage: 34 },
    { category: 'Kekerasan Seksual', count: 18, percentage: 15 },
    { category: 'Bullying/Perundungan', count: 29, percentage: 23 }
  ]

  const recentReports = [
    {
      id: 'QMR-20241201',
      victimName: 'Ahmad S.',
      category: 'Kekerasan Fisik',
      date: '2024-12-01',
      status: 'baru'
    },
    {
      id: 'QMR-20241130',
      victimName: 'Siti R.',
      category: 'Bullying/Perundungan',
      date: '2024-11-30',
      status: 'diproses'
    },
    {
      id: 'QMR-20241129',
      victimName: 'Muhammad F.',
      category: 'Kekerasan Verbal/Psikologis',
      date: '2024-11-29',
      status: 'selesai'
    },
    {
      id: 'QMR-20241128',
      victimName: 'Fatimah A.',
      category: 'Kekerasan Seksual',
      date: '2024-11-28',
      status: 'diproses'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'baru':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Baru</Badge>
      case 'diproses':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Diproses</Badge>
      case 'selesai':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Selesai</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Akumulasi Pelaporan</h1>
              <p className="text-gray-600 mt-1">Ringkasan data pelaporan kekerasan</p>
            </div>
            <div className="text-sm text-gray-500">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Laporan Berdasarkan Kategori</CardTitle>
                <CardDescription>
                  Distribusi jenis kekerasan yang dilaporkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{item.category}</span>
                        <span className="text-gray-600">{item.count} laporan</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="qomarun-bg-green h-3 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports Table */}
            <Card>
              <CardHeader>
                <CardTitle>Laporan Terbaru</CardTitle>
                <CardDescription>
                  Daftar laporan yang baru masuk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-gray-900">{report.id}</span>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Korban: {report.victimName}</p>
                        <p className="text-sm text-gray-500">{report.category} • {report.date}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="qomarun-border-green qomarun-green hover:bg-green-50"
                        onClick={() => router.push(`/admin/reports/${report.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin/reports')}
                    className="qomarun-border-green qomarun-green hover:bg-green-50"
                  >
                    Lihat Semua Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>
                Tindakan yang sering dilakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="qomarun-bg-green hover:bg-green-700 text-white h-12"
                  onClick={() => router.push('/admin/reports?status=baru')}
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Laporan Baru (8)
                </Button>
                <Button
                  variant="outline"
                  className="qomarun-border-green qomarun-green hover:bg-green-50 h-12"
                  onClick={() => router.push('/admin/reports?status=diproses')}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Sedang Diproses (15)
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                  onClick={() => router.push('/admin/settings')}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Buat Laporan Manual
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}