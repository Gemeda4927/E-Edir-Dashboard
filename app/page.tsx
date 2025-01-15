"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Users,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  TrendingUp,
  UserPlus,
  CalendarCheck,
  AlertCircle,
  DollarSign,
  FileCheck,
  FilePlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dashboardChartData = [
  { name: "Jan", users: 400, events: 24 },
  { name: "Feb", users: 300, events: 13 },
  { name: "Mar", users: 200, events: 18 },
  { name: "Apr", users: 278, events: 39 },
  { name: "May", users: 189, events: 48 },
  { name: "Jun", users: 239, events: 38 },
];

const pendingClaimRequests = [
  {
    id: 1,
    type: "new-edir",
    requester: "John Doe",
    edirName: "Community Support Edir",
    description: "For local community support",
  },
  {
    id: 2,
    type: "fund",
    requester: "Mike Johnson",
    edirName: "Family Edir",
    amount: 500,
    reason: "Medical expenses",
  },
  {
    id: 3,
    type: "new-edir",
    requester: "Sarah Brown",
    edirName: "Education Fund Edir",
    description: "To support local students",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          Dashboard
        </h1>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-600/50">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Edir
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
            <CardTitle className="text-sm font-medium">
              Total Edirs
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">
              25
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <UserPlus className="h-3 w-3 text-emerald-500 mr-1" />
              2 new this month
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-500/10 to-purple-600/5">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">
              12
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <CalendarCheck className="h-3 w-3 text-purple-500 mr-1" />
              3 this week
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/10 to-amber-600/5">
            <CardTitle className="text-sm font-medium">
              Pending Tasks
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">
              8
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
              2 due today
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/10 to-green-600/5">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">
              $12,345
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={dashboardChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="name"
                stroke="var(--foreground)"
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="var(--foreground)"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--foreground)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="users"
                fill="hsl(215, 100%, 50%)"
                name="Active Users"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="events"
                fill="hsl(280, 100%, 50%)"
                name="Events"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <FileText className="h-5 w-5 text-amber-500 mr-2" />
            Pending Claim Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Requester
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Details
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingClaimRequests.map(
                  (request) => (
                    <tr
                      key={request.id}
                      className="border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 flex items-center">
                        {request.type ===
                        "new-edir" ? (
                          <FilePlus className="h-4 w-4 text-blue-500 mr-2" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        {request.type ===
                        "new-edir"
                          ? "New Edir"
                          : "Fund Request"}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {request.requester}
                      </td>
                      <td className="py-3 px-4">
                        {request.type ===
                        "new-edir"
                          ? `${request.edirName}: ${request.description}`
                          : `${request.edirName}: $${request.amount} for ${request.reason}`}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-amber-500 hover:text-white transition-colors"
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-600/50">
          <CalendarDays className="mr-2 h-4 w-4" />
          Create Event
        </Button>
        <Button
          variant="outline"
          className="bg-background text-foreground hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-amber-500/50"
        >
          <ClipboardList className="mr-2 h-4 w-4" />
          Assign Task
        </Button>
      </div>
    </div>
  );
}
