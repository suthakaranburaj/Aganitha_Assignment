"use client";

import { useState } from "react";
import { createPaste } from "@/services/pasteService";
import PasteForm from "@/components/PasteForm";
import ResultDisplay from "@/components/ResultDisplay";

export default function HomePage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createPaste(formData);
      if (response.status) {
        setResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to create paste. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create a New Paste
        </h1>
        <p className="text-gray-600">
          Share code, text, or anything with a simple link
        </p>
      </div>

      {result ? (
        <ResultDisplay result={result} onReset={handleReset} />
      ) : (
        <PasteForm onSubmit={handleSubmit} loading={loading} error={error} />
      )}
    </div>
  );
}
