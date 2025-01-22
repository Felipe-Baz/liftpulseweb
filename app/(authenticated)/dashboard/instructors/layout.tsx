import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { InstructorProvider } from "@/contexts/instructor-context"

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <InstructorProvider>
        {children}
    </InstructorProvider>

  )
}

