'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Settings,
  Bell,
  Phone,
  Mail,
  Shield,
  Save,
  MessageSquare
} from 'lucide-react'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Notification Settings
    whatsappNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Contact Information
    emergencyPhone: '0812-3456-7890',
    adminEmail: 'admin@qomarun.com',
    whatsappNumber: '0812-3456-7890',
    
    // WhatsApp Templates
    newReportTemplate: 'Laporan baru telah diterima dengan ID tiket {ticket_id}. Tim akan segera menindaklanjuti.',
    statusUpdateTemplate: 'Pembaruan untuk tiket {ticket_id}. Status: {status}. {message}',
    
    // Security Settings
    autoLogout: true,
    sessionTimeout: '30',
    requirePasswordChange: false
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsLoading(false)
  }, [router])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Pengaturan berhasil disimpan!')
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pengaturan...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
              <p className="text-gray-600 mt-1">Kelola konfigurasi sistem dan notifikasi</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="qomarun-bg-green hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </Button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 qomarun-green" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>
                Atur cara sistem mengirim notifikasi untuk laporan baru dan update status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Notifikasi WhatsApp</Label>
                  <p className="text-sm text-gray-600">Kirim notifikasi melalui WhatsApp</p>
                </div>
                <Switch
                  checked={settings.whatsappNotifications}
                  onCheckedChange={(checked) => handleSettingChange('whatsappNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Notifikasi Email</Label>
                  <p className="text-sm text-gray-600">Kirim notifikasi melalui email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Notifikasi SMS</Label>
                  <p className="text-sm text-gray-600">Kirim notifikasi melalui SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2 qomarun-green" />
                Informasi Kontak
              </CardTitle>
              <CardDescription>
                Atur nomor dan email yang digunakan untuk komunikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="emergencyPhone">Nomor Darurat</Label>
                  <Input
                    id="emergencyPhone"
                    value={settings.emergencyPhone}
                    onChange={(e) => handleSettingChange('emergencyPhone', e.target.value)}
                    placeholder="0812-3456-7890"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsappNumber">Nomor WhatsApp Admin</Label>
                  <Input
                    id="whatsappNumber"
                    value={settings.whatsappNumber}
                    onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                    placeholder="0812-3456-7890"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adminEmail">Email Admin</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                  placeholder="admin@qomarun.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 qomarun-green" />
                Template Pesan WhatsApp
              </CardTitle>
              <CardDescription>
                Atur template pesan yang akan dikirim otomatis ke pelapor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="newReportTemplate">Template Laporan Baru</Label>
                <Textarea
                  id="newReportTemplate"
                  value={settings.newReportTemplate}
                  onChange={(e) => handleSettingChange('newReportTemplate', e.target.value)}
                  rows={3}
                  placeholder="Template pesan untuk laporan baru..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan {'{ticket_id}'} untuk nomor tiket otomatis
                </p>
              </div>

              <div>
                <Label htmlFor="statusUpdateTemplate">Template Update Status</Label>
                <Textarea
                  id="statusUpdateTemplate"
                  value={settings.statusUpdateTemplate}
                  onChange={(e) => handleSettingChange('statusUpdateTemplate', e.target.value)}
                  rows={3}
                  placeholder="Template pesan untuk update status..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan {'{ticket_id}'}, {'{status}'}, dan {'{message}'} untuk data otomatis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 qomarun-green" />
                Pengaturan Keamanan
              </CardTitle>
              <CardDescription>
                Atur kebijakan keamanan untuk akses admin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto Logout</Label>
                  <p className="text-sm text-gray-600">Logout otomatis saat tidak aktif</p>
                </div>
                <Switch
                  checked={settings.autoLogout}
                  onCheckedChange={(checked) => handleSettingChange('autoLogout', checked)}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Timeout Session (menit)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  placeholder="30"
                  className="w-32"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Wajib Ganti Password</Label>
                  <p className="text-sm text-gray-600">Paksa admin mengganti password secara berkala</p>
                </div>
                <Switch
                  checked={settings.requirePasswordChange}
                  onCheckedChange={(checked) => handleSettingChange('requirePasswordChange', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Sistem</CardTitle>
              <CardDescription>
                Informasi tentang versi dan status sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Versi Sistem</Label>
                  <p className="text-gray-900">Qomarun v1.0.0</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Terakhir Diperbarui</Label>
                  <p className="text-gray-900">{new Date().toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Status Database</Label>
                  <p className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Terhubung
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Status WhatsApp API</Label>
                  <p className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Aktif
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}