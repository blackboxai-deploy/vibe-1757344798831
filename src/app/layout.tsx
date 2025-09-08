import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "AI RPPM Generator",
  description: "Rencana Pelaksanaan Pembelajaran Mingguan (RPPM) Generator dengan AI - Isi data di bawah, dan biarkan AI menyusun detail RPPM untuk Anda.",
  keywords: ["RPPM", "Rencana Pembelajaran", "AI", "Pendidikan", "Indonesia", "Generator"],
  authors: [{ name: "AI RPPM Generator" }],
  viewport: "width=device-width, initial-scale=1.0"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden; }
              #output-section, #output-section * { visibility: visible; }
              #output-section { position: absolute; left: 0; top: 0; width: 100%; }
              .no-print { display: none !important; }
              .print-break { page-break-before: always; }
              .output-table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
              .output-table th, .output-table td { 
                border: 1px solid #9ca3af; 
                padding: 0.75rem; 
                text-align: left; 
                vertical-align: top; 
              }
              .output-table th { 
                background-color: #1e3a8a !important; 
                color: white !important; 
                font-weight: 600; 
                width: 25%; 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .output-table td { 
                background-color: #f9fafb !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          `
        }} />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}