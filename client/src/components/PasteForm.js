"use client";

import { useState } from "react";

export default function PasteForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    content: "",
    ttl_seconds: "",
    max_views: "",
    allowedEmails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      content: formData.content,
      ttl_seconds: formData.ttl_seconds
        ? parseInt(formData.ttl_seconds)
        : undefined,
      max_views: formData.max_views ? parseInt(formData.max_views) : undefined,
      allowedEmails: formData.allowedEmails
        ? formData.allowedEmails
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email)
        : undefined,
    };

    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your text here..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="ttl_seconds"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Time to Live (Seconds)
            </label>
            <input
              type="number"
              id="ttl_seconds"
              name="ttl_seconds"
              value={formData.ttl_seconds}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave empty for no expiry"
            />
            <p className="mt-1 text-sm text-gray-500">
              Paste will expire after specified seconds
            </p>
          </div>

          <div>
            <label
              htmlFor="max_views"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Maximum Views
            </label>
            <input
              type="number"
              id="max_views"
              name="max_views"
              value={formData.max_views}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave empty for unlimited"
            />
            <p className="mt-1 text-sm text-gray-500">
              Paste will be deleted after reaching this limit
            </p>
          </div>
        </div>

        {/* <div>
          <label
            htmlFor="allowedEmails"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Private Access (Comma-separated emails)
          </label>
          <input
            type="text"
            id="allowedEmails"
            name="allowedEmails"
            value={formData.allowedEmails}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="friend1@example.com, friend2@example.com"
          />
          <p className="mt-1 text-sm text-gray-500">
            Only these emails can access the paste (leave empty for public)
          </p>
        </div> */}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Paste"}
          </button>
        </div>
      </form>
    </div>
  );
}
