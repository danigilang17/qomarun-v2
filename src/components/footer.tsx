import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="qomarun-bg-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                {/* Replace Shield icon */}
                {/* <Shield className="h-8 w-8" /> */}
                <Image src="/images/logo-qomarun.png" alt="Qomarun Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold">Qomarun</span>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Platform pelaporan kekerasan yang aman dan terpercaya untuk 
              Pondok Pesantren Miftahul Ulum Gandok.
            </p>
            <div className="text-sm text-green-200">
              Melindungi dengan kerahasiaan, menangani dengan profesional.
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-green-100 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/report" className="text-green-100 hover:text-white transition-colors">Buat Laporan</Link></li>
              <li><Link href="/status" className="text-green-100 hover:text-white transition-colors">Cek Status</Link></li>
              <li><Link href="/about" className="text-green-100 hover:text-white transition-colors">Tentang</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak Darurat</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-green-100">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">0812-3456-7890</span>
              </li>
              <li className="flex items-center text-green-100">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">qomarun@miftahululum.ac.id</span>
              </li>
              <li className="flex items-start text-green-100">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Pondok Pesantren Miftahul Ulum Gandok<br />
                  Jawa Timur, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-green-100 mb-4 md:mb-0 text-sm">
              © {currentYear} Pondok Pesantren Miftahul Ulum Gandok. Hak cipta dilindungi.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-green-100 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-green-200">
            Platform ini dikelola dengan standar keamanan tinggi untuk melindungi privasi dan kerahasiaan setiap laporan.
          </div>
        </div>
      </div>
    </footer>
  );
}