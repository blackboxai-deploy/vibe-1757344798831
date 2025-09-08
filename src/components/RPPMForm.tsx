"use client";

import React, { useState } from "react";
import { RPPMFormData, DIMENSI_PROFIL_LULUSAN, APIResponse, AIGeneratedContent } from "@/types/rppm";
import { LoadingSpinner } from "./LoadingSpinner";

interface RPPMFormProps {
  onSubmit: (formData: RPPMFormData, generatedContent: AIGeneratedContent) => void;
}

export const RPPMForm: React.FC<RPPMFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RPPMFormData>({
    namaInstansi: "",
    mataPelajaran: "",
    kelasFase: "",
    alokasiWaktu: "",
    jumlahPertemuan: "",
    penyusun: "",
    dimensiProfilLulusan: [],
    tujuanPembelajaran: "",
    modelPembelajaran: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof RPPMFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (dimension: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dimensiProfilLulusan: checked
        ? [...prev.dimensiProfilLulusan, dimension]
        : prev.dimensiProfilLulusan.filter(d => d !== dimension)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.tujuanPembelajaran.trim()) {
      setError("Harap isi Tujuan Pembelajaran terlebih dahulu.");
      return;
    }

    if (formData.dimensiProfilLulusan.length === 0) {
      setError("Harap pilih minimal satu Dimensi Profil Lulusan.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-rppm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tujuanPembelajaran: formData.tujuanPembelajaran,
          dimensiProfilLulusan: formData.dimensiProfilLulusan.join(', '),
          modelPembelajaran: formData.modelPembelajaran
        })
      });

      const result: APIResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Terjadi kesalahan yang tidak diketahui');
      }

      onSubmit(formData, result.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      namaInstansi: "",
      mataPelajaran: "",
      kelasFase: "",
      alokasiWaktu: "",
      jumlahPertemuan: "",
      penyusun: "",
      dimensiProfilLulusan: [],
      tujuanPembelajaran: "",
      modelPembelajaran: ""
    });
    setError(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="no-print">
      {/* Identity Section */}
      <div className="form-section border border-gray-300 rounded-lg p-6 mb-6 bg-white">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Identitas Modul</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nama-instansi" className="block font-medium mb-2">
              Nama Instansi
            </label>
            <input
              type="text"
              id="nama-instansi"
              placeholder="Contoh: SMA Negeri 1"
              value={formData.namaInstansi}
              onChange={(e) => handleInputChange('namaInstansi', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="mata-pelajaran" className="block font-medium mb-2">
              Mata Pelajaran
            </label>
            <input
              type="text"
              id="mata-pelajaran"
              placeholder="Contoh: Biologi"
              value={formData.mataPelajaran}
              onChange={(e) => handleInputChange('mataPelajaran', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="kelas-fase" className="block font-medium mb-2">
              Kelas/Fase
            </label>
            <input
              type="text"
              id="kelas-fase"
              placeholder="Contoh: X / Fase E"
              value={formData.kelasFase}
              onChange={(e) => handleInputChange('kelasFase', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="alokasi-waktu" className="block font-medium mb-2">
              Alokasi Waktu
            </label>
            <input
              type="text"
              id="alokasi-waktu"
              placeholder="Contoh: 2 Jam Pelajaran"
              value={formData.alokasiWaktu}
              onChange={(e) => handleInputChange('alokasiWaktu', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="jumlah-pertemuan" className="block font-medium mb-2">
              Jumlah Pertemuan
            </label>
            <input
              type="text"
              id="jumlah-pertemuan"
              placeholder="Contoh: 1 Pertemuan"
              value={formData.jumlahPertemuan}
              onChange={(e) => handleInputChange('jumlahPertemuan', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="penyusun" className="block font-medium mb-2">
              Penyusun
            </label>
            <input
              type="text"
              id="penyusun"
              placeholder="Nama Anda"
              value={formData.penyusun}
              onChange={(e) => handleInputChange('penyusun', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Input Section */}
      <div className="form-section border border-gray-300 rounded-lg p-6 mb-6 bg-white">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Input Utama untuk AI</h3>
        
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Dimensi Profil Lulusan (Pilih yang relevan)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {DIMENSI_PROFIL_LULUSAN.map((dimension) => (
              <label key={dimension} className="flex items-start space-x-2 font-normal">
                <input
                  type="checkbox"
                  checked={formData.dimensiProfilLulusan.includes(dimension)}
                  onChange={(e) => handleCheckboxChange(dimension, e.target.checked)}
                  className="mt-1 flex-shrink-0"
                />
                <span>{dimension}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tujuan-pembelajaran" className="block font-medium mb-2">
            Tujuan Pembelajaran
          </label>
          <textarea
            id="tujuan-pembelajaran"
            rows={3}
            placeholder="Tuliskan tujuan pembelajaran yang ingin dicapai. AI akan menggunakan ini sebagai dasar utama."
            value={formData.tujuanPembelajaran}
            onChange={(e) => handleInputChange('tujuanPembelajaran', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="model-pembelajaran" className="block font-medium mb-2">
            Model Pembelajaran
          </label>
          <input
            type="text"
            id="model-pembelajaran"
            placeholder="Contoh: Problem Based Learning, Project Based Learning, Discovery Learning"
            value={formData.modelPembelajaran}
            onChange={(e) => handleInputChange('modelPembelajaran', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate dengan AI'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Bersihkan Form
        </button>
      </div>
    </form>
  );
};