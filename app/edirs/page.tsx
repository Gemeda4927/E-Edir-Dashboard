"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock data for Edirs
const edirs = [
  { id: 1, name: "Community Support Edir", members: 50, totalFunds: 10000, activeClaims: 3 },
  { id: 2, name: "Family Welfare Edir", members: 30, totalFunds: 5000, activeClaims: 1 },
  { id: 3, name: "Neighborhood Development Edir", members: 75, totalFunds: 15000, activeClaims: 5 },
  { id: 4, name: "Youth Empowerment Edir", members: 40, totalFunds: 7500, activeClaims: 2 },
]

export default function EdirsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEdirs = edirs.filter(edir => 
    edir.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edirs</h1>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-600/50">
          Create New Edir
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search edirs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEdirs.map((edir) => (
          <Link href={`/edirs/${edir.id}`} key={edir.id}>
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
                <CardTitle className="text-lg font-semibold">{edir.name}</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Members:</span>
                  <span className="font-semibold">{edir.members}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Funds:</span>
                  <span className="font-semibold">${edir.totalFunds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Claims:</span>
                  <span className="font-semibold text-amber-500">{edir.activeClaims}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

