"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, DollarSign, FileText, Edit, Pause, Trash2 } from 'lucide-react'

// Mock data for a single Edir
const edirData = {
  id: 1,
  name: "Community Support Edir",
  members: 50,
  totalFunds: 10000,
  activeClaims: 3,
  description: "This Edir focuses on supporting community members during times of need.",
  memberList: [
    { id: 1, name: "John Doe", joinDate: "2023-01-15", totalContribution: 500 },
    { id: 2, name: "Jane Smith", joinDate: "2023-02-01", totalContribution: 450 },
    { id: 3, name: "Mike Johnson", joinDate: "2023-01-20", totalContribution: 600 },
  ],
  claims: [
    { id: 1, member: "John Doe", amount: 1000, reason: "Medical expenses", status: "Pending" },
    { id: 2, member: "Jane Smith", amount: 500, reason: "Home repair", status: "Approved" },
    { id: 3, member: "Mike Johnson", amount: 750, reason: "Education fees", status: "Under Review" },
  ]
}

export default function EdirDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('members')

  // In a real application, you would fetch the Edir data based on the ID
  // const edirId = params.id

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{edirData.name}</h1>
        <div className="space-x-2">
          <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="bg-amber-500 text-white hover:bg-amber-600">
            <Pause className="h-4 w-4 mr-2" />
            Suspend
          </Button>
          <Button variant="outline" className="bg-red-500 text-white hover:bg-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edir Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Members: {edirData.members}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Total Funds: ${edirData.totalFunds.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">Active Claims: {edirData.activeClaims}</span>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{edirData.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Edir Details</CardTitle>
            <div className="space-x-2">
              <Button 
                variant={activeTab === 'members' ? 'default' : 'outline'}
                onClick={() => setActiveTab('members')}
              >
                Members
              </Button>
              <Button 
                variant={activeTab === 'claims' ? 'default' : 'outline'}
                onClick={() => setActiveTab('claims')}
              >
                Claims
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'members' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Total Contribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {edirData.memberList.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>${member.totalContribution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {activeTab === 'claims' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {edirData.claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.member}</TableCell>
                    <TableCell>${claim.amount}</TableCell>
                    <TableCell>{claim.reason}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          claim.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {claim.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

