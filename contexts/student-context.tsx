"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Student, StudentGroup } from "@/types/student"

interface StudentContextType {
  students: Student[]
  groups: StudentGroup[]
  addStudent: (student: Omit<Student, "id">) => void
  addGroup: (group: Omit<StudentGroup, "id">) => void
  updateStudent: (id: string, student: Partial<Student>) => void
  deleteStudent: (id: string) => void
  deleteGroup: (id: string) => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])
  const [groups, setGroups] = useState<StudentGroup[]>([])

  const addStudent = (student: Omit<Student, "id">) => {
    setStudents([...students, { ...student, id: Math.random().toString(36).substr(2, 9) }])
  }

  const updateStudent = (id: string, updatedStudent: Partial<Student>) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, ...updatedStudent } : student)))
  }

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const addGroup = (group: Omit<StudentGroup, "id">) => {
    setGroups([...groups, { ...group, id: Math.random().toString(36).substr(2, 9) }])
  }

  const deleteGroup = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id))
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        groups,
        addStudent,
        addGroup,
        updateStudent,
        deleteStudent,
        deleteGroup,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider")
  }
  return context
}

