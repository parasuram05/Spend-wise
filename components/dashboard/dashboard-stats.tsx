"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Receipt, Calendar } from "lucide-react";

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  categories: { name: string; color: string } | null;
}

interface DashboardStatsProps {
  expenses: Expense[];
}

export function DashboardStats({ expenses }: DashboardStatsProps) {
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const averagePerDay = expenses.length > 0 
    ? totalSpent / new Set(expenses.map(e => e.date)).size 
    : 0;
  const transactionCount = expenses.length;
  
  // Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const stats = [
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      description: `In ${currentMonth}`,
      icon: DollarSign,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Average per Day",
      value: `$${averagePerDay.toFixed(2)}`,
      description: "Daily spending",
      icon: TrendingUp,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Transactions",
      value: transactionCount.toString(),
      description: "This month",
      icon: Receipt,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Days Tracked",
      value: new Set(expenses.map(e => e.date)).size.toString(),
      description: "Active days",
      icon: Calendar,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
