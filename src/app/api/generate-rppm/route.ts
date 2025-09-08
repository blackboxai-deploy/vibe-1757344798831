import { NextRequest, NextResponse } from 'next/server';
import { callGeminiAPI, GeminiRequestPayload } from '@/lib/gemini';
import { APIResponse } from '@/types/rppm';

export async function POST(request: NextRequest) {
  try {
    const body: GeminiRequestPayload = await request.json();
    
    // Validate required fields
    if (!body.tujuanPembelajaran?.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Tujuan pembelajaran harus diisi'
      } as APIResponse, { status: 400 });
    }

    if (!body.dimensiProfilLulusan?.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Dimensi profil lulusan harus dipilih'
      } as APIResponse, { status: 400 });
    }

    // Call Gemini API
    const generatedContent = await callGeminiAPI(body);

    return NextResponse.json({
      success: true,
      data: generatedContent
    } as APIResponse);

  } catch (error) {
    console.error('Error generating RPPM:', error);
    
    let errorMessage = 'Terjadi kesalahan internal server';
    
    if (error instanceof Error) {
      if (error.message.includes('API Error')) {
        errorMessage = 'Terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi.';
      } else if (error.message.includes('Invalid response')) {
        errorMessage = 'Respons AI tidak valid. Silakan coba lagi.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage
    } as APIResponse, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method GET tidak didukung. Gunakan POST.'
  } as APIResponse, { status: 405 });
}