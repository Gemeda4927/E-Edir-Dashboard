"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Moon,
  Sun,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/DashboardOverview";
import { TaskCategoryPieChart } from "@/components/TaskCategoryPieChart";
import { Task } from "@/types/task"; // Updated import statement

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Prepare meeting agenda",
    assignee: "John Doe",
    dueDate: "2023-12-10",
    status: "In Progress",
    priority: "High",
    category: "Planning",
  },
  {
    id: 2,
    title: "Send invitations",
    assignee: "Jane Smith",
    dueDate: "2023-12-12",
    status: "Completed",
    priority: "Medium",
    category: "Communication",
  },
  {
    id: 3,
    title: "Book venue",
    assignee: "Mike Johnson",
    dueDate: "2023-12-15",
    status: "Pending",
    priority: "Low",
    category: "Logistics",
  },
  {
    id: 4,
    title: "Prepare presentation slides",
    assignee: "Emily Brown",
    dueDate: "2023-12-18",
    status: "In Progress",
    priority: "High",
    category: "Content Creation",
  },
  {
    id: 5,
    title: "Review project proposal",
    assignee: "David Lee",
    dueDate: "2023-12-20",
    status: "Pending",
    priority: "Medium",
    category: "Review",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] =
    useState("");
  const [
    isCreateDialogOpen,
    setIsCreateDialogOpen,
  ] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] =
    useState(false);
  const [newTask, setNewTask] = useState<
    Omit<Task, "id">
  >({
    title: "",
    assignee: "",
    dueDate: "",
    status: "Pending",
    priority: "Medium",
    category: "",
  });
  const [editingTask, setEditingTask] =
    useState<Task | null>(null);
  const [isDarkMode, setIsDarkMode] =
    useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in the project
    const isDark =
      document.documentElement.classList.contains(
        "dark"
      );
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle(
      "dark",
      newDarkMode
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.assignee
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleCreateTask = () => {
    setTasks([
      ...tasks,
      { ...newTask, id: tasks.length + 1 },
    ]);
    setNewTask({
      title: "",
      assignee: "",
      dueDate: "",
      status: "Pending",
      priority: "Medium",
      category: "",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? editingTask
            : task
        )
      );
      setIsEditDialogOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-200 ${
        isDarkMode
          ? "dark bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Task Management Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
            <Button
              onClick={() =>
                setIsCreateDialogOpen(true)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks">
              Tasks
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashboardOverview tasks={tasks} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Task Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskCategoryPieChart
                    tasks={tasks}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tasks
                      .slice(-5)
                      .reverse()
                      .map((task) => (
                        <li
                          key={task.id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {task.title}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              task.status ===
                              "Completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                : task.status ===
                                  "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                            }`}
                          >
                            {task.status}
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tasks">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Input
                  placeholder="Search tasks..."
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
              <Select
                value={searchTerm}
                onValueChange={(value) =>
                  setSearchTerm(value)
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">
                    All Categories
                  </SelectItem>
                  {Array.from(
                    new Set(
                      tasks.map(
                        (task) => task.category
                      )
                    )
                  ).map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Assignee
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Due Date
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Priority
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell>
                        {task.assignee}
                      </TableCell>
                      <TableCell>
                        {task.dueDate}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            task.status ===
                            "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : task.status ===
                                "In Progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            task.priority ===
                            "High"
                              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                              : task.priority ===
                                "Medium"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
                              : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        {task.category}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingTask(
                                task
                              );
                              setIsEditDialogOpen(
                                true
                              );
                            }}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDeleteTask(
                                task.id
                              )
                            }
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create New Task
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="title"
                  className="text-right"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="assignee"
                  className="text-right"
                >
                  Assignee
                </Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      assignee: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="dueDate"
                  className="text-right"
                >
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      dueDate: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="status"
                  className="text-right"
                >
                  Status
                </Label>
                <Select
                  value={newTask.status}
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,
                      status:
                        value as Task["status"],
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">
                      Pending
                    </SelectItem>
                    <SelectItem value="In Progress">
                      In Progress
                    </SelectItem>
                    <SelectItem value="Completed">
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="priority"
                  className="text-right"
                >
                  Priority
                </Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,
                      priority:
                        value as Task["priority"],
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      Low
                    </SelectItem>
                    <SelectItem value="Medium">
                      Medium
                    </SelectItem>
                    <SelectItem value="High">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="category"
                  className="text-right"
                >
                  Category
                </Label>
                <Input
                  id="category"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      category: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateTask}
              >
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-title"
                  className="text-right"
                >
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editingTask?.title || ""}
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            title: e.target.value,
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-assignee"
                  className="text-right"
                >
                  Assignee
                </Label>
                <Input
                  id="edit-assignee"
                  value={
                    editingTask?.assignee || ""
                  }
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            assignee:
                              e.target.value,
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-dueDate"
                  className="text-right"
                >
                  Due Date
                </Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={
                    editingTask?.dueDate || ""
                  }
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            dueDate:
                              e.target.value,
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-status"
                  className="text-right"
                >
                  Status
                </Label>
                <Select
                  value={
                    editingTask?.status || ""
                  }
                  onValueChange={(value) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            status:
                              value as Task["status"],
                          }
                        : null
                    )
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">
                      Pending
                    </SelectItem>
                    <SelectItem value="In Progress">
                      In Progress
                    </SelectItem>
                    <SelectItem value="Completed">
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-priority"
                  className="text-right"
                >
                  Priority
                </Label>
                <Select
                  value={
                    editingTask?.priority || ""
                  }
                  onValueChange={(value) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            priority:
                              value as Task["priority"],
                          }
                        : null
                    )
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      Low
                    </SelectItem>
                    <SelectItem value="Medium">
                      Medium
                    </SelectItem>
                    <SelectItem value="High">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-category"
                  className="text-right"
                >
                  Category
                </Label>
                <Input
                  id="edit-category"
                  value={
                    editingTask?.category || ""
                  }
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            category:
                              e.target.value,
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleEditTask}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
