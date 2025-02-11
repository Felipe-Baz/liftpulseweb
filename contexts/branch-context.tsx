"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Branch } from '@/types/branch'
import { fetchBranches } from '@/actions/branches'

interface BranchContextType {
  selectedBranch: Branch | null
  setSelectedBranch: (branch: Branch) => void
  branches: Branch[]
  isLoading: boolean
}

const BranchContext = createContext<BranchContextType>({
  selectedBranch: null,
  setSelectedBranch: () => {},
  branches: [],
  isLoading: true,
})

export function BranchProvider({ 
  children,
  initialBranches = [],
  initialBranch = null,
}: { 
  children: React.ReactNode
  initialBranches?: Branch[]
  initialBranch?: Branch | null
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [branches, setBranches] = useState<Branch[]>(initialBranches)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(initialBranch)
  const [isLoading, setIsLoading] = useState(true)

  // Load branches from localStorage or API
  useEffect(() => {
    const storedBranches = localStorage.getItem('branches')
    if (storedBranches && storedBranches != '[]') {
      setBranches(JSON.parse(storedBranches))
      const branchId = searchParams.get('branchId')
      const storedBranch = JSON.parse(storedBranches).find((b: Branch) => b.id === branchId) || JSON.parse(storedBranches)[0]
      setSelectedBranch(storedBranch)
      setIsLoading(false)
    } else {
      const loadBranches = async () => {
        try {
          const data = await fetchBranches()
          setBranches(data)
          
          const branchId = searchParams.get('branchId')
          const branch = data.find(b => b.id === branchId) || data[0]
          
          if (branch) {
            setSelectedBranch(branch)
          }
          
          // Save to localStorage for future use
          localStorage.setItem('branches', JSON.stringify(data))
        } catch (error) {
          console.error('Failed to load branches:', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      loadBranches()
    }
  }, [])

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch)
    
    // Update URL with new branch ID
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('branchId', branch.id)
    
    // Preserve current path while updating search params
    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    router.push(`${window.location.pathname}${query}`)
  }

  return (
    <BranchContext.Provider 
      value={{ 
        selectedBranch, 
        setSelectedBranch: handleBranchChange,
        branches,
        isLoading
      }}
    >
      {children}
    </BranchContext.Provider>
  )
}

export function useBranch() {
  const context = useContext(BranchContext)
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider')
  }
  return context
}
