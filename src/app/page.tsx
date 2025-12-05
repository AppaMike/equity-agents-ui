import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D0F] text-white px-4">
      
      {/* Encabezado BRAVO */}
      <div className="w-full max-w-3xl py-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Bravo</h1>
        <p className="text-gray-400 text-sm">
          Asistente inteligente para soporte técnico, inventarios y dealers.
        </p>
      </div>

      {/* Chat */}
      <div className="w-full max-w-3xl">
        <ChatWindow agentName="Bravo" />
      </div>

    </main>
  );
}
