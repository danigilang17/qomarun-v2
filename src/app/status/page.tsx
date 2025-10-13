'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Clock, CheckCircle, AlertCircle, FileText, Calendar, MapPin, User } from 'lucide-react'

export default function StatusPage() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [reportData, setReportData] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketNumber.trim()) {
      setError('Masukkan nomor tiket')
      return
    }

    setIsSearching(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock data - in real app, this would come from API
    if (ticketNumber.includes('QMR-')) {
      setReportData({
        ticketNumber: ticketNumber,
        status: 'under_review',
        submittedDate: '2024-01-15',
        lastUpdate: '2024-01-16',
        violenceType: 'Kekerasan Verbal/Psikologis',
        location: 'Asrama Putra Lantai 2',
        timeline: [
          {
            date: '2024-01-15 14:30',
            status: 'submitted',
            description: 'Laporan diterima dan sedang diverifikasi'
          },
          {
            date: '2024-01-16 09:15',
            status: 'under_review',
            description: 'Laporan sedang dalam tahap investigasi'
          }
        ]
      })
    } else {
      setError('Nomor tiket tidak ditemukan. Pastikan nomor tiket benar.')
      setReportData(null)
    }
    
    setIsSearching(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Diterima</Badge>
      case 'under_review':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Sedang Ditinjau</Badge>
      case 'investigating':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Investigasi</Badge>
      case 'resolved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Selesai</Badge>
      case 'closed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Ditutup</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-4 h-4 text-blue-600" />
      case 'under_review':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'investigating':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4 mr-2" />
              Cek Status Laporan
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Lacak Status Laporan Anda</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Masukkan nomor tiket yang Anda terima setelah mengirim laporan 
              untuk melihat status dan perkembangan terkini.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Masukkan Nomor Tiket</CardTitle>
              <CardDescription>
                Format nomor tiket: QMR-XXXXXXXX
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="ticketNumber">Nomor Tiket</Label>
                  <Input
                    id="ticketNumber"
                    placeholder="Contoh: QMR-12345678"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="qomarun-bg-green hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? 'Mencari...' : 'Cari Laporan'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Report Details */}
          {reportData && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Status Laporan</CardTitle>
                    {getStatusBadge(reportData.status)}
                  </div>
                  <CardDescription>
                    Nomor Tiket: {reportData.ticketNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Tanggal Laporan</div>
                        <div className="font-medium">{reportData.submittedDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Update Terakhir</div>
                        <div className="font-medium">{reportData.lastUpdate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Jenis Kekerasan</div>
                        <div className="font-medium">{reportData.violenceType}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Penanganan</CardTitle>
                  <CardDescription>
                    Riwayat perkembangan laporan Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-4 mt-1">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">
                              {item.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Butuh Bantuan?</CardTitle>
                  <CardDescription>
                    Jika Anda memiliki pertanyaan atau memerlukan informasi tambahan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Kontak Darurat</h3>
                      <p className="text-sm text-gray-600 mb-2">Untuk situasi mendesak:</p>
                      <p className="font-medium qomarun-green">0812-3456-7890</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Kantor Pesantren</h3>
                      <p className="text-sm text-gray-600 mb-2">Jam operasional:</p>
                      <p className="font-medium text-blue-700">24 Jam Setiap Hari</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Pertanyaan Umum</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Q: Berapa lama proses penanganan laporan?</strong>
                <p className="text-gray-600 mt-1">A: Setiap laporan akan ditinjau dalam 24 jam. Proses investigasi dapat memakan waktu 3-7 hari kerja tergantung kompleksitas kasus.</p>
              </div>
              <div>
                <strong>Q: Apakah saya akan dihubungi langsung?</strong>
                <p className="text-gray-600 mt-1">A: Jika Anda memberikan kontak dan laporan bukan anonim, tim mungkin akan menghubungi untuk klarifikasi tambahan.</p>
              </div>
              <div>
                <strong>Q: Bagaimana jika nomor tiket hilang?</strong>
                <p className="text-gray-600 mt-1">A: Hubungi kantor pesantren dengan memberikan detail laporan yang Anda ingat untuk bantuan pencarian.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}