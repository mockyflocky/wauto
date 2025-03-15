"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

interface QRScannerProps {
  onQRScanned?: (sessionData: any) => void;
}

const QRScanner = ({ onQRScanned = () => {} }: QRScannerProps) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "connected" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const generateQRCode = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // In a real implementation, this would call your backend API
      // to initiate a WhatsApp Web session and get a QR code
      setTimeout(() => {
        // Simulating QR code data (in production, this would come from your backend)
        const mockQRData =
          "data:image/png;base64,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";
        setQrCode(mockQRData);
        setStatus("idle");
      }, 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to generate QR code. Please try again.");
      console.error("Error generating QR code:", error);
    }
  };

  const simulateConnection = () => {
    setStatus("connected");
    if (onQRScanned) {
      onQRScanned({
        id: "mock-session-" + Math.random().toString(36).substring(7),
        name: "WhatsApp User",
        connected: true,
      });
    }
  };

  useEffect(() => {
    generateQRCode();
    // In a real implementation, you would set up a listener for WhatsApp connection events
    return () => {
      // Cleanup any listeners or connections
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-950">
      <CardHeader>
        <CardTitle>WhatsApp Connection</CardTitle>
        <CardDescription>
          Scan the QR code with your WhatsApp mobile app to connect
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Generating QR code...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-16 w-16 text-destructive" />
            <p className="mt-4 text-center text-sm text-destructive">
              {errorMessage}
            </p>
          </div>
        )}

        {status === "connected" && (
          <div className="flex flex-col items-center justify-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="mt-4 text-center text-sm font-medium text-green-500">
              WhatsApp connected successfully!
            </p>
          </div>
        )}

        {status === "idle" && qrCode && (
          <div className="flex flex-col items-center">
            {/* For demo purposes, clicking the QR code will simulate a successful connection */}
            <div
              className="cursor-pointer border-8 border-white dark:border-slate-800 rounded-lg overflow-hidden"
              onClick={simulateConnection}
              title="Click to simulate connection (in real app, scan with WhatsApp)"
            >
              <img src={qrCode} alt="WhatsApp QR Code" className="w-64 h-64" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              (Click QR to simulate connection)
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={generateQRCode}
          disabled={status === "loading" || status === "connected"}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh QR
        </Button>
        {status === "connected" && (
          <Button variant="default">Continue to Dashboard</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QRScanner;
