"use client";

import { useState } from "react";

export default function ResultDisplay({ result, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paste Created Successfully!
        </h2>
        <p className="text-gray-600">
          Your paste is now available at the following URL
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Share this URL:
        </label>
        <div className="flex">
          <input
            type="text"
            readOnly
            value={result.url}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-2">Paste Information</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Paste ID:</span>
            <span className="font-mono">{result.id}</span>
          </li>
          <li className="flex justify-between">
            <span>Direct API URL:</span>
            <span className="font-mono">
              {result.url.replace("/p/", "/api/pastes/")}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          View Paste
        </a>
        <button
          onClick={onReset}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Another
        </button>
      </div>
    </div>
  );
}
