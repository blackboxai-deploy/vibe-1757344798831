// TypeScript interfaces for RPPM Generator

export interface RPPMFormData {
  // Identity Section
  namaInstansi: string;
  mataPelajaran: string;
  kelasFase: string;
  alokasiWaktu: string;
  jumlahPertemuan: string;
  penyusun: string;
  
  // Main Inputs
  dimensiProfilLulusan: string[];
  tujuanPembelajaran: string;
  modelPembelajaran: string;
}

export interface AIGeneratedContent {
  pesertaDidik: string;
  materiPelajaran: string;
  lintasDisiplin: string;
  topikPembelajaran: string;
  praktikPedagogis: string;
  kemitraan: string;
  lingkunganBelajar: string;
  pemanfaatanDigital: string;
  kegiatanAwal: string;
  intiMemahami: string;
  intiMengaplikasi: string;
  intiMerefleksi: string;
  kegiatanPenutup: string;
  asesmenAwal: string;
  asesmenProses: string;
  asesmenAkhir: string;
}

export interface RPPMOutput extends RPPMFormData, AIGeneratedContent {}

export interface APIResponse {
  success: boolean;
  data?: AIGeneratedContent;
  error?: string;
}

export const DIMENSI_PROFIL_LULUSAN = [
  "Keimanan dan Ketakwaan terhadap Tuhan YME",
  "Kewargaan",
  "Penalaran Kritis", 
  "Kreativitas",
  "Kolaborasi",
  "Kemandirian",
  "Kesehatan",
  "Komunikasi"
] as const;

export type DimensiProfilLulusan = typeof DIMENSI_PROFIL_LULUSAN[number];