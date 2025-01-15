import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from "@/types/task"

interface DashboardOverviewProps {
  tasks: Task[]
}

export function DashboardOverview({ tasks }: DashboardOverviewProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === "Completed").length
  const inProgressTasks = tasks.filter(task => task.status === "In Progress").length
  const pendingTasks = tasks.filter(task => task.status === "Pending").length

  return (
    <>
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressTasks}</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingTasks}</div>
        </CardContent>
      </Card>
    </>
  )
}

