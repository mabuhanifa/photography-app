"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

interface UploadResponse {
  url: string;
  publicId: string;
}

async function uploadImage(formData: FormData): Promise<UploadResponse> {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload"}
    </button>
  );
}

export default function UploadPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await uploadImage(formData);
      setPreviewUrl(result.url);
    } catch (err) {
      setError("Failed to upload image");
    }
  };

  return (
    <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-md mt-40">
      <h1 className="text-2xl font-bold mb-4">Image Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block mb-1">
            Choose image to upload
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            required
            className="w-full"
          />
        </div>

        <SubmitButton />
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {previewUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Uploaded Image:</h2>
          <img src={previewUrl} alt="Uploaded" className="mt-2 max-w-xs" />
        </div>
      )}
    </div>
  );
}
