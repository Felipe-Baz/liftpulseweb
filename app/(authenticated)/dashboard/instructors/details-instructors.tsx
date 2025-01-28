'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface DetailsInstructorsProps {
  isOpen: boolean
  onClose: () => void
}

export function DetailsInstructors({ isOpen, onClose }: DetailsInstructorsProps) {
  // This would typically come from an API or database
  const instructor = {
    id: "1",
    nome: "felipe baz",
    email: "bundinha@gordao.com",
    imagem: "link",
    telefone: "029237263232",
    status: "active",
    groups: ["IT", "Management"],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instructor Details</DialogTitle>
          <DialogDescription>
            Detailed information about the instructor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Name:</h3>
            <p>{instructor.nome}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>{instructor.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <Badge variant={instructor.status === "active" ? "default" : "secondary"}>{instructor.status}</Badge>
          </div>
          <div>
            <h3 className="font-semibold">Groups:</h3>
            <div className="flex gap-1">
              {instructor.groups.map((group) => (
                <Badge key={group} variant="outline">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Phone:</h3>
            <p>{instructor.telefone}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
