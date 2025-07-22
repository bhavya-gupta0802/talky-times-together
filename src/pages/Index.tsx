import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { AuthModal } from "@/components/AuthModal";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthModal onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-chat-bg">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default Index;
