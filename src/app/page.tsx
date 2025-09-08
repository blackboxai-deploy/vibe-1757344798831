"use client";

import React, { useState } from "react";
import { RPPMForm } from "@/components/RPPMForm";
import { RPPMOutput } from "@/components/RPPMOutput";
import { RPPMFormData, AIGeneratedContent, RPPMOutput as RPPMOutputType } from "@/types/rppm";

export default function Home() {
  const [outputData, setOutputData] = useState<RPPMOutputType | null>(null);

  const handleFormSubmit = (formData: RPPMFormData, generatedContent: AIGeneratedContent) => {
    const combinedData: RPPMOutputType = {
      ...formData,
      ...generatedContent
    };
    setOutputData(combinedData);
    
    // Scroll to output section
    setTimeout(() => {
      const outputSection = document.getElementById('output-section');
      if (outputSection) {
        outputSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setOutputData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 no-print">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI RPPM Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Isi data di bawah, dan biarkan AI menyusun detail RPPM untuk Anda.
          </p>
        </header>

        {/* Form Section */}
        {!outputData && (
          <RPPMForm onSubmit={handleFormSubmit} />
        )}

        {/* Output Section */}
        {outputData && (
          <>
            <div className="no-print text-center mb-6">
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors mr-4"
              >
                Buat RPPM Baru
              </button>
            </div>
            <RPPMOutput data={outputData} onPrint={handlePrint} />
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 no-print">
          <p className="text-gray-500 text-sm">
            © 2024 AI RPPM Generator. Powered by Google Gemini AI.
          </p>
        </footer>
      </div>
    </div>
  );
}