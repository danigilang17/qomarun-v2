"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export default function StatusPage() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber.trim()) {
      setError("Masukkan nomor tiket");
      return;
    }

    setIsSearching(true);
    setError("");

    // Supabase client (menggunakan env vars yang diawali NEXT_PUBLIC_)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Sesuaikan nama tabel dan kolom sesuai skema Anda
      const { data, error: sbError } = await supabase
        .from("reports")
        .select(
          "ticket_number, status, priority, assigned_to, notes, created_at, updated_at, violence_type, incident_date, incident_time, location, description, victim_name, victim_age, victim_gender, victim_phone, victim_email, perpetrator_name, perpetrator_relationship, witness_name, witness_contact, is_anonymous, reporter_name, reporter_phone, reporter_email, reporter_relationship, impact"
        )
        .eq("ticket_number", ticketNumber)
        .maybeSingle();

      if (sbError) throw sbError;

      if (!data) {
        setError("Nomor tiket tidak ditemukan. Pastikan nomor tiket benar.");
        setReportData(null);
        return;
      }

      // Mapping field dari DB ke state yang dipakai komponen
      const mapped = {
        ticketNumber: data.ticket_number,
        status: data.status,
        priority: data.priority,
        assignedTo: data.assigned_to,
        submittedDate: data.created_at
          ? new Date(data.created_at).toLocaleDateString("id-ID")
          : null,
        lastUpdate: data.updated_at
          ? new Date(data.updated_at).toLocaleString("id-ID")
          : null,
        violenceType: data.violence_type,
        incidentDate: data.incident_date,
        incidentTime: data.incident_time,
        location: data.location,
        description: data.description,
        victim: {
          name: data.victim_name,
          age: data.victim_age,
          gender: data.victim_gender,
          phone: data.victim_phone,
          email: data.victim_email,
        },
        perpetrator: {
          name: data.perpetrator_name,
          relationship: data.perpetrator_relationship,
        },
        witness: {
          name: data.witness_name,
          contact: data.witness_contact,
        },
        isAnonymous: data.is_anonymous,
        reporter: {
          name: data.reporter_name,
          phone: data.reporter_phone,
          email: data.reporter_email,
          relationship: data.reporter_relationship,
        },
        notes: Array.isArray(data.notes)
          ? data.notes
          : data.notes
            ? [
                {
                  description: data.notes,
                  date: data.updated_at
                    ? new Date(data.updated_at).toLocaleString("id-ID")
                    : null,
                },
              ]
            : [],
        impact: data.impact,
      };

      setReportData(mapped);

      // debug: lihat nilai status & data mentah di console
      console.log("Supabase report raw:", data);
      console.log("Mapped reportData.status:", mapped.status);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
      setReportData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "baru":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Diterima
          </Badge>
        );
      case "diproses":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Sedang Ditinjau
          </Badge>
        );
      case "investigating":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Investigasi
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Selesai
          </Badge>
        );
      case "selesai":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Ditutup
          </Badge>
        );
      default:
        return <Badge variant="secondary">Tidak Ada</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "under_review":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "investigating":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Lacak Status Laporan Anda
            </h1>
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

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <Button
                  type="submit"
                  disabled={isSearching}
                  className="qomarun-bg-green hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Mencari..." : "Cari Laporan"}
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
                    {getStatusBadge(reportData?.status ?? "")}
                  </div>
                  <CardDescription>
                    Nomor Tiket: {reportData.ticketNumber}
                    {/* debug: tampilkan nilai status mentah di UI sementara */}
                    <div className="text-xs text-gray-500 mt-1">
                      Status raw: {reportData?.status ?? "—"}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Tanggal Laporan
                        </div>
                        <div className="font-medium">
                          {reportData.submittedDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Update Terakhir
                        </div>
                        <div className="font-medium">
                          {reportData.lastUpdate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FileText className="w-5 h-5 qomarun-green mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">
                          Jenis Kekerasan
                        </div>
                        <div className="font-medium">
                          {reportData.violenceType}
                        </div>
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
                    {reportData.notes.map((item: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-4 mt-1">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">
                              {item.title || item.author || "Catatan"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.date || item.created_at || ""}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.description || item.text || item.note || ""}
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
                    Jika Anda memiliki pertanyaan atau memerlukan informasi
                    tambahan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Kontak Darurat
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Untuk situasi mendesak:
                      </p>
                      <p className="font-medium qomarun-green">
                        0812-3456-7890
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Kantor Pesantren
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Jam operasional:
                      </p>
                      <p className="font-medium text-blue-700">
                        24 Jam Setiap Hari
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">
              Pertanyaan Umum
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Q: Berapa lama proses penanganan laporan?</strong>
                <p className="text-gray-600 mt-1">
                  A: Setiap laporan akan ditinjau dalam 24 jam. Proses
                  investigasi dapat memakan waktu 3-7 hari kerja tergantung
                  kompleksitas kasus.
                </p>
              </div>
              <div>
                <strong>Q: Apakah saya akan dihubungi langsung?</strong>
                <p className="text-gray-600 mt-1">
                  A: Jika Anda memberikan kontak dan laporan bukan anonim, tim
                  mungkin akan menghubungi untuk klarifikasi tambahan.
                </p>
              </div>
              <div>
                <strong>Q: Bagaimana jika nomor tiket hilang?</strong>
                <p className="text-gray-600 mt-1">
                  A: Hubungi kantor pesantren dengan memberikan detail laporan
                  yang Anda ingat untuk bantuan pencarian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
