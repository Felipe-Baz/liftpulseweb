"use client"

import * as React from "react"
import { ChevronDown, Loader2, Plus } from 'lucide-react'
import { Branch } from "@/types/branch"
import { addBranch } from "@/actions/fetch-branches"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useBranch } from "@/contexts/branch-context"

export function BranchSelector() {
  const { branches, selectedBranch, setSelectedBranch, isLoading } = useBranch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [newBranchName, setNewBranchName] = React.useState("")
  const [isAdding, setIsAdding] = React.useState(false)

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
    setIsOpen(false)
  }

  const handleAddBranch = async () => {
    if (newBranchName.trim() === "") return

    try {
      setIsAdding(true)
      const newBranch = await addBranch(newBranchName)
      branches.push(newBranch)
      setSelectedBranch(newBranch)
      setNewBranchName("")
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to add branch:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-64 justify-between"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            <>
              <span>{selectedBranch?.name ?? "Selecione uma unidade"}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="max-h-[300px] overflow-auto">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={cn(
                "flex cursor-pointer items-center px-4 py-2 hover:bg-accent",
                selectedBranch?.id === branch.id && "bg-accent"
              )}
              onClick={() => handleSelectBranch(branch)}
            >
              {branch.name}
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <div className="space-y-2">
            <Input
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              placeholder="Nova unidade"
              disabled={isAdding}
            />
            <Button
              className="w-full"
              onClick={handleAddBranch}
              disabled={isAdding || newBranchName.trim() === ""}
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Adicionar</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

