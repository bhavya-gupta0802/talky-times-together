import { useState, useRef } from "react";
import { Send, Paperclip, Smile, Mic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, placeholder = "Type a message..." }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="p-4 bg-background border-t border-border">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary"
        >
          <Plus className="h-5 w-5" />
        </Button>

        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-muted/30 rounded-2xl border border-border focus-within:border-primary/50 transition-colors">
            <div className="flex-1 px-4 py-3">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="min-h-[20px] max-h-[120px] resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
              />
            </div>
            
            {/* Input Actions */}
            <div className="flex items-center gap-1 px-2 pb-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <Button
            onClick={handleSend}
            className="h-10 w-10 rounded-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "ghost"}
            size="icon"
            className={`h-10 w-10 rounded-full transition-all ${
              isRecording 
                ? "bg-destructive hover:bg-destructive/90" 
                : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
            }`}
          >
            <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
          </Button>
        )}
      </div>

      {/* Typing Indicator */}
      <div className="mt-2 px-3">
        <div className="flex items-center gap-2 text-xs text-chat-typing-indicator">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <span>Alice is typing...</span>
        </div>
      </div>
    </div>
  );
}