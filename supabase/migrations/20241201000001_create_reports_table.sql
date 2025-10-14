CREATE TABLE IF NOT EXISTS public.reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number text UNIQUE NOT NULL,
    violence_type text NOT NULL,
    incident_date date,
    incident_time time,
    location text,
    description text NOT NULL,
    victim_name text,
    victim_age integer,
    victim_gender text,
    victim_phone text,
    victim_email text,
    perpetrator_name text,
    perpetrator_relationship text,
    witness_name text,
    witness_contact text,
    is_anonymous boolean DEFAULT false,
    reporter_name text,
    reporter_phone text,
    reporter_email text,
    reporter_relationship text,
    status text DEFAULT 'baru' CHECK (status IN ('baru', 'diproses', 'selesai', 'ditutup')),
    priority text DEFAULT 'normal' CHECK (priority IN ('rendah', 'normal', 'tinggi', 'darurat')),
    assigned_to text,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reports_ticket_number ON public.reports(ticket_number);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_violence_type ON public.reports(violence_type);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at);

alter publication supabase_realtime add table reports;

INSERT INTO public.reports (
    ticket_number, violence_type, incident_date, incident_time, location, description,
    victim_name, victim_age, victim_gender, perpetrator_name, perpetrator_relationship,
    is_anonymous, status, priority, created_at
) VALUES 
('QMR-20241201001', 'Kekerasan Fisik', '2024-11-28', '14:30:00', 'Asrama Putra Lantai 2', 'Korban dipukul oleh senior saat kegiatan pembersihan asrama', 'Ahmad Syahrul', 16, 'Laki-laki', 'Muhammad Rizki', 'Senior/Kakak Kelas', false, 'baru', 'tinggi', '2024-12-01 08:30:00'),
('QMR-20241130002', 'Bullying/Perundungan', '2024-11-29', '10:15:00', 'Ruang Kelas XI-A', 'Korban sering diejek dan dikucilkan oleh teman sekelas', 'Siti Rahmawati', 17, 'Perempuan', 'Kelompok siswa', 'Teman sekelas', false, 'diproses', 'normal', '2024-11-30 15:45:00'),
('QMR-20241129003', 'Kekerasan Verbal/Psikologis', '2024-11-27', '19:00:00', 'Kantor Ustadz', 'Korban dimarahi dengan kata-kata kasar dan diancam', 'Muhammad Farid', 15, 'Laki-laki', 'Ustadz Hasan', 'Guru/Pengajar', false, 'selesai', 'normal', '2024-11-29 20:10:00'),
('QMR-20241128004', 'Kekerasan Seksual', '2024-11-26', '22:00:00', 'Area Belakang Masjid', 'Pelecehan seksual oleh senior', 'Anonim', 16, 'Laki-laki', 'Senior tidak dikenal', 'Senior/Kakak Kelas', true, 'diproses', 'darurat', '2024-11-28 07:20:00'),
('QMR-20241127005', 'Kekerasan Fisik', '2024-11-25', '16:45:00', 'Lapangan Olahraga', 'Korban ditendang saat bermain sepak bola', 'Ali Rahman', 17, 'Laki-laki', 'Bayu Setiawan', 'Teman', false, 'selesai', 'rendah', '2024-11-27 18:30:00'),
('QMR-20241126006', 'Bullying/Perundungan', '2024-11-24', '13:20:00', 'Kantin Pesantren', 'Korban dipaksa memberikan uang jajan', 'Fatimah Azzahra', 16, 'Perempuan', 'Kelompok senior', 'Senior/Kakak Kelas', false, 'diproses', 'tinggi', '2024-11-26 14:15:00'),
('QMR-20241125007', 'Kekerasan Verbal/Psikologis', '2024-11-23', '07:30:00', 'Asrama Putri', 'Korban sering dibentak dan dihina', 'Khadijah Nur', 15, 'Perempuan', 'Pengurus Asrama', 'Pengurus/Staff', false, 'baru', 'normal', '2024-11-25 09:45:00'),
('QMR-20241124008', 'Kekerasan Fisik', '2024-11-22', '20:15:00', 'Kamar Asrama 205', 'Korban dicubit dan didorong', 'Anonim', 16, 'Laki-laki', 'Roommate', 'Teman sekamar', true, 'selesai', 'normal', '2024-11-24 21:00:00'),
('QMR-20241123009', 'Bullying/Perundungan', '2024-11-21', '11:00:00', 'Perpustakaan', 'Korban sering diganggu saat belajar', 'Yusuf Hakim', 17, 'Laki-laki', 'Grup siswa nakal', 'Teman sekelas', false, 'diproses', 'normal', '2024-11-23 16:20:00'),
('QMR-20241122010', 'Kekerasan Seksual', '2024-11-20', '15:30:00', 'Toilet Asrama', 'Pelecehan verbal dengan konten seksual', 'Anonim', 15, 'Perempuan', 'Senior perempuan', 'Senior/Kakak Kelas', true, 'baru', 'tinggi', '2024-11-22 08:10:00'),
('QMR-20241121011', 'Kekerasan Verbal/Psikologis', '2024-11-19', '18:45:00', 'Ruang Makan', 'Korban dipermalukan di depan umum', 'Zainab Husna', 16, 'Perempuan', 'Pengawas Makan', 'Pengurus/Staff', false, 'selesai', 'normal', '2024-11-21 19:30:00'),
('QMR-20241120012', 'Kekerasan Fisik', '2024-11-18', '06:00:00', 'Halaman Masjid', 'Korban dipukul saat sholat subuh', 'Ibrahim Malik', 17, 'Laki-laki', 'Koordinator Sholat', 'Pengurus/Staff', false, 'diproses', 'tinggi', '2024-11-20 06:45:00'),
('QMR-20241119013', 'Bullying/Perundungan', '2024-11-17', '14:00:00', 'Kelas Tahfidz', 'Korban sering ditertawakan karena bacaan', 'Aminah Sari', 15, 'Perempuan', 'Teman sekelas', 'Teman sekelas', false, 'baru', 'rendah', '2024-11-19 15:20:00'),
('QMR-20241118014', 'Kekerasan Verbal/Psikologis', '2024-11-16', '21:30:00', 'Asrama Putra Lt.3', 'Korban diancam dan diintimidasi', 'Anonim', 16, 'Laki-laki', 'Ketua Kamar', 'Senior/Kakak Kelas', true, 'diproses', 'tinggi', '2024-11-18 22:15:00'),
('QMR-20241117015', 'Kekerasan Fisik', '2024-11-15', '12:30:00', 'Dapur Pesantren', 'Korban terluka saat bekerja karena dipaksa', 'Hafsah Qonita', 17, 'Perempuan', 'Koordinator Dapur', 'Pengurus/Staff', false, 'selesai', 'normal', '2024-11-17 13:45:00');