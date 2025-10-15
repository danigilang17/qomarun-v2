import Link from "next/link";
import { FileText, Search, Lock, Shield } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006400' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative pt-20 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
              {/* Replace Shield icon */}
              {/* <Shield className="h-8 w-8" /> */}
              <Image
                src="/images/logo-qomarun.png"
                alt="Qomarun Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              قلِ الحقَّ ولَو كانَ مُرًّا
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              <span className="qomarun-green">Qomarun</span>
              <br />
              <span className="text-gray-700 text-3xl sm:text-4xl font-semibold">
                Katakan Yang Benar Walaupun Pahit
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Platform pelaporan yang aman dan terpercaya untuk melaporkan
              insiden kekerasan. Privasi Anda terjamin dengan sistem enkripsi
              tingkat tinggi.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/report">
                <Button
                  size="lg"
                  className="qomarun-bg-green hover:bg-green-700 text-white px-8 py-4 text-lg font-medium w-full sm:w-auto"
                >
                  <FileText className="mr-2 w-5 h-5" />
                  Buat Laporan
                </Button>
              </Link>

              <Link href="/status">
                <Button
                  variant="outline"
                  size="lg"
                  className="qomarun-border-green qomarun-green hover:bg-green-50 px-8 py-4 text-lg font-medium w-full sm:w-auto"
                >
                  <Search className="mr-2 w-5 h-5" />
                  Cek Status Laporan
                </Button>
              </Link>
            </div>

            {/* Security Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/70 rounded-xl backdrop-blur-sm border border-green-100">
                <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  100% Rahasia
                </h3>
                <p className="text-gray-600 text-sm">
                  Identitas Anda dilindungi dengan enkripsi end-to-end
                </p>
              </div>

              <div className="text-center p-6 bg-white/70 rounded-xl backdrop-blur-sm border border-green-100">
                <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                  
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Aman & Terpercaya
                </h3>
                <p className="text-gray-600 text-sm">
                  Platform yang dikelola dengan standar keamanan tinggi
                </p>
              </div>

              <div className="text-center p-6 bg-white/70 rounded-xl backdrop-blur-sm border border-green-100">
                <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Mudah Digunakan
                </h3>
                <p className="text-gray-600 text-sm">
                  Interface yang sederhana dan mudah dipahami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
