import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import QRScanner from "@/components/whatsapp/QRScanner";
import WhatsAppSession from "@/components/whatsapp/WhatsAppSession";
import MessageTemplate from "@/components/whatsapp/MessageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhatsAppPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                WhatsApp Automation
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Connect your WhatsApp account to start automating messages
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <QRScanner />
                <WhatsAppSession />
              </div>

              <div className="space-y-6">
                <Card className="bg-white dark:bg-slate-950">
                  <CardHeader>
                    <CardTitle>Message Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <MessageTemplate />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
