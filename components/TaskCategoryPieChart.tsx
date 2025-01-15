import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Task } from "@/types/task"
import { useTheme } from "next-themes"

interface TaskCategoryPieChartProps {
  tasks: Task[]
}

export function TaskCategoryPieChart({ tasks }: TaskCategoryPieChartProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const categoryCount = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(categoryCount).map(([name, value]) => ({ name, value }))

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', borderColor: isDarkMode ? '#4B5563' : '#E5E7EB' }} />
        <Legend formatter={(value) => <span style={{ color: isDarkMode ? '#D1D5DB' : '#374151' }}>{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}

