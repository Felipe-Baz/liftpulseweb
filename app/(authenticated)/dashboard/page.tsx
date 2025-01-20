"use client"

import { useBranch } from '@/contexts/branch-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const { selectedBranch } = useBranch()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Selected Branch</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedBranch ? (
            <div>
              <p>Name: {selectedBranch.name}</p>
              <p>ID: {selectedBranch.id}</p>
              <p>Address: {selectedBranch.address}</p>
            </div>
          ) : (
            <p>No branch selected</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
