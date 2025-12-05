import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // ✅ sin /chat

export const sendMessage = async (message: string) => {
  const payload = {
    message,        // ✅ no "text"
    session_id: "demo",
  };

  try {
    const res = await axios.post(`${API_URL}/chat`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Error conectando al backend:", err);
    return { error: "Backend no disponible" };
  }
};
