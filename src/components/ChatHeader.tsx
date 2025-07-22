import { Hash, Users, Search, Phone, Video, Info, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  chatType: "channel" | "dm";
  chatName: string;
  memberCount?: number;
  isOnline?: boolean;
  avatar?: string;
}

export function ChatHeader({ 
  chatType, 
  chatName, 
  memberCount, 
  isOnline, 
  avatar 
}: ChatHeaderProps) {
  return (
    <div className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {chatType === "channel" ? (
          <>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{chatName}</h2>
              {memberCount && (
                <p className="text-sm text-muted-foreground">
                  {memberCount} member{memberCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatar} />
                <AvatarFallback>{chatName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-chat-online-status border-2 border-background rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{chatName}</h2>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-chat-online-status' : 'bg-muted-foreground'}`}></div>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Active now' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-1">
        {chatType === "channel" && (
          <>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Users className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {chatType === "dm" && (
          <>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Video className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}