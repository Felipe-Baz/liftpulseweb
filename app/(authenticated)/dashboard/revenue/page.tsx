"use client"

import { useBranch } from "@/contexts/branch-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data - In real app, fetch this based on selectedBranch.id
const revenueData = {
  totalRevenue: 125000,
  monthlyGrowth: 12.5,
  averageOrderValue: 89.99,
  transactions: [
    {
      id: 1,
      date: "2024-01-19",
      type: "Membership",
      amount: 99.99,
      status: "completed",
      customer: "John Doe",
    },
    {
      id: 2,
      date: "2024-01-19",
      type: "Product Sale",
      amount: 49.99,
      status: "completed",
      customer: "Jane Smith",
    },
    {
      id: 3,
      date: "2024-01-18",
      type: "Personal Training",
      amount: 150.00,
      status: "pending",
      customer: "Mike Johnson",
    },
    {
      id: 4,
      date: "2024-01-18",
      type: "Membership",
      amount: 199.99,
      status: "completed",
      customer: "Sarah Williams",
    },
  ],
}

export default function RevenuePage() {
  const { selectedBranch } = useBranch()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revenue</h1>
          <p className="text-muted-foreground">
            Financial overview for {selectedBranch?.name}
          </p>
        </div>
        <Select defaultValue="thisMonth">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="thisQuarter">This Quarter</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Current period</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${revenueData.totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-green-600">
              +{revenueData.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
            <CardDescription>Per transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${revenueData.averageOrderValue}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardDescription>Current period</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {revenueData.transactions.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

