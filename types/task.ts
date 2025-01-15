export interface Task {
  id: number
  title: string
  assignee: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  category: string
}

