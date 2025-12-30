"use client";

import { useState } from "react";

export default function ViewPasteClient({ paste, error, pasteId }) {
  const [email, setEmail] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [pasteData, setPasteData] = useState(paste);
  const [loading, setLoading] = useState(false);

  // Check if this is a private paste (would need backend implementation)
  // For now, we'll just show the content if available

  if (error && !pasteData) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Paste Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          This paste may have expired, reached its view limit, or never existed.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Paste
        </a>
      </div>
    );
  }

  if (!pasteData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Paste Content</h1>
          <a href="/" className="text-sm text-blue-600 hover:text-blue-800">
            ← Create New
          </a>
        </div>

        <div className="bg-gray-50 rounded-md p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {pasteData.remaining_views !== null && (
              <div>
                <span className="text-gray-500">Remaining Views:</span>
                <span className="ml-2 font-medium">
                  {pasteData.remaining_views}
                </span>
              </div>
            )}
            {pasteData.expires_at && (
              <div>
                <span className="text-gray-500">Expires:</span>
                <span className="ml-2 font-medium">
                  {new Date(pasteData.expires_at).toLocaleString()}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-500">Paste ID:</span>
              <span className="ml-2 font-mono font-medium">{pasteId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
          {pasteData.content}
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(pasteData.content)}
          className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Copy
        </button>
      </div>

      {isPrivate && (
        <div className="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
          <h3 className="font-medium text-yellow-800 mb-2">
            Private Paste Access
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            This paste is private. Please enter the email that was given access.
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Access"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
