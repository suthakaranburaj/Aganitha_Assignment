const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const createPaste = async (pasteData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE_URL}/api/pastes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(pasteData),
    });

    return await response.json();
  } catch (error) {
    return {
      status: false,
      message: "Network error. Please check your connection.",
    };
  }
};

export const getPaste = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pastes/${id}`);
    return await response.json();
  } catch (error) {
    return {
      status: false,
      message: "Failed to fetch paste",
    };
  }
};

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/healthz`);
    return await response.json();
  } catch (error) {
    return {
      status: false,
      message: "Service unavailable",
    };
  }
};
