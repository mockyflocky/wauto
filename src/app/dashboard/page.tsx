import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatsOverview from "@/components/dashboard/StatsOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingSchedules from "@/components/dashboard/UpcomingSchedules";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Last updated: Today at 10:30 AM
                </span>
              </div>
            </div>

            <StatsOverview />

            <QuickActions />

            <div className="grid gap-6 md:grid-cols-2">
              <RecentActivity />
              <UpcomingSchedules />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
