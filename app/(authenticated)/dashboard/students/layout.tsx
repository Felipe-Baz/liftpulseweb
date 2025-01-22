import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { StudentProvider } from "@/contexts/student-context"

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StudentProvider>
        {children}
    </StudentProvider>

  )
}

