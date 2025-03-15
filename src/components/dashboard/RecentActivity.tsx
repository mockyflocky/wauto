import React from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type ActivityStatus = "delivered" | "pending" | "failed" | "sending";

interface ActivityItem {
  id: string;
  templateName: string;
  recipients: number;
  timestamp: string;
  status: ActivityStatus;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  className?: string;
}

const getStatusIcon = (status: ActivityStatus) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "failed":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "sending":
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
  }
};

const getStatusText = (status: ActivityStatus) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    case "sending":
      return "Sending";
  }
};

const RecentActivity = ({
  activities = defaultActivities,
  className,
}: RecentActivityProps) => {
  return (
    <Card className={`h-full bg-white dark:bg-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[320px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{activity.templateName}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.recipients} recipient
                  {activity.recipients !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {activity.timestamp}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(activity.status)}
                <span className="text-xs font-medium">
                  {getStatusText(activity.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    templateName: "Monthly Newsletter",
    recipients: 245,
    timestamp: "Today, 10:30 AM",
    status: "delivered",
  },
  {
    id: "2",
    templateName: "Product Announcement",
    recipients: 112,
    timestamp: "Today, 9:15 AM",
    status: "sending",
  },
  {
    id: "3",
    templateName: "Appointment Reminder",
    recipients: 58,
    timestamp: "Yesterday, 4:45 PM",
    status: "failed",
  },
  {
    id: "4",
    templateName: "Welcome Message",
    recipients: 24,
    timestamp: "Yesterday, 2:30 PM",
    status: "delivered",
  },
  {
    id: "5",
    templateName: "Special Offer",
    recipients: 189,
    timestamp: "Yesterday, 11:20 AM",
    status: "pending",
  },
  {
    id: "6",
    templateName: "Event Invitation",
    recipients: 76,
    timestamp: "2 days ago, 3:15 PM",
    status: "delivered",
  },
];

export default RecentActivity;
