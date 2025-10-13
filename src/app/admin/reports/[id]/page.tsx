'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  User, 
  Calendar, 
  MapPin, 
  FileText, 
  Phone,
  Send,
  AlertTriangle,
  Shield
} from 'lucide-react'

export default function AdminReportDetail() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState('baru')
  const [notificationMessage, setNotificationMessage] = useState('')

  // Mock report data
  const reportData = {
    id: params.id || 'QMR-20241201',
    submittedDate: '2024-12-01 14:30',
    status: 'baru',
    category: 'Kekerasan Fisik',
    
    // Case Details
    incidentDate: '2024-11-30',
    incidentTime: '15:30',
    location: 'Asrama Putra Lantai 2',
    description: 'Korban dipukul oleh senior saat sedang belajar di kamar. Pelaku marah karena korban tidak mengerjakan tugas piket dengan baik. Korban mengalami memar di lengan kanan dan merasa trauma.',
    impact: 'Korban mengalami trauma psikologis, takut bertemu dengan pelaku, nilai akademik menurun, sulit tidur.',
    
    // Reporter Info
    reporterName: 'Ahmad Santoso',
    reporterStatus: 'Santri',
    reporterContact: '0812-3456-7890',
    isAnonymous: false,
    
    // Victim Info
    victimName: 'Muhammad Rizki',
    victimAge: '16',
    victimGender: 'Laki-laki',
    
    // Perpetrator Info
    perpetratorName: 'Budi Setiawan',
    perpetratorRole: 'Senior/Kakak Kelas'
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    // Initialize notification message template
    setNotificationMessage(`Pembaruan untuk tiket ${reportData.id}. Laporan Anda telah kami tindak lanjuti. Hasil: [Admin mengisi hasil tindak lanjut di sini]. Terima kasih atas partisipasi Anda dalam menjaga keamanan pesantren.`)
    setStatus(reportData.status)
    setIsLoading(false)
  }, [router, reportData.id, reportData.status])

  const handleUpdateStatus = async () => {
    setIsSending(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message (in real app, this would be a toast notification)
    alert('Status berhasil diperbarui dan notifikasi WhatsApp telah dikirim!')
    
    setIsSending(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'baru':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Baru</Badge>
      case 'diproses':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sedang Diproses</Badge>
      case 'menunggu':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Menunggu Tindak Lanjut</Badge>
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
          <p className="text-gray-600">Memuat detail laporan...</p>
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
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detail Laporan {reportData.id}</h1>
                <p className="text-gray-600 mt-1">Disubmit pada {reportData.submittedDate}</p>
              </div>
            </div>
            {getStatusBadge(status)}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Case Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 qomarun-green" />
                    Rincian Kasus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Kategori</label>
                      <p className="text-gray-900">{reportData.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tanggal Kejadian</label>
                      <p className="text-gray-900">{reportData.incidentDate} {reportData.incidentTime}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Lokasi Kejadian</label>
                    <p className="text-gray-900">{reportData.location}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Kronologi Kejadian</label>
                    <p className="text-gray-900 leading-relaxed">{reportData.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Dampak yang Dirasakan</label>
                    <p className="text-gray-900 leading-relaxed">{reportData.impact}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Reporter Info */}
              {!reportData.isAnonymous && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 qomarun-green" />
                      Identitas Pelapor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nama Pelapor</label>
                        <p className="text-gray-900">{reportData.reporterName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <p className="text-gray-900">{reportData.reporterStatus}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Kontak</label>
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {reportData.reporterContact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Victim Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Identitas Korban
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nama Korban</label>
                      <p className="text-gray-900">{reportData.victimName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Usia</label>
                      <p className="text-gray-900">{reportData.victimAge} tahun</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                      <p className="text-gray-900">{reportData.victimGender}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Perpetrator Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-orange-600" />
                    Identitas Pelaku
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nama Pelaku</label>
                      <p className="text-gray-900">{reportData.perpetratorName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Peran/Status</label>
                      <p className="text-gray-900">{reportData.perpetratorRole}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2 qomarun-green" />
                    Tindak Lanjut Laporan
                  </CardTitle>
                  <CardDescription>
                    Update status dan kirim notifikasi ke pelapor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Ubah Status
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baru">Baru</SelectItem>
                        <SelectItem value="diproses">Sedang Diproses</SelectItem>
                        <SelectItem value="menunggu">Menunggu Tindak Lanjut</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Pesan Hasil Tindak Lanjut
                      <span className="text-xs text-gray-500 block font-normal">
                        (Akan dikirim ke WhatsApp Pelapor)
                      </span>
                    </label>
                    <Textarea
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      rows={6}
                      className="text-sm"
                      placeholder="Masukkan pesan hasil tindak lanjut..."
                    />
                  </div>

                  <Button
                    onClick={handleUpdateStatus}
                    disabled={isSending}
                    className="w-full qomarun-bg-green hover:bg-green-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSending ? 'Mengirim...' : 'Update Status & Kirim Notifikasi'}
                  </Button>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 qomarun-green mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-1">Kerahasiaan Data</p>
                    <p className="text-gray-700">
                      Semua informasi dalam laporan ini bersifat rahasia dan hanya boleh diakses oleh pihak berwenang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}