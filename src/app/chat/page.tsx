import Chatbot from "@/components/Chatbot";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-tg pt-28 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8 space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider">
          Digital <span className="text-neo-cyan">Assistant</span>
        </h1>
        <p className="text-text-mid font-body text-lg max-w-2xl mx-auto">
          State the nature of your inquiry. Our AI is trained to guide you through incident reporting, evidence collection, and cyber safety protocols.
        </p>
      </div>
      
      <Chatbot />
    </div>
  );
}
