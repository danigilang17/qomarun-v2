'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  Filter,
  Eye,
  Calendar,
  FileText,
  Download
} from 'lucide-react'

export default function AdminReportsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Mock reports data
  const allReports = [
    {
      id: 'QMR-20241201',
      victimName: 'Ahmad S.',
      category: 'Kekerasan Fisik',
      date: '2024-12-01',
      status: 'baru',
      reporterName: 'Muhammad R.',
      location: 'Asrama Putra Lt. 2'
    },
    {
      id: 'QMR-20241130',
      victimName: 'Siti R.',
      category: 'Bullying/Perundungan',
      date: '2024-11-30',
      status: 'diproses',
      reporterName: 'Fatimah A.',
      location: 'Ruang Kelas A1'
    },
    {
      id: 'QMR-20241129',
      victimName: 'Muhammad F.',
      category: 'Kekerasan Verbal/Psikologis',
      date: '2024-11-29',
      status: 'selesai',
      reporterName: 'Anonim',
      location: 'Kantin Pesantren'
    },
    {
      id: 'QMR-20241128',
      victimName: 'Fatimah A.',
      category: 'Kekerasan Seksual',
      date: '2024-11-28',
      status: 'diproses',
      reporterName: 'Khadijah S.',
      location: 'Asrama Putri Lt. 1'
    },
    {
      id: 'QMR-20241127',
      victimName: 'Ali H.',
      category: 'Diskriminasi',
      date: '2024-11-27',
      status: 'menunggu',
      reporterName: 'Usman K.',
      location: 'Masjid Pesantren'
    },
    {
      id: 'QMR-20241126',
      victimName: 'Zainab M.',
      category: 'Penyalahgunaan Kekuasaan',
      date: '2024-11-26',
      status: 'selesai',
      reporterName: 'Anonim',
      location: 'Kantor Administrasi'
    }
  ]

  const [filteredReports, setFilteredReports] = useState(allReports)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsLoading(false)
  }, [router])

  useEffect(() => {
    let filtered = allReports

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reporterName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter)
    }

    setFilteredReports(filtered)
  }, [searchTerm, statusFilter, categoryFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'baru':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Baru</Badge>
      case 'diproses':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Diproses</Badge>
      case 'menunggu':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Menunggu</Badge>
      case 'selesai':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Selesai</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusCount = (status: string) => {
    return allReports.filter(report => report.status === status).length
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data laporan...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Semua Laporan</h1>
              <p className="text-gray-600 mt-1">Kelola dan pantau semua laporan kekerasan</p>
            </div>
            <Button
              variant="outline"
              className="qomarun-border-green qomarun-green hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="p-8">
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Laporan</p>
                    <p className="text-2xl font-bold text-gray-900">{allReports.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Laporan Baru</p>
                    <p className="text-2xl font-bold text-red-600">{getStatusCount('baru')}</p>
                  </div>
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sedang Diproses</p>
                    <p className="text-2xl font-bold text-yellow-600">{getStatusCount('diproses')}</p>
                  </div>
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                    <p className="text-2xl font-bold text-green-600">{getStatusCount('selesai')}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter & Pencarian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari ID tiket, nama korban..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="baru">Baru</SelectItem>
                    <SelectItem value="diproses">Sedang Diproses</SelectItem>
                    <SelectItem value="menunggu">Menunggu Tindak Lanjut</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Kekerasan Fisik">Kekerasan Fisik</SelectItem>
                    <SelectItem value="Kekerasan Verbal/Psikologis">Kekerasan Verbal/Psikologis</SelectItem>
                    <SelectItem value="Kekerasan Seksual">Kekerasan Seksual</SelectItem>
                    <SelectItem value="Bullying/Perundungan">Bullying/Perundungan</SelectItem>
                    <SelectItem value="Diskriminasi">Diskriminasi</SelectItem>
                    <SelectItem value="Penyalahgunaan Kekuasaan">Penyalahgunaan Kekuasaan</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setCategoryFilter('all')
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Laporan</CardTitle>
              <CardDescription>
                Menampilkan {filteredReports.length} dari {allReports.length} laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">ID Tiket</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Nama Korban</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Kategori</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Pelapor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tanggal Lapor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-medium">{report.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{report.victimName}</p>
                            <p className="text-sm text-gray-500">{report.location}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{report.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{report.reporterName}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {report.date}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="qomarun-border-green qomarun-green hover:bg-green-50"
                            onClick={() => router.push(`/admin/reports/${report.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredReports.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Tidak ada laporan yang sesuai dengan filter</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}