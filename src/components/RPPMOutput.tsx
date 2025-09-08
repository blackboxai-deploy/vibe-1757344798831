import React from "react";
import { RPPMOutput as RPPMOutputType } from "@/types/rppm";

interface RPPMOutputProps {
  data: RPPMOutputType;
  onPrint: () => void;
}

export const RPPMOutput: React.FC<RPPMOutputProps> = ({ data, onPrint }) => {
  const formatText = (text?: string) => {
    if (!text) return 'Konten belum tersedia.';
    return text.replace(/\n/g, '<br>');
  };

  return (
    <div className="mt-12">
      {/* Print Button */}
      <div className="no-print text-center mb-6">
        <button
          onClick={onPrint}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          Cetak / Simpan PDF
        </button>
      </div>

      {/* Output Section */}
      <div id="output-section">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">
            RENCANA PELAKSANAAN PEMBELAJARAN MINGGUAN (RPPM)
          </h2>
          <h3 className="text-lg font-semibold mt-2">
            {data.namaInstansi}
          </h3>
        </div>

        {/* Identity Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <td className="w-1/4 font-semibold p-3 border border-gray-400 bg-gray-50">
                Mata Pelajaran
              </td>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.mataPelajaran}
              </td>
            </tr>
            <tr>
              <td className="font-semibold p-3 border border-gray-400 bg-gray-50">
                Kelas/Fase
              </td>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.kelasFase}
              </td>
            </tr>
            <tr>
              <td className="font-semibold p-3 border border-gray-400 bg-gray-50">
                Alokasi Waktu
              </td>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.alokasiWaktu}
              </td>
            </tr>
            <tr>
              <td className="font-semibold p-3 border border-gray-400 bg-gray-50">
                Jumlah Pertemuan
              </td>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.jumlahPertemuan}
              </td>
            </tr>
            <tr>
              <td className="font-semibold p-3 border border-gray-400 bg-gray-50">
                Penyusun
              </td>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.penyusun}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Main Content Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <th className="align-middle text-center w-1/4 p-3 border border-gray-400 bg-blue-800 text-white">
                Dimensi Profil Lulusan
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.dimensiProfilLulusan.join(', ')}
              </td>
            </tr>
            <tr>
              <th className="align-middle text-center p-3 border border-gray-400 bg-blue-800 text-white">
                Tujuan Pembelajaran
              </th>
              <td 
                className="p-3 border border-gray-400 bg-gray-50"
                dangerouslySetInnerHTML={{ __html: formatText(data.tujuanPembelajaran) }}
              ></td>
            </tr>
            <tr>
              <th className="align-middle text-center p-3 border border-gray-400 bg-blue-800 text-white">
                Model Pembelajaran
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                {data.modelPembelajaran}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Identification Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <th rowSpan={2} className="align-middle text-center w-1/4 p-3 border border-gray-400 bg-blue-800 text-white">
                Identifikasi
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Peserta Didik:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.pesertaDidik) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Materi Pelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.materiPelajaran) }} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Learning Design Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <th rowSpan={6} className="align-middle text-center w-1/4 p-3 border border-gray-400 bg-blue-800 text-white">
                Desain Pembelajaran
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Lintas Disiplin Ilmu:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.lintasDisiplin) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Topik Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.topikPembelajaran) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Praktik Pedagogis:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.praktikPedagogis) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Kemitraan Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.kemitraan) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Lingkungan Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.lingkunganBelajar) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Pemanfaatan Digital:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.pemanfaatanDigital) }} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Learning Experience Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <th rowSpan={3} className="align-middle text-center w-1/4 p-3 border border-gray-400 bg-blue-800 text-white">
                Pengalaman Belajar
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>AWAL</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.kegiatanAwal) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>INTI</strong><br />
                <u>Memahami:</u><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.intiMemahami) }} />
                <br /><br />
                <u>Mengaplikasi:</u><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.intiMengaplikasi) }} />
                <br /><br />
                <u>Merefleksi:</u><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.intiMerefleksi) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>PENUTUP</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.kegiatanPenutup) }} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Assessment Table */}
        <table className="output-table w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <th rowSpan={3} className="align-middle text-center w-1/4 p-3 border border-gray-400 bg-blue-800 text-white">
                Asesmen Pembelajaran
              </th>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Asesmen pada Awal Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.asesmenAwal) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Asesmen pada Proses Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.asesmenProses) }} />
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">
                <strong>Asesmen pada Akhir Pembelajaran:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: formatText(data.asesmenAkhir) }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};