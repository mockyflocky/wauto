import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MessageSquare, Calendar, Zap, Send } from "lucide-react";

interface QuickActionProps {
  actions?: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }[];
}

const QuickActions = ({ actions }: QuickActionProps) => {
  // Default actions if none provided
  const defaultActions = [
    {
      icon: <PlusCircle className="h-5 w-5" />,
      label: "New Template",
      onClick: () => console.log("Create new template"),
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Connect WhatsApp",
      onClick: () => (window.location.href = "/dashboard/whatsapp"),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      onClick: () => console.log("Create schedule"),
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "New Automation",
      onClick: () => console.log("Create automation"),
    },
    {
      icon: <Send className="h-5 w-5" />,
      label: "Broadcast",
      onClick: () => console.log("Create broadcast"),
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <Card className="w-full bg-white dark:bg-slate-950">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Quick Actions</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          {displayActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center gap-2 h-10"
              onClick={action.onClick}
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
