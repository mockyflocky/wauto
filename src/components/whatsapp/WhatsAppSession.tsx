"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, MessageSquare, Users, Clock, LogOut } from "lucide-react";

interface SessionProps {
  session?: {
    id: string;
    name: string;
    connected: boolean;
    phoneNumber?: string;
    lastActive?: string;
  };
  onDisconnect?: () => void;
}

const WhatsAppSession = ({
  session = {
    id: "default-session",
    name: "WhatsApp User",
    connected: true,
    phoneNumber: "+1234567890",
    lastActive: new Date().toISOString(),
  },
  onDisconnect = () => {},
}: SessionProps) => {
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = () => {
    setDisconnecting(true);
    // Simulate API call to disconnect
    setTimeout(() => {
      setDisconnecting(false);
      if (onDisconnect) onDisconnect();
    }, 1000);
  };

  const formatLastActive = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return "Unknown";
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-slate-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Connected Device</CardTitle>
          <Badge variant={session.connected ? "success" : "destructive"}>
            {session.connected ? "Active" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription>
          Manage your connected WhatsApp session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{session.name}</p>
              <p className="text-sm text-muted-foreground">
                {session.phoneNumber || "No phone number"}
              </p>
            </div>
          </div>

          {session.lastActive && (
            <div className="flex items-start space-x-4">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Last Active</p>
                <p className="text-sm text-muted-foreground">
                  {formatLastActive(session.lastActive)}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-4">
            <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Messages</p>
              <p className="text-sm text-muted-foreground">
                Ready to send and receive
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Contacts</p>
              <p className="text-sm text-muted-foreground">
                Access to your WhatsApp contacts
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDisconnect}
          disabled={disconnecting}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {disconnecting ? "Disconnecting..." : "Disconnect WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppSession;
