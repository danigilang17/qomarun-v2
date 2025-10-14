'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
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
  Eye,
  Users,
  Calendar,
  BarChart3,
  AlertTriangle
} from 'lucide-react'
import { Database } from '@/types/supabase'

type Report = Database['public']['Tables']['reports']['Row']

interface DashboardStats {
  totalReports: number
  newReports: number
  inProgressReports: number
  completedReports: number
  anonymousReports: number
  highPriorityReports: number
}

interface CategoryData {
  category: string
  count: number
  percentage: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    newReports: 0,
    inProgressReports: 0,
    completedReports: 0,
    anonymousReports: 0,
    highPriorityReports: 0
  })
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [recentReports, setRecentReports] = useState<Report[]>([])
  const [monthlyTrend, setMonthlyTrend] = useState<{ month: string; count: number }[]>([])
  
  const supabase = createClient()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch all reports
      const { data: reports, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reports:', error)
        return
      }

      if (!reports) return

      // Calculate statistics
      const totalReports = reports.length
      const newReports = reports.filter(r => r.status === 'baru').length
      const inProgressReports = reports.filter(r => r.status === 'diproses').length
      const completedReports = reports.filter(r => r.status === 'selesai').length
      const anonymousReports = reports.filter(r => r.is_anonymous).length
      const highPriorityReports = reports.filter(r => r.priority === 'tinggi' || r.priority === 'darurat').length

      setStats({
        totalReports,
        newReports,
        inProgressReports,
        completedReports,
        anonymousReports,
        highPriorityReports
      })

      // Calculate category distribution
      const categoryCount: { [key: string]: number } = {}
      reports.forEach(report => {
        categoryCount[report.violence_type] = (categoryCount[report.violence_type] || 0) + 1
      })

      const categoryArray = Object.entries(categoryCount).map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / totalReports) * 100)
      })).sort((a, b) => b.count - a.count)

      setCategoryData(categoryArray)

      // Get recent reports (last 5)
      setRecentReports(reports.slice(0, 5))

      // Calculate monthly trend (last 6 months)
      const monthlyCount: { [key: string]: number } = {}
      const months = ['Nov 2024', 'Oct 2024', 'Sep 2024', 'Aug 2024', 'Jul 2024', 'Jun 2024']
      
      reports.forEach(report => {
        if (report.created_at) {
          const date = new Date(report.created_at)
          const monthYear = date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
          monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1
        }
      })

      const trendData = months.map(month => ({
        month,
        count: monthlyCount[month] || 0
      }))

      setMonthlyTrend(trendData)
      setIsLoading(false)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'baru':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Baru</Badge>
      case 'diproses':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Diproses</Badge>
      case 'selesai':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Selesai</Badge>
      case 'ditutup':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Ditutup</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'darurat':
        return <Badge className="bg-red-500 text-white hover:bg-red-500">Darurat</Badge>
      case 'tinggi':
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500">Tinggi</Badge>
      case 'normal':
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500">Normal</Badge>
      case 'rendah':
        return <Badge className="bg-gray-500 text-white hover:bg-gray-500">Rendah</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Pelaporan Qomarun</h1>
              <p className="text-gray-600 mt-1">Analisis data pelaporan kekerasan secara real-time</p>
            </div>
            <div className="text-sm text-gray-500">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Main Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Laporan</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalReports}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Semua laporan</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Laporan Baru</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.newReports}</p>
                    <div className="flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">Perlu tindakan</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Sedang Diproses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.inProgressReports}</p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">Dalam penanganan</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Telah Selesai</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedReports}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Terselesaikan</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Laporan Anonim</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.anonymousReports}</p>
                    <p className="text-sm text-gray-500">
                      {Math.round((stats.anonymousReports / stats.totalReports) * 100)}% dari total
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Prioritas Tinggi</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.highPriorityReports}</p>
                    <p className="text-sm text-gray-500">
                      Darurat & Tinggi
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Rata-rata Harian</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(stats.totalReports / 30)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Laporan per hari
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Distribusi Jenis Kekerasan
                </CardTitle>
                <CardDescription>
                  Kategori laporan berdasarkan jenis kekerasan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{item.category}</span>
                        <span className="text-gray-600">{item.count} laporan ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Laporan Terbaru</CardTitle>
                <CardDescription>
                  5 laporan terakhir yang masuk ke sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-gray-900">{report.ticket_number}</span>
                          {getStatusBadge(report.status || 'baru')}
                          {getPriorityBadge(report.priority || 'normal')}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {report.is_anonymous ? 'Anonim' : report.victim_name || 'Tidak diketahui'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {report.violence_type} • {report.created_at ? new Date(report.created_at).toLocaleDateString('id-ID') : '-'}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => router.push(`/admin/reports/${report.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin/reports')}
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Lihat Semua Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tren Laporan Bulanan</CardTitle>
              <CardDescription>
                Jumlah laporan dalam 6 bulan terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {monthlyTrend.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-200 rounded-lg h-32 flex items-end justify-center p-2 mb-2">
                      <div 
                        className="bg-green-600 rounded-t w-full flex items-end justify-center text-white text-sm font-medium"
                        style={{ 
                          height: `${Math.max((item.count / Math.max(...monthlyTrend.map(m => m.count))) * 100, 10)}%`,
                          minHeight: '20px'
                        }}
                      >
                        {item.count}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{item.month}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>
                Tindakan yang sering dilakukan dalam pengelolaan laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white h-12"
                  onClick={() => router.push('/admin/reports?status=baru')}
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Laporan Baru ({stats.newReports})
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 h-12"
                  onClick={() => router.push('/admin/reports?status=diproses')}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Sedang Diproses ({stats.inProgressReports})
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 h-12"
                  onClick={() => router.push('/admin/reports?priority=tinggi,darurat')}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Prioritas Tinggi ({stats.highPriorityReports})
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                  onClick={() => router.push('/admin/settings')}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Pengaturan Sistem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}