import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">⚡ BRAVO AI</h1>

      {/* Chat */}
      <div className="w-full max-w-3xl">
        <ChatWindow /> 
      </div>

    </main>
  );
}

