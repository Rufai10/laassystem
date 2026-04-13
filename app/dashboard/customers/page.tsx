"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Search, Filter, Plus, FileDown, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchCustomers } from "@/lib/api"

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCustomers()
        setCustomers(data)
      } catch (error) {
        console.error("Error fetching customers", error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <Users className="size-8 text-primary" />
            Customers
          </h1>
          <p className="text-muted-foreground font-medium">Manage your converted customers and accounts.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 font-bold border-2">
            <FileDown className="size-4" />
            Export
          </Button>
          <Button className="gap-2 font-black shadow-lg shadow-primary/20">
            <Plus className="size-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-primary/5 border-2 border-primary/10 flex flex-col gap-1">
          <span className="text-sm font-bold text-primary/60 uppercase tracking-wider">Total Customers</span>
          <span className="text-4xl font-black">{customers.length}</span>
        </div>
        <div className="p-6 rounded-3xl bg-green-500/5 border-2 border-green-500/10 flex flex-col gap-1">
          <span className="text-sm font-bold text-green-600/60 uppercase tracking-wider">Active Deals</span>
          <span className="text-4xl font-black">--</span>
        </div>
         <div className="p-6 rounded-3xl bg-amber-500/5 border-2 border-amber-500/10 flex flex-col gap-1">
          <span className="text-sm font-bold text-amber-600/60 uppercase tracking-wider">LTV (Avg)</span>
          <span className="text-4xl font-black">$45,000</span>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-zinc-200/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="p-6 border-b-2 border-zinc-200/50 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-zinc-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="pl-10 h-11 border-2 focus-visible:ring-primary rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-11 gap-2 font-bold border-2 rounded-xl">
              <Filter className="size-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-b-2">
              <TableHead className="font-bold text-zinc-900 h-12">Name</TableHead>
              <TableHead className="font-bold text-zinc-900 h-12">Company</TableHead>
              <TableHead className="font-bold text-zinc-900 h-12">Status</TableHead>
              <TableHead className="font-bold text-zinc-900 h-12">Value</TableHead>
              <TableHead className="font-bold text-zinc-900 h-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center font-bold text-muted-foreground">Loading customers...</TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center font-bold text-muted-foreground">No customers found.</TableCell>
              </TableRow>
            ) : (
              customers.map((customer: any) => (
                <TableRow key={customer.id} className="hover:bg-zinc-50/50 transition-colors">
                  <TableCell className="font-bold">{customer.name}</TableCell>
                  <TableCell className="font-medium text-muted-foreground">{customer.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="font-black text-primary">${customer.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-2">
                        <DropdownMenuLabel className="font-bold">Customer Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer font-medium">
                          <Plus className="mr-2 size-4 text-primary" /> Create New Deal
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer font-medium">
                          <FileDown className="mr-2 size-4" /> View History
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
