"use client";

import { useEffect, useState } from "react";

interface Props {
  value?: string;
  onChange: (file: File) => void;
  setUploading?: (v: boolean) => void;
}

export const Uploader = ({ value, onChange, setUploading }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setLocalUploading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

  async function handleUpload(file: File) {
  try {
    // presigned URL olish
    const res = await fetch(`${API_URL}/api/files/upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
    });

    const data = await res.json();

    // Yandex Cloud ga yuklash
    await fetch(data.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });

    // DB ga saqlash
    await fetch(`${API_URL}/api/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: data.key, url: data.fileUrl, fileName: file.name, mimeType: file.type, size: file.size }),
    });

    return { url: data.fileUrl, key: data.key }; // parentga qaytarish
  } catch (err) {
    console.error(err);
    return null;
  }
}

  // 🧹 preview memory cleanup
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file); // ❗ faqat file yuborasiz
      }}
    />

      {(preview || value) && (
        <img src={preview || value} width={200} />
      )}

      {uploading && <p>Uploading...</p>}
    </div>
  );
};