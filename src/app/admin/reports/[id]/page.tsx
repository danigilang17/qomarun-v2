"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  FileText,
  Phone,
  Send,
  AlertTriangle,
  Shield,
} from "lucide-react";

// Supabase client (requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function AdminReportDetail() {
  const router = useRouter();
  const params = useParams();
  const reportId = params?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("baru");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [reportData, setReportData] = useState<any>(null);

  // format tanggal ke Bahasa Indonesia: "20 Oktober 2025"
  const formatDateIndonesia = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // kalau bukan ISO, kembalikan apa adanya
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // format waktu sederhana: "14:30"
  const formatTime = (timeStr?: string | null) => {
    if (!timeStr) return "";
    // jika sudah berupa "HH:MM:SS" atau "HH:MM", ambil 5 karakter pertama
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(timeStr)) return timeStr.slice(0, 5);
    // coba parse jika diberikan sebagai bagian dari datetime
    const maybe = new Date(timeStr);
    if (!isNaN(maybe.getTime())) {
      return maybe.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return timeStr;
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (!reportId) {
      router.push("/admin/reports");
      return;
    }

    const fetchReport = async () => {
      setIsLoading(true);
      try {
        console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log(
          "SUPABASE KEY (prefix):",
          (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").slice(0, 8)
        );
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("id", reportId)
          .single();

        console.log("supabase fetch result", { data, error });

        // debug: lihat struktur data dari supabase untuk memastikan nama field
        console.log("raw report row:", data);

        if (error) {
          console.error("Supabase fetch error", error);
          alert("Gagal memuat laporan.");
          router.push("/admin/reports");
          return;
        }

        // Map / normalize DB fields to UI fields
        const mapped = {
          id: data.id,
          ticket_number: data.ticket_number,
          // coba beberapa kemungkinan nama / struktur untuk jenis kekerasan
          violence_type:
            data.violence_type ||
            data.violence?.type ||
            data.violence?.name ||
            data.type ||
            data.violation_type ||
            null,
          incident_date: data.incident_date,
          incident_time: data.incident_time,
          location: data.location,
          description: data.description,
          victim_name: data.victim_name,
          victim_age: data.victim_age,
          victim_gender: data.victim_gender,
          victim_phone: data.victim_phone,
          victim_email: data.victim_email,
          perpetrator_name: data.perpetrator_name,
          perpetrator_relationship: data.perpetrator_relationship,
          witness_name: data.witness_name,
          witness_contact: data.witness_contact,
          is_anonymous: data.is_anonymous,
          reporter_name: data.reporter_name,
          reporter_phone: data.reporter_phone,
          reporter_email: data.reporter_email,
          reporter_relationship: data.reporter_relationship,
          status: data.status,
          priority: data.priority,
          assigned_to: data.assigned_to,
          notes: data.notes,
          created_at: data.created_at,
          updated_at: data.updated_at,
          impact: data.impact,
        };

        setReportData(mapped);
        setStatus(mapped.status || "baru");
        setNotificationMessage(
          `Pembaruan untuk tiket ${mapped.ticket_number || mapped.id}. Laporan Anda telah kami tindak lanjuti. Hasil: [Admin mengisi hasil tindak lanjut di sini]. Terima kasih atas partisipasi Anda dalam menjaga keamanan pesantren.`
        );
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [router, reportId]);

  const handleUpdateStatus = async () => {
    if (!reportData) return;
    setIsSending(true);

    try {
      const notesToSave = notificationMessage;

      // Update report status and notes in Supabase (table: reports) and return updated row
      const { data: updatedReport, error: updateError } = await supabase
        .from("reports")
        .update({
          status,
          notes: notesToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", reportData.id)
        .select()
        .single();

      if (updateError) {
        console.error("Update error", updateError);
        alert("Gagal memperbarui status.");
        setIsSending(false);
        return;
      }

      // Use the notes value returned from the DB (fall back to local value)
      const savedNotes = (updatedReport && updatedReport.notes) || notesToSave;

      // Removed: insert into "notifications" table (not needed)
      alert("Status berhasil diperbarui.");

      // update local state
      setReportData((prev: any) => ({
        ...(prev || {}),
        status,
        notes: savedNotes,
      }));
      setNotificationMessage(savedNotes);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim pembaruan.");
    } finally {
      setIsSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "baru":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Baru
          </Badge>
        );
      case "diproses":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Sedang Diproses
          </Badge>
        );
      case "menunggu":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Menunggu Tindak Lanjut
          </Badge>
        );
      case "selesai":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Selesai
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail laporan...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Laporan tidak ditemukan.</p>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Detail Laporan {reportData.ticket_number}
                </h1>
                <p className="text-gray-600 mt-1">
                  Disubmit pada {formatDateIndonesia(reportData.incident_date)}{" "}
                  {reportData.incident_time
                    ? ` ${formatTime(reportData.incident_time)}`
                    : ""}
                </p>
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
                      <label className="text-sm font-medium text-gray-700">
                        Jenis Kekerasan
                      </label>
                      <p className="text-gray-900">
                        {reportData.violence_type ?? "Belum diisi"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tanggal Kejadian
                      </label>
                      <p className="text-gray-900">
                        {formatDateIndonesia(reportData.incident_date)}
                        {reportData.incident_time
                          ? ` ${formatTime(reportData.incident_time)}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Lokasi Kejadian
                    </label>
                    <p className="text-gray-900">{reportData.location}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Kronologi Kejadian
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {reportData.description}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Dampak yang Dirasakan
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {reportData.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Reporter Info */}
              {!reportData.is_anonymous && (
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
                        <label className="text-sm font-medium text-gray-700">
                          Nama Pelapor
                        </label>
                        <p className="text-gray-900">
                          {reportData.reporter_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Hubungan
                        </label>
                        <p className="text-gray-900">
                          {reportData.reporter_relationship}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Kontak
                      </label>
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {reportData.reporter_phone}
                      </p>
                    </div>
                    {reportData.reporter_email && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {reportData.reporter_email}
                        </p>
                      </div>
                    )}
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
                      <label className="text-sm font-medium text-gray-700">
                        Nama Korban
                      </label>
                      <p className="text-gray-900">{reportData.victim_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Usia
                      </label>
                      <p className="text-gray-900">
                        {reportData.victim_age} tahun
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Jenis Kelamin
                      </label>
                      <p className="text-gray-900">
                        {reportData.victim_gender}
                      </p>
                    </div>
                  </div>
                  {reportData.victim_phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Kontak Korban
                      </label>
                      <p className="text-gray-900">{reportData.victim_phone}</p>
                    </div>
                  )}
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
                      <label className="text-sm font-medium text-gray-700">
                        Nama Pelaku
                      </label>
                      <p className="text-gray-900">
                        {reportData.perpetrator_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Peran / Hubungan
                      </label>
                      <p className="text-gray-900">
                        {reportData.perpetrator_relationship}
                      </p>
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
                        <SelectItem value="diproses">
                          Sedang Diproses
                        </SelectItem>
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
                      name="notes"
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
                    {isSending
                      ? "Mengirim..."
                      : "Update Status & Kirim Notifikasi"}
                  </Button>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 qomarun-green mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-1">
                      Kerahasiaan Data
                    </p>
                    <p className="text-gray-700">
                      Semua informasi dalam laporan ini bersifat rahasia dan
                      hanya boleh diakses oleh pihak berwenang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
