import ViewPasteClient from "@/components/ViewPasteClient";

export default async function ViewPastePage({ params }) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/pastes/${id}`;

  let paste = null;
  let error = null;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status) {
        paste = data.data;
      } else {
        error = data.message || "Paste not found";
      }
    } else {
      error = "Paste not found";
    }
  } catch (err) {
    error = "Failed to load paste";
  }

  return <ViewPasteClient paste={paste} error={error} pasteId={id} />;
}
