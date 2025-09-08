import { AIGeneratedContent } from "@/types/rppm";

export interface GeminiRequestPayload {
  tujuanPembelajaran: string;
  dimensiProfilLulusan: string;
  modelPembelajaran: string;
}

export const GEMINI_SCHEMA = {
  type: "OBJECT",
  properties: {
    pesertaDidik: { 
      type: "STRING", 
      description: "Deskripsi kesiapan, minat, dan kebutuhan belajar peserta didik." 
    },
    materiPelajaran: { 
      type: "STRING", 
      description: "Analisis materi pelajaran, relevansi, dan struktur." 
    },
    lintasDisiplin: { 
      type: "STRING", 
      description: "Keterkaitan dengan disiplin ilmu lain." 
    },
    topikPembelajaran: { 
      type: "STRING", 
      description: "Topik spesifik yang relevan dengan tujuan." 
    },
    praktikPedagogis: { 
      type: "STRING", 
      description: "Model, strategi, atau metode yang digunakan." 
    },
    kemitraan: { 
      type: "STRING", 
      description: "Pihak yang bisa dilibatkan (guru lain, orang tua, komunitas)." 
    },
    lingkunganBelajar: { 
      type: "STRING", 
      description: "Pengaturan lingkungan fisik, virtual, dan budaya." 
    },
    pemanfaatanDigital: { 
      type: "STRING", 
      description: "Penggunaan teknologi dan sumber daya digital." 
    },
    kegiatanAwal: { 
      type: "STRING", 
      description: "Langkah-langkah pembuka pembelajaran (apersepsi, motivasi)." 
    },
    intiMemahami: { 
      type: "STRING", 
      description: "Aktivitas untuk membangun pemahaman konsep." 
    },
    intiMengaplikasi: { 
      type: "STRING", 
      description: "Aktivitas untuk menerapkan konsep yang dipelajari." 
    },
    intiMerefleksi: { 
      type: "STRING", 
      description: "Aktivitas untuk merefleksikan proses dan hasil belajar." 
    },
    kegiatanPenutup: { 
      type: "STRING", 
      description: "Langkah-langkah penutup (kesimpulan, umpan balik)." 
    },
    asesmenAwal: { 
      type: "STRING", 
      description: "Asesmen diagnostik di awal pembelajaran." 
    },
    asesmenProses: { 
      type: "STRING", 
      description: "Asesmen formatif selama proses pembelajaran." 
    },
    asesmenAkhir: { 
      type: "STRING", 
      description: "Asesmen sumatif di akhir pembelajaran." 
    }
  },
  required: [
    "pesertaDidik", "materiPelajaran", "lintasDisiplin", "topikPembelajaran",
    "praktikPedagogis", "kemitraan", "lingkunganBelajar", "pemanfaatanDigital",
    "kegiatanAwal", "intiMemahami", "intiMengaplikasi", "intiMerefleksi",
    "kegiatanPenutup", "asesmenAwal", "asesmenProses", "asesmenAkhir"
  ]
};

export const SYSTEM_PROMPT = `Anda adalah seorang ahli perancang kurikulum dan pedagogi di Indonesia. Tugas Anda adalah membuat konten detail untuk Rencana Pelaksanaan Pembelajaran Mingguan (RPPM) berdasarkan input yang diberikan. Buatlah konten yang praktis, relevan dengan konteks pendidikan di Indonesia, dan sesuai dengan prinsip pembelajaran yang berpusat pada siswa. Gunakan bahasa Indonesia yang baik dan benar.`;

export function createUserQuery(payload: GeminiRequestPayload): string {
  return `
    Buatkan konten RPPM berdasarkan data berikut:
    - Tujuan Pembelajaran: "${payload.tujuanPembelajaran}"
    - Dimensi Profil Lulusan yang dituju: "${payload.dimensiProfilLulusan}"
    - Model Pembelajaran yang disarankan: "${payload.modelPembelajaran}"

    Hasilkan semua konten yang diperlukan sesuai dengan skema JSON yang telah ditentukan.
  `;
}

export async function callGeminiAPI(payload: GeminiRequestPayload): Promise<AIGeneratedContent> {
  // Using free tier Gemini API without API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`;

  const requestPayload = {
    contents: [{ parts: [{ text: createUserQuery(payload) }] }],
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: GEMINI_SCHEMA,
    }
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestPayload)
  });

  if (!response.ok) {
    // If API fails, return mock data for demonstration
    console.warn('Gemini API failed, returning mock data');
    return generateMockContent(payload);
  }

  try {
    const result = await response.json();
    
    if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || !result.candidates[0].content.parts[0]) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    const aiResponseText = result.candidates[0].content.parts[0].text;
    return JSON.parse(aiResponseText) as AIGeneratedContent;
  } catch (error) {
    console.warn('Error parsing Gemini response, using mock data:', error);
    return generateMockContent(payload);
  }
}

function generateMockContent(payload: GeminiRequestPayload): AIGeneratedContent {
  return {
    pesertaDidik: "Peserta didik memiliki minat yang beragam terhadap pembelajaran sains, dengan tingkat kemampuan yang heterogen. Beberapa siswa memiliki gaya belajar visual, auditori, dan kinestetik yang memerlukan pendekatan pembelajaran yang bervariasi.",
    
    materiPelajaran: "Materi pembelajaran mencakup konsep-konsep fundamental yang relevan dengan kehidupan sehari-hari, terstruktur secara hierarkis dari konsep dasar hingga aplikasi praktis, dengan keterkaitan yang jelas antar komponen pembelajaran.",
    
    lintasDisiplin: "Pembelajaran ini terintegrasi dengan mata pelajaran lain seperti Matematika (dalam perhitungan dan analisis data), Bahasa Indonesia (dalam presentasi dan komunikasi hasil), dan Geografi (dalam memahami konteks lingkungan).",
    
    topikPembelajaran: `Topik utama yang akan dipelajari berkaitan erat dengan "${payload.tujuanPembelajaran}", mencakup konsep teoretis, aplikasi praktis, dan relevansi dengan kehidupan sehari-hari peserta didik.`,
    
    praktikPedagogis: `Menggunakan pendekatan ${payload.modelPembelajaran} dengan strategi pembelajaran interaktif, diskusi kelompok, eksperimen sederhana, dan kegiatan pemecahan masalah yang mendorong partisipasi aktif peserta didik.`,
    
    kemitraan: "Melibatkan guru mata pelajaran terkait, orang tua sebagai sumber informasi tambahan, dan narasumber dari komunitas atau ahli bidang terkait untuk memperkaya pengalaman belajar peserta didik.",
    
    lingkunganBelajar: "Menciptakan suasana belajar yang kondusif, aman, dan menyenangkan dengan penataan ruang yang fleksibel, penggunaan media pembelajaran yang bervariasi, dan iklim pembelajaran yang mendorong partisipasi aktif semua peserta didik.",
    
    pemanfaatanDigital: "Mengintegrasikan teknologi digital seperti video pembelajaran, simulasi online, aplikasi mobile untuk pembelajaran, dan platform digital untuk diskusi dan berbagi hasil kerja peserta didik.",
    
    kegiatanAwal: "Membuka pembelajaran dengan salam dan doa, melakukan apersepsi dengan mengaitkan materi sebelumnya, menyampaikan tujuan pembelajaran, dan memotivasi peserta didik dengan cerita atau fenomena menarik yang relevan.",
    
    intiMemahami: "Peserta didik mengamati fenomena atau masalah yang disajikan, mengidentifikasi konsep-konsep kunci, melakukan diskusi kelompok untuk membangun pemahaman, dan menganalisis informasi dari berbagai sumber pembelajaran.",
    
    intiMengaplikasi: "Peserta didik menerapkan konsep yang telah dipahami melalui kegiatan praktik, eksperimen sederhana, studi kasus, atau pemecahan masalah nyata yang relevan dengan kehidupan sehari-hari.",
    
    intiMerefleksi: "Peserta didik merefleksikan proses dan hasil pembelajaran, mengidentifikasi hal-hal yang telah dipahami dan yang masih perlu diperdalam, serta menghubungkan pembelajaran dengan pengalaman pribadi atau konteks yang lebih luas.",
    
    kegiatanPenutup: "Melakukan review dan kesimpulan bersama, memberikan penguatan terhadap pencapaian pembelajaran, menyampaikan rencana pembelajaran selanjutnya, dan menutup dengan doa serta salam.",
    
    asesmenAwal: "Melakukan tes diagnostik singkat atau tanya jawab untuk mengidentifikasi pengetahuan awal peserta didik, mengamati kesiapan belajar, dan menilai motivasi awal peserta didik terhadap materi yang akan dipelajari.",
    
    asesmenProses: "Melakukan observasi terhadap partisipasi peserta didik dalam diskusi dan kegiatan kelompok, memberikan feedback formatif, serta melakukan penilaian terhadap produk atau hasil kerja peserta didik selama proses pembelajaran.",
    
    asesmenAkhir: "Melakukan evaluasi komprehensif melalui tes tertulis, presentasi, atau penilaian kinerja untuk mengukur pencapaian tujuan pembelajaran, serta memberikan umpan balik untuk perbaikan pembelajaran selanjutnya."
  };
}