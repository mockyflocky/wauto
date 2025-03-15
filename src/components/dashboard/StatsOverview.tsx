import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  CheckCircle,
  BarChart,
  Zap,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <Card className={cn("bg-white dark:bg-slate-950", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`mt-1 flex items-center text-xs ${change.positive ? "text-green-500" : "text-red-500"}`}
          >
            {change.positive ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface StatsOverviewProps {
  stats?: {
    totalMessages: string;
    deliveryRate: string;
    engagementRate: string;
    activeAutomations: string;
  };
  changes?: {
    totalMessages: { value: string; positive: boolean };
    deliveryRate: { value: string; positive: boolean };
    engagementRate: { value: string; positive: boolean };
    activeAutomations: { value: string; positive: boolean };
  };
}

const StatsOverview = ({
  stats = {
    totalMessages: "12,543",
    deliveryRate: "98.7%",
    engagementRate: "24.3%",
    activeAutomations: "8",
  },
  changes = {
    totalMessages: { value: "12% from last month", positive: true },
    deliveryRate: { value: "1.2% from last month", positive: true },
    engagementRate: { value: "0.8% from last month", positive: false },
    activeAutomations: { value: "2 more than last month", positive: true },
  },
}: StatsOverviewProps) => {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold">Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Messages Sent"
          value={stats.totalMessages}
          change={changes.totalMessages}
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <StatCard
          title="Delivery Rate"
          value={stats.deliveryRate}
          change={changes.deliveryRate}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatCard
          title="Engagement Rate"
          value={stats.engagementRate}
          change={changes.engagementRate}
          icon={<BarChart className="h-5 w-5" />}
        />
        <StatCard
          title="Active Automations"
          value={stats.activeAutomations}
          change={changes.activeAutomations}
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};

export default StatsOverview;
