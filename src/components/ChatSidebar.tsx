import { useState } from "react";
import { Search, Plus, MoreVertical, Users, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  unreadCount?: number;
  isActive?: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/api/placeholder/32/32",
    isOnline: true,
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m",
    unreadCount: 2
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/api/placeholder/32/32",
    isOnline: false,
    lastMessage: "Thanks for the help!",
    timestamp: "1h"
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "/api/placeholder/32/32",
    isOnline: true,
    lastMessage: "See you tomorrow",
    timestamp: "3h"
  }
];

const mockChannels: Channel[] = [
  { id: "general", name: "general", type: "channel", isActive: true, unreadCount: 5 },
  { id: "random", name: "random", type: "channel" },
  { id: "dev-team", name: "dev-team", type: "channel", unreadCount: 1 }
];

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"channels" | "dms">("channels");

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChannels = mockChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-chat-sidebar border-r border-border flex flex-col h-full shadow-sidebar">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">ChatApp</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("channels")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "channels"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Hash className="h-4 w-4" />
            Channels
          </div>
        </button>
        <button
          onClick={() => setActiveTab("dms")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "dms"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="h-4 w-4" />
            Messages
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "channels" && (
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">CHANNELS</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {filteredChannels.map((channel) => (
              <button
                key={channel.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                  channel.isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-chat-message-hover text-foreground"
                }`}
              >
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium">{channel.name}</span>
                {channel.unreadCount && (
                  <Badge variant="default" className="h-5 px-2 text-xs bg-primary">
                    {channel.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === "dms" && (
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">DIRECT MESSAGES</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-chat-message-hover mb-1"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-chat-online-status border-2 border-background rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </span>
                    {user.timestamp && (
                      <span className="text-xs text-muted-foreground">{user.timestamp}</span>
                    )}
                  </div>
                  {user.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {user.lastMessage}
                    </p>
                  )}
                </div>
                {user.unreadCount && (
                  <Badge variant="default" className="h-5 px-2 text-xs bg-primary">
                    {user.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-chat-online-status border-2 border-background rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Your Name</p>
            <p className="text-xs text-chat-online-status">Online</p>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}