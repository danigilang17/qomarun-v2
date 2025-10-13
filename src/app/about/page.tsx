import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Heart, BookOpen, Phone, Mail, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Qomarun</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform pelaporan kekerasan yang aman dan terpercaya untuk 
              Pondok Pesantren Miftahul Ulum Gandok
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-6 h-6 mr-3 qomarun-green" />
                Misi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Qomarun hadir sebagai platform yang memberikan ruang aman bagi seluruh civitas 
                Pondok Pesantren Miftahul Ulum Gandok untuk melaporkan segala bentuk kekerasan 
                atau pelanggaran. Kami berkomitmen untuk menciptakan lingkungan pesantren yang 
                aman, nyaman, dan kondusif untuk pendidikan dan pengembangan karakter islami.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 qomarun-green" />
                  Keamanan & Privasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Setiap laporan dijaga kerahasiaannya dengan sistem enkripsi tingkat tinggi. 
                  Identitas pelapor dilindungi sepenuhnya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 qomarun-green" />
                  Kepedulian Bersama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Menciptakan budaya saling peduli dan melindungi sesama dalam 
                  lingkungan pesantren yang harmonis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 qomarun-green" />
                  Pendidikan Karakter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Mendukung pembentukan karakter santri yang berakhlak mulia 
                  melalui lingkungan yang bebas dari kekerasan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 qomarun-green" />
                  Keadilan & Transparansi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Setiap laporan ditangani dengan adil dan transparan sesuai 
                  dengan nilai-nilai Islam dan hukum yang berlaku.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How We Work */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cara Kerja Platform</CardTitle>
              <CardDescription>
                Proses penanganan laporan yang profesional dan terpercaya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Penerimaan Laporan</h3>
                    <p className="text-gray-600 text-sm">
                      Laporan diterima melalui platform online yang aman dan dapat diakses 24/7
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Verifikasi & Klasifikasi</h3>
                    <p className="text-gray-600 text-sm">
                      Tim khusus memverifikasi dan mengklasifikasikan laporan berdasarkan tingkat urgensi
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Investigasi</h3>
                    <p className="text-gray-600 text-sm">
                      Investigasi dilakukan secara profesional dengan melibatkan pihak yang kompeten
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 qomarun-bg-green rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tindak Lanjut</h3>
                    <p className="text-gray-600 text-sm">
                      Tindakan korektif dan preventif diambil sesuai dengan hasil investigasi
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kontak & Informasi</CardTitle>
              <CardDescription>
                Hubungi kami untuk informasi lebih lanjut atau bantuan darurat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Kontak Darurat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="font-medium">0812-3456-7890</div>
                        <div className="text-sm text-gray-600">24 Jam Setiap Hari</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="font-medium">qomarun@miftahululum.ac.id</div>
                        <div className="text-sm text-gray-600">Email Resmi</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Alamat Pesantren</h3>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 qomarun-green mr-3 mt-1" />
                    <div>
                      <div className="font-medium">Pondok Pesantren Miftahul Ulum</div>
                      <div className="text-sm text-gray-600">
                        Jl. Raya Gandok No. 123<br />
                        Gandok, Kecamatan Gandok<br />
                        Kabupaten Gandok, Jawa Timur 12345
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Penting untuk Diketahui</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Platform ini dikelola langsung oleh manajemen Pondok Pesantren Miftahul Ulum Gandok</li>
              <li>• Setiap laporan akan ditangani sesuai dengan prosedur internal pesantren dan peraturan yang berlaku</li>
              <li>• Laporan palsu atau fitnah akan diproses sesuai dengan hukum yang berlaku</li>
              <li>• Untuk kasus yang memerlukan penanganan hukum, akan dikoordinasikan dengan pihak berwajib</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}