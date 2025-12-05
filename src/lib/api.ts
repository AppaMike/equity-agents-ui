const API_URL = "https://equity-opal-agents.onrender.com";

export async function sendMessage(message: string) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    return data; // { response: "texto del agente" }
    
  } catch (error) {
    console.error("Error al llamar al backend:", error);
    return { error: "No se pudo conectar con el servidor." };
  }
}
