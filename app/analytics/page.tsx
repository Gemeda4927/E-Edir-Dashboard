"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'

const userActivityData = [
  { month: 'Jan', activeUsers: 300 },
  { month: 'Feb', activeUsers: 400 },
  { month: 'Mar', activeUsers: 500 },
  { month: 'Apr', activeUsers: 700 },
  { month: 'May', activeUsers: 600 },
  { month: 'Jun', activeUsers: 800 },
]

const edirPerformanceData = [
  { name: 'Community Edir', members: 50, events: 10, tasks: 25 },
  { name: 'Family Edir', members: 25, events: 5, tasks: 15 },
  { name: 'Neighborhood Edir', members: 75, events: 15, tasks: 40 },
  { name: 'Youth Edir', members: 40, events: 8, tasks: 20 },
]

const eventSuccessData = [
  { month: 'Jan', attendanceRate: 75 },
  { month: 'Feb', attendanceRate: 80 },
  { month: 'Mar', attendanceRate: 85 },
  { month: 'Apr', attendanceRate: 90 },
  { month: 'May', attendanceRate: 88 },
  { month: 'Jun', attendanceRate: 92 },
]

const taskCompletionData = [
  { month: 'Jan', completionRate: 70 },
  { month: 'Feb', completionRate: 75 },
  { month: 'Mar', completionRate: 80 },
  { month: 'Apr', completionRate: 85 },
  { month: 'May', completionRate: 82 },
  { month: 'Jun', completionRate: 88 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Tabs defaultValue="user-activity">
        <TabsList>
          <TabsTrigger value="user-activity">User Activity</TabsTrigger>
          <TabsTrigger value="edir-performance">Edir Performance</TabsTrigger>
          <TabsTrigger value="event-success">Event Success</TabsTrigger>
          <TabsTrigger value="task-completion">Task Completion</TabsTrigger>
        </TabsList>
        <TabsContent value="user-activity">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Monthly active users over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userActivityData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="activeUsers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="edir-performance">
          <Card>
            <CardHeader>
              <CardTitle>Edir Performance</CardTitle>
              <CardDescription>Comparison of members, events, and tasks across Edirs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={edirPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="members" fill="#8884d8" />
                  <Bar dataKey="events" fill="#82ca9d" />
                  <Bar dataKey="tasks" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="event-success">
          <Card>
            <CardHeader>
              <CardTitle>Event Success</CardTitle>
              <CardDescription>Monthly event attendance rate</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={eventSuccessData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendanceRate" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="task-completion">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>Monthly task completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={taskCompletionData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completionRate" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

