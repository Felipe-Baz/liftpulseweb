"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Instructor as Instructor, InstructorGroup as InstructorGroup } from "@/types/instructor"

interface InstructorContextType {
  instructors: Instructor[]
  groups: InstructorGroup[]
  addInstructor: (instructor: Omit<Instructor, "id">) => void
  addGroup: (group: Omit<InstructorGroup, "id">) => void
  updateInstructor: (id: string, instructor: Partial<Instructor>) => void
  deleteInstructor: (id: string) => void
  deleteGroup: (id: string) => void
}

const InstructorContext = createContext<InstructorContextType | undefined>(undefined)

export function InstructorProvider({ children }: { children: ReactNode }) {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [groups, setGroups] = useState<InstructorGroup[]>([])

  const addInstructor = (instructor: Omit<Instructor, "id">) => {
    setInstructors([...instructors, { ...instructor, id: Math.random().toString(36).substr(2, 9) }])
  }

  const updateInstructor = (id: string, updatedInstructor: Partial<Instructor>) => {
    setInstructors(instructors.map((instructor) => (instructor.id === id ? { ...instructor, ...updatedInstructor } : instructor)))
  }

  const deleteInstructor = (id: string) => {
    setInstructors(instructors.filter((instructor) => instructor.id !== id))
  }

  const addGroup = (group: Omit<InstructorGroup, "id">) => {
    setGroups([...groups, { ...group, id: Math.random().toString(36).substr(2, 9) }])
  }

  const deleteGroup = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id))
  }

  return (
    <InstructorContext.Provider
      value={{
        instructors: instructors,
        groups,
        addInstructor: addInstructor,
        addGroup,
        updateInstructor: updateInstructor,
        deleteInstructor: deleteInstructor,
        deleteGroup,
      }}
    >
      {children}
    </InstructorContext.Provider>
  )
}

export function useInstructors() {
  const context = useContext(InstructorContext)
  if (context === undefined) {
    throw new Error("useInstructors must be used within a InstructorProvider")
  }
  return context
}

