"use client";

import React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  id: string;
  templateName: string;
  scheduledTime: string;
  recipientCount: number;
  status: "pending" | "processing" | "completed" | "failed";
}

interface UpcomingSchedulesProps {
  schedules?: ScheduleItem[];
  className?: string;
}

export default function UpcomingSchedules({
  schedules = [
    {
      id: "1",
      templateName: "Weekly Newsletter",
      scheduledTime: "2023-10-15T09:00:00",
      recipientCount: 125,
      status: "pending",
    },
    {
      id: "2",
      templateName: "Promotional Offer",
      scheduledTime: "2023-10-16T14:30:00",
      recipientCount: 350,
      status: "pending",
    },
    {
      id: "3",
      templateName: "Event Reminder",
      scheduledTime: "2023-10-17T18:00:00",
      recipientCount: 78,
      status: "pending",
    },
    {
      id: "4",
      templateName: "Customer Survey",
      scheduledTime: "2023-10-18T10:15:00",
      recipientCount: 200,
      status: "pending",
    },
  ],
  className,
}: UpcomingSchedulesProps) {
  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className={cn("h-full bg-white dark:bg-gray-950", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Schedules</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View All
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No upcoming schedules
            </p>
          ) : (
            schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{schedule.templateName}</span>
                  <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{formatDate(schedule.scheduledTime)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>{schedule.recipientCount} recipients</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
