import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { Shield, Users, Clock, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-secondary-800">Cara Kerja Platform</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Proses pelaporan yang mudah dan aman dalam 3 langkah sederhana
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary-800">Buat Laporan</h3>
              <p className="text-secondary-600">
                Isi formulir pelaporan dengan detail insiden yang terjadi. Anda dapat memilih untuk melaporkan secara anonim.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary-800">Dapatkan Nomor Tiket</h3>
              <p className="text-secondary-600">
                Setelah laporan dikirim, Anda akan mendapatkan nomor tiket unik untuk melacak status laporan.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary-800">Pantau Progress</h3>
              <p className="text-secondary-600">
                Gunakan nomor tiket untuk memantau perkembangan penanganan laporan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-secondary-800">Mengapa Memilih Qomarun?</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Komitmen kami untuk menjaga keamanan dan privasi dalam setiap laporan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Keamanan Tinggi", 
                description: "Enkripsi end-to-end untuk melindungi data Anda" 
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                title: "Tim Profesional", 
                description: "Ditangani oleh tim yang berpengalaman dan terpercaya" 
              },
              { 
                icon: <Clock className="w-8 h-8" />, 
                title: "Respon Cepat", 
                description: "Laporan akan ditindaklanjuti dalam 24 jam" 
              },
              { 
                icon: <CheckCircle className="w-8 h-8" />, 
                title: "Terpercaya", 
                description: "Platform resmi Pondok Pesantren Miftahul Ulum Gandok" 
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                <div className="text-secondary-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-secondary-800">{feature.title}</h3>
                <p className="text-secondary-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-secondary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Dalam Keadaan Darurat?</h2>
          <p className="text-secondary-200 mb-6 max-w-2xl mx-auto">
            Jika Anda dalam situasi darurat yang memerlukan bantuan segera, 
            hubungi nomor darurat atau datang langsung ke kantor pesantren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-secondary-700 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold">Nomor Darurat</div>
              <div className="text-lg">0812-3456-7890</div>
            </div>
            <div className="bg-secondary-700 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold">Kantor Pesantren</div>
              <div className="text-lg">Buka 24 Jam</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}