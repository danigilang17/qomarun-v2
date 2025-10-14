// src/app/report/confirmation/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Copy, Home, Search, Shield } from 'lucide-react'
import { Suspense, useState } from 'react'

function Confirmation() {
  const searchParams = useSearchParams()
  const ticketNumber = searchParams.get('ticket') || 'QMR-12345678'
  const [copied, setCopied] = useState(false)

  const copyTicketNumber = () => {
    navigator.clipboard.writeText(ticketNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 qomarun-bg-green rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Laporan Berhasil Dikirim</h1>
            <p className="text-gray-600">
              Terima kasih telah melaporkan insiden ini. Laporan Anda akan segera ditindaklanjuti 
              oleh tim yang berwenang.
            </p>
          </div>

          {/* Ticket Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Nomor Tiket Laporan</CardTitle>
              <CardDescription className="text-center">
                Simpan nomor ini untuk melacak status laporan Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-3xl font-mono font-bold qomarun-green mb-4">
                  {ticketNumber}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyTicketNumber}
                  className="qomarun-border-green qomarun-green hover:bg-green-50"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Tersalin!' : 'Salin Nomor'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Langkah Selanjutnya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verifikasi Laporan</h3>
                    <p className="text-gray-600 text-sm">
                      Tim akan memverifikasi dan meninjau laporan Anda dalam 24 jam
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Investigasi</h3>
                    <p className="text-gray-600 text-sm">
                      Jika diperlukan, tim akan melakukan investigasi lebih lanjut
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Tindak Lanjut</h3>
                    <p className="text-gray-600 text-sm">
                      Tindakan yang sesuai akan diambil berdasarkan hasil investigasi
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Reminder */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg mb-8">
            <div className="flex items-start">
              <Shield className="w-6 h-6 qomarun-green mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pengingat Keamanan</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Jangan bagikan nomor tiket kepada orang lain</li>
                  <li>• Gunakan nomor tiket hanya untuk mengecek status laporan</li>
                  <li>• Jika ada pertanyaan, hubungi tim melalui kontak resmi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/status">
              <Button 
                variant="outline" 
                size="lg"
                className="qomarun-border-green qomarun-green hover:bg-green-50 w-full sm:w-auto"
              >
                <Search className="w-5 h-5 mr-2" />
                Cek Status Laporan
              </Button>
            </Link>
            
            <Link href="/">
              <Button 
                size="lg"
                className="qomarun-bg-green hover:bg-green-700 text-white w-full sm:w-auto"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <Confirmation />
    </Suspense>
  )
}