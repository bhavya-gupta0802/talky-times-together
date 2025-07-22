import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Reply, Heart, Copy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`group flex gap-3 px-6 py-2 hover:bg-chat-message-hover transition-colors ${
        message.isOwn ? "flex-row-reverse" : "flex-row"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!message.isOwn && (
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>
            {message.sender.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex-1 max-w-md ${message.isOwn ? "flex flex-col items-end" : ""}`}>
        {!message.isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">
              {message.sender.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
          </div>
        )}

        {message.replyTo && (
          <div className={`mb-2 p-2 rounded-lg bg-muted/50 border-l-4 ${
            message.isOwn ? "border-l-primary/30" : "border-l-muted-foreground/30"
          }`}>
            <p className="text-xs text-muted-foreground mb-1">
              Replying to {message.replyTo.sender}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {message.replyTo.content}
            </p>
          </div>
        )}

        <div className="relative">
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-message transition-all duration-200 ${
              message.isOwn
                ? "bg-gradient-message text-chat-message-sent-foreground"
                : "bg-chat-message-received text-chat-message-received-foreground border border-border"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
            
            {message.isOwn && (
              <div className="flex items-center justify-end mt-1 gap-1">
                <span className="text-xs text-chat-message-sent-foreground/70">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
              </div>
            )}
          </div>

          {/* Message Actions */}
          {showActions && (
            <div className={`absolute top-0 flex items-center gap-1 transition-opacity duration-200 ${
              message.isOwn ? "-left-20" : "-right-20"
            }`}>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 bg-background border shadow-sm hover:bg-muted"
              >
                <Reply className="h-3 w-3" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 bg-background border shadow-sm hover:bg-muted"
              >
                <Heart className="h-3 w-3" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 bg-background border shadow-sm hover:bg-muted"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 bg-background border shadow-sm hover:bg-muted"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <button
                key={index}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                  reaction.hasReacted
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {message.isOwn && (
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback>YU</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}