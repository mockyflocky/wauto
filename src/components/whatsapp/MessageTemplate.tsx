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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Copy, Send } from "lucide-react";

interface MessageTemplateProps {
  template?: {
    id: string;
    name: string;
    content: string;
    variables: string[];
    createdAt: string;
    lastUsed?: string;
  };
  onEdit?: (template: any) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (template: any) => void;
  onSend?: (template: any, variables: Record<string, string>) => void;
}

const MessageTemplate = ({
  template = {
    id: "template-1",
    name: "Welcome Message",
    content:
      "Hello {{name}}, welcome to our service! Your appointment is scheduled for {{date}}.",
    variables: ["name", "date"],
    createdAt: new Date().toISOString(),
  },
  onEdit = () => {},
  onDelete = () => {},
  onDuplicate = () => {},
  onSend = () => {},
}: MessageTemplateProps) => {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    template.variables.reduce(
      (acc, variable) => {
        acc[variable] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const [previewMode, setPreviewMode] = useState(false);
  const [sending, setSending] = useState(false);

  const handleVariableChange = (variable: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variable]: value,
    }));
  };

  const getPreviewContent = () => {
    let preview = template.content;
    Object.entries(variableValues).forEach(([variable, value]) => {
      const regex = new RegExp(`\{\{${variable}\}\}`, "g");
      preview = preview.replace(regex, value || `[${variable}]`);
    });
    return preview;
  };

  const handleSend = () => {
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      onSend(template, variableValues);
      setSending(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return "Unknown";
    }
  };

  const allVariablesFilled = Object.values(variableValues).every(
    (value) => value.trim() !== "",
  );

  return (
    <Card className="w-full bg-white dark:bg-slate-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{template.name}</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(template)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDuplicate(template)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(template.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Created on {formatDate(template.createdAt)}
          {template.lastUsed &&
            ` • Last used on ${formatDate(template.lastUsed)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Template Content</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? "Edit Variables" : "Preview"}
              </Button>
            </div>

            {previewMode ? (
              <div className="p-3 border rounded-md bg-muted/30 whitespace-pre-wrap">
                {getPreviewContent()}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 border rounded-md bg-muted/30 whitespace-pre-wrap">
                  {template.content}
                </div>

                <div className="space-y-3 mt-4">
                  <Label>Variables</Label>
                  {template.variables.map((variable) => (
                    <div key={variable} className="space-y-1">
                      <Label
                        htmlFor={`var-${variable}`}
                        className="text-xs font-normal text-muted-foreground"
                      >
                        {variable}
                      </Label>
                      <Input
                        id={`var-${variable}`}
                        placeholder={`Enter ${variable}`}
                        value={variableValues[variable]}
                        onChange={(e) =>
                          handleVariableChange(variable, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSend}
          disabled={!allVariablesFilled || sending}
        >
          <Send className="mr-2 h-4 w-4" />
          {sending ? "Sending..." : "Send Message"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageTemplate;
