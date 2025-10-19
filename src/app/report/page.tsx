"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Lock,
  Users,
  FileText,
  User,
  Calendar,
  MapPin,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client"; // added import

export default function ReportPage() {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [formData, setFormData] = useState({
    // Category
    category: "",

    // Reporter Info
    reporterName: "",
    reporterStatus: "",
    reporterContact: "",

    // Case Details
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    impact: "",

    // Victim Info
    victimName: "",
    victimAge: "",
    victimGender: "",

    // Perpetrator Info
    perpetratorName: "",
    perpetratorRole: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentChecked) {
      alert("Anda harus menyetujui pemrosesan data untuk melanjutkan.");
      return;
    }

    setIsSubmitting(true);

    // Generate ticket number
    const ticketNumber = "QMR-" + Date.now().toString().slice(-8);

    // Create supabase client (browser)
    const supabase = createClient();

    // Prepare payload for `reports` table (match fields in src/types/supabase.ts)
    const payload = {
      ticket_number: ticketNumber,
      violence_type: formData.category,
      incident_date: formData.incidentDate || null,
      incident_time: formData.incidentTime || null,
      location: formData.location,
      description: formData.description,
      impact: formData.impact || null,
      victim_name: formData.victimName || null,
      victim_age: formData.victimAge ? Number(formData.victimAge) : null,
      victim_gender: formData.victimGender || null,
      perpetrator_name: formData.perpetratorName || null,
      perpetrator_relationship: formData.perpetratorRole || null,
      is_anonymous: isAnonymous,
      reporter_name: isAnonymous ? null : formData.reporterName || null,
      reporter_phone: isAnonymous ? null : formData.reporterContact || null,
      reporter_relationship: isAnonymous
        ? null
        : formData.reporterStatus || null,
      status: "baru",
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const { data, error } = await supabase.from("reports").insert([payload]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Gagal mengirim laporan. Silakan coba lagi.");
      setIsSubmitting(false);
      return;
    }

    // On success, redirect to confirmation with ticket
    router.push(`/report/confirmation?ticket=${ticketNumber}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnonymousChange = (checked: boolean | "indeterminate") => {
    setIsAnonymous(checked === true);
  };

  const handleConsentChange = (checked: boolean | "indeterminate") => {
    setConsentChecked(checked === true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Formulir Pelaporan Kekerasan
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Buat Laporan Baru
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Silakan isi formulir di bawah ini dengan lengkap dan jujur. Semua
              informasi akan dijaga kerahasiaannya.
            </p>
          </div>

          {/* Security Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white rounded-xl border border-green-100">
              <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rahasia</h3>
              <p className="text-sm text-gray-600">
                Data Anda dilindungi dengan enkripsi tingkat tinggi
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl border border-green-100">
              <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Terlindungi</h3>
              <p className="text-sm text-gray-600">
                Hanya pihak berwenang yang dapat mengakses
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl border border-green-100">
              <div className="w-12 h-12 qomarun-bg-green rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Profesional</h3>
              <p className="text-sm text-gray-600">
                Ditangani oleh tim yang berpengalaman
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 qomarun-green" />
                  Kategori Laporan
                </CardTitle>
                <CardDescription>
                  Pilih kategori yang sesuai dengan kejadian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.category}
                  onValueChange={(value: string | undefined) =>
                    value !== undefined && handleInputChange("category", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kekerasan-fisik">
                      Kekerasan Fisik
                    </SelectItem>
                    <SelectItem value="kekerasan-verbal">
                      Kekerasan Verbal/Psikologis
                    </SelectItem>
                    <SelectItem value="kekerasan-seksual">
                      Kekerasan Seksual
                    </SelectItem>
                    <SelectItem value="bullying">
                      Bullying/Perundungan
                    </SelectItem>
                    <SelectItem value="diskriminasi">Diskriminasi</SelectItem>
                    <SelectItem value="penyalahgunaan-kekuasaan">
                      Penyalahgunaan Kekuasaan
                    </SelectItem>
                    <SelectItem value="penelantaran">Penelantaran</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Reporter Identity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 qomarun-green" />
                  Identitas Pelapor
                </CardTitle>
                <CardDescription>
                  Informasi tentang Anda sebagai pelapor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="reporterName">Nama Pelapor (opsional)</Label>
                  <Input
                    id="reporterName"
                    placeholder="Boleh dikosongkan (anonim)"
                    value={formData.reporterName}
                    onChange={(e) =>
                      handleInputChange("reporterName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="reporterStatus">Status Pelapor</Label>
                  <Select
                    value={formData.reporterStatus}
                    onValueChange={(value: string) =>
                      handleInputChange("reporterStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="santri">Santri</SelectItem>
                      <SelectItem value="orang-tua">Orang Tua</SelectItem>
                      <SelectItem value="staf">Staf</SelectItem>
                      <SelectItem value="ustadz">Ustadz/Guru</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                      <SelectItem value="masyarakat">Masyarakat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reporterContact">Kontak Pelapor</Label>
                  <Input
                    id="reporterContact"
                    placeholder="Nomor HP/WhatsApp aktif"
                    value={formData.reporterContact}
                    onChange={(e) =>
                      handleInputChange("reporterContact", e.target.value)
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={handleAnonymousChange}
                  />
                  <Label htmlFor="anonymous" className="text-sm font-medium">
                    Kirim sebagai anonim
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Case Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 qomarun-green" />
                  Rincian Kasus
                </CardTitle>
                <CardDescription>
                  Detail lengkap tentang kejadian yang dilaporkan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incidentDate">
                      Waktu Kejadian - Tanggal *
                    </Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) =>
                        handleInputChange("incidentDate", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="incidentTime">Waktu Kejadian - Jam</Label>
                    <Input
                      id="incidentTime"
                      type="time"
                      value={formData.incidentTime}
                      onChange={(e) =>
                        handleInputChange("incidentTime", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Lokasi Kejadian *</Label>
                  <Input
                    id="location"
                    placeholder="Contoh: Asrama Putri, Kelas, dll."
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">
                    Kronologi/Deskripsi Kejadian *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tuliskan kronologi kejadian secara jelas dan berurutan"
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="impact">Dampak yang Dirasakan</Label>
                  <Textarea
                    id="impact"
                    placeholder="Contoh: trauma, luka fisik, ketakutan, nilai menurun, dll."
                    rows={4}
                    value={formData.impact}
                    onChange={(e) =>
                      handleInputChange("impact", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Victim and Perpetrator Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Victim Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Identitas Korban
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="victimName">Nama Korban *</Label>
                    <Input
                      id="victimName"
                      placeholder="Nama lengkap korban"
                      value={formData.victimName}
                      onChange={(e) =>
                        handleInputChange("victimName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="victimAge">Usia</Label>
                    <Input
                      id="victimAge"
                      type="number"
                      placeholder="Usia korban"
                      value={formData.victimAge}
                      onChange={(e) =>
                        handleInputChange("victimAge", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="victimGender">Jenis Kelamin</Label>
                    <Select
                      value={formData.victimGender}
                      onValueChange={(value: string) =>
                        handleInputChange("victimGender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <div>
                    <Label htmlFor="perpetratorName">
                      Nama Pelaku (bila diketahui)
                    </Label>
                    <Input
                      id="perpetratorName"
                      placeholder="Nama pelaku jika diketahui"
                      value={formData.perpetratorName}
                      onChange={(e) =>
                        handleInputChange("perpetratorName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="perpetratorRole">Peran/Status</Label>
                    <Input
                      id="perpetratorRole"
                      placeholder="Contoh: teman sekelas, senior, dll."
                      value={formData.perpetratorRole}
                      onChange={(e) =>
                        handleInputChange("perpetratorRole", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consent */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={handleConsentChange}
                    required
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Saya menyatakan bahwa informasi yang saya sampaikan adalah
                    benar sesuai pengetahuan saya, dan saya menyetujui
                    pemrosesan data ini oleh Tim Satgas Pesantren untuk
                    keperluan penanganan kasus.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center space-y-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !consentChecked}
                className="qomarun-bg-green hover:bg-green-700 text-white px-12 py-4 text-lg font-medium"
              >
                {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan"}
              </Button>

              <p className="text-sm text-gray-600">
                Dengan mengirim laporan, Anda memahami kebijakan privasi dan
                kerahasiaan Qomarun.
              </p>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-6 h-6 qomarun-green mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Jaminan Keamanan & Privasi
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Semua data dienkripsi dengan standar keamanan tinggi
                  </li>
                  <li>• Hanya pihak berwenang yang dapat mengakses laporan</li>
                  <li>• Identitas pelapor dijaga kerahasiaannya</li>
                  <li>• Laporan akan ditindaklanjuti dalam 24 jam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
