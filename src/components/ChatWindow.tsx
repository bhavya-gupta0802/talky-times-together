import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  isOwn: boolean;
  reactions?: Array<{
    emoji: string;
    count: number;
    hasReacted: boolean;
  }>;
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey everyone! Welcome to our team chat. Feel free to share ideas and collaborate here! 🚀",
    sender: {
      id: "alice",
      name: "Alice Johnson",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false,
    reactions: [
      { emoji: "👍", count: 3, hasReacted: false },
      { emoji: "🎉", count: 1, hasReacted: true }
    ]
  },
  {
    id: "2",
    content: "Thanks Alice! Excited to work with everyone.",
    sender: {
      id: "bob",
      name: "Bob Smith",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 3300000),
    isOwn: false
  },
  {
    id: "3",
    content: "Same here! Looking forward to building something amazing together. Let me know if you need any help with the project setup.",
    sender: {
      id: "current",
      name: "You",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 3000000),
    isOwn: true
  },
  {
    id: "4",
    content: "Actually, I do have a question about the database schema. Can we discuss it?",
    sender: {
      id: "charlie",
      name: "Charlie Brown",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 2700000),
    isOwn: false,
    replyTo: {
      id: "3",
      content: "Let me know if you need any help with the project setup.",
      sender: "You"
    }
  },
  {
    id: "5",
    content: "Of course! Let's schedule a quick call to go over it. I'm free this afternoon.",
    sender: {
      id: "current",
      name: "You",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 2400000),
    isOwn: true
  },
  {
    id: "6",
    content: "Perfect! How about 3 PM? I'll send a calendar invite.",
    sender: {
      id: "charlie",
      name: "Charlie Brown",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 2100000),
    isOwn: false
  },
  {
    id: "7",
    content: "Sounds good to me! 👍",
    sender: {
      id: "current",
      name: "You",
      avatar: "/api/placeholder/32/32"
    },
    timestamp: new Date(Date.now() - 1800000),
    isOwn: true,
    reactions: [
      { emoji: "✅", count: 2, hasReacted: false }
    ]
  }
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: {
        id: "current",
        name: "You",
        avatar: "/api/placeholder/32/32"
      },
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-chat-bg">
      <ChatHeader 
        chatType="channel"
        chatName="general"
        memberCount={24}
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="py-4">
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6">
              <div className="px-4 py-1 bg-muted rounded-full">
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        placeholder="Message #general"
      />
    </div>
  );
}