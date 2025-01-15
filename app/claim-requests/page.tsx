"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search, MoreHorizontal, Check, X, Eye, MessageSquare, DollarSign } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "@/components/ui/toast"
import { useToast } from "@/lib/use-toast"

const newEdirRequests = [
  { id: 1, requester: "John Doe", edirName: "Community Support Edir", description: "For local community support", status: "Pending" },
  { id: 2, requester: "Jane Smith", edirName: "Education Fund Edir", description: "To support local students", status: "Approved" },
  { id: 3, requester: "Alice Johnson", edirName: "Healthcare Edir", description: "For medical emergencies", status: "Pending" },
  { id: 4, requester: "Bob Williams", edirName: "Small Business Edir", description: "To support local entrepreneurs", status: "Rejected" },
]

const fundRequests = [
  { id: 1, requester: "Mike Johnson", edirName: "Family Edir", amount: 500, reason: "Medical expenses", status: "Pending" },
  { id: 2, requester: "Sarah Brown", edirName: "Neighborhood Edir", amount: 1000, reason: "Home repair", status: "Approved" },
]

export default function ClaimRequestsPage() {
  const [openNewEdir, setOpenNewEdir] = useState(false)
  const [openFundRequest, setOpenFundRequest] = useState(false)
  const [newEdirRequest, setNewEdirRequest] = useState({ edirName: '', description: '' })
  const [newFundRequest, setNewFundRequest] = useState({ edirName: '', amount: '', reason: '' })
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [contactRequesterOpen, setContactRequesterOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const { toast, toasts } = useToast()

  const handleNewEdirSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New Edir request:', newEdirRequest)
    setOpenNewEdir(false)
    setNewEdirRequest({ edirName: '', description: '' })
    // Here you would typically send this data to your backend
  }

  const handleFundRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New fund request:', newFundRequest)
    setOpenFundRequest(false)
    setNewFundRequest({ edirName: '', amount: '', reason: '' })
    // Here you would typically send this data to your backend
  }

  const handleApprove = (id: number, type: 'edir' | 'fund') => {
    console.log(`Approving ${type} request with id: ${id}`);
    toast({
      title: "Request Approved",
      description: `The ${type} request has been approved successfully.`,
    })
  }

  const handleReject = (id: number, type: 'edir' | 'fund') => {
    console.log(`Rejecting ${type} request with id: ${id}`);
    toast({
      title: "Request Rejected",
      description: `The ${type} request has been rejected.`,
      variant: "destructive",
    })
  }

  const handleViewDetails = (request: any, type: 'edir' | 'fund') => {
    setSelectedRequest({ ...request, type })
    setViewDetailsOpen(true)
  }

  const handleContactRequester = (request: any, type: 'edir' | 'fund') => {
    setSelectedRequest({ ...request, type })
    setContactRequesterOpen(true)
  }

  const handleAdjustAmount = (id: number) => {
    console.log(`Adjusting amount for fund request with id: ${id}`);
    toast({
      title: "Amount Adjusted",
      description: "The fund request amount has been adjusted.",
    })
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Claim Requests Dashboard</h1>

        <Tabs defaultValue="new-edir" className="space-y-8">
          <TabsList className="bg-white bg-opacity-50 p-1 rounded-lg">
            <TabsTrigger value="new-edir" className="text-lg">New Edir Requests</TabsTrigger>
            <TabsTrigger value="fund-requests" className="text-lg">Fund Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-edir">
            <Card className="bg-white bg-opacity-90">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-semibold text-blue-800">New Edir Requests</CardTitle>
                  <Dialog open={openNewEdir} onOpenChange={setOpenNewEdir}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Edir Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>New Edir Request</DialogTitle>
                        <DialogDescription>
                          Submit a request to create a new Edir. This will be reviewed by a system admin.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleNewEdirSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edirName" className="text-right">
                              Edir Name
                            </Label>
                            <Input
                              id="edirName"
                              className="col-span-3"
                              value={newEdirRequest.edirName}
                              onChange={(e) => setNewEdirRequest({ ...newEdirRequest, edirName: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              className="col-span-3"
                              value={newEdirRequest.description}
                              onChange={(e) => setNewEdirRequest({ ...newEdirRequest, description: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Submit Request</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  Review and manage new Edir creation requests from users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Requester</TableHead>
                      <TableHead>Edir Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newEdirRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.requester}</TableCell>
                        <TableCell>{request.edirName}</TableCell>
                        <TableCell>{request.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(request.id, 'edir')}
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(request.id, 'edir')}
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleViewDetails(request, 'edir')}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleContactRequester(request, 'edir')}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Contact Requester
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fund-requests">
            <Card className="bg-white bg-opacity-90">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-semibold text-blue-800">Fund Requests</CardTitle>
                  <Dialog open={openFundRequest} onOpenChange={setOpenFundRequest}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Fund Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>New Fund Request</DialogTitle>
                        <DialogDescription>
                          Submit a request for funds from your Edir. This will be reviewed by the Edir admin.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleFundRequestSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edirName" className="text-right">
                              Edir Name
                            </Label>
                            <Input
                              id="edirName"
                              className="col-span-3"
                              value={newFundRequest.edirName}
                              onChange={(e) => setNewFundRequest({ ...newFundRequest, edirName: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                              Amount
                            </Label>
                            <Input
                              id="amount"
                              type="number"
                              className="col-span-3"
                              value={newFundRequest.amount}
                              onChange={(e) => setNewFundRequest({ ...newFundRequest, amount: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                              Reason
                            </Label>
                            <Textarea
                              id="reason"
                              className="col-span-3"
                              value={newFundRequest.reason}
                              onChange={(e) => setNewFundRequest({ ...newFundRequest, reason: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">Submit Request</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  Review and manage fund requests from Edir members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Requester</TableHead>
                      <TableHead>Edir Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fundRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.requester}</TableCell>
                        <TableCell>{request.edirName}</TableCell>
                        <TableCell>${request.amount}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(request.id, 'fund')}
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(request.id, 'fund')}
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleViewDetails(request, 'fund')}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleAdjustAmount(request.id)}>
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Adjust Amount
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleContactRequester(request, 'fund')}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Contact Requester
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedRequest?.type === 'edir' ? 'Edir Request Details' : 'Fund Request Details'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Requester</Label>
                <span className="col-span-3">{selectedRequest?.requester}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Edir Name</Label>
                <span className="col-span-3">{selectedRequest?.edirName}</span>
              </div>
              {selectedRequest?.type === 'edir' ? (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-bold">Description</Label>
                  <span className="col-span-3">{selectedRequest?.description}</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-bold">Amount</Label>
                    <span className="col-span-3">${selectedRequest?.amount}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-bold">Reason</Label>
                    <span className="col-span-3">{selectedRequest?.reason}</span>
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Status</Label>
                <span className="col-span-3">{selectedRequest?.status}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={contactRequesterOpen} onOpenChange={setContactRequesterOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Requester</DialogTitle>
              <DialogDescription>
                Send a message to {selectedRequest?.requester} regarding their {selectedRequest?.type} request.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle sending message here
              setContactRequesterOpen(false);
              toast({
                title: "Message Sent",
                description: `Your message has been sent to ${selectedRequest?.requester}.`,
              });
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    className="col-span-3"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Send Message</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {toasts.map((toast, index) => (
          <Toast key={index} variant={toast.variant as "default" | "destructive"}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        ))}
        <ToastViewport />
      </div>
    </ToastProvider>
  )
}

