'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Exercise } from '@/types/exercise'
import { fetchExercises } from '@/actions/exercises'

interface ExerciseLibraryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExercisesSelected: (exercises: Exercise[]) => void
  initialSelected?: string[]
}

export default function ExerciseLibraryModal({
  open,
  onOpenChange,
  onExercisesSelected,
  initialSelected = []
}: ExerciseLibraryModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    if (open) {
      const loadExercises = async () => {
        const fetchedExercises = await fetchExercises();
        setExercises(fetchedExercises);
      };

      loadExercises();
      // Ao abrir o modal, define os exercícios já selecionados conforme a prop initialSelected
      setSelectedExercises(initialSelected);
    }
  }, [open, initialSelected]);

  const filteredExercises = exercises.filter(exercise =>
    exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = () => {
    const selected = exercises.filter(ex => selectedExercises.includes(ex.id))
    onExercisesSelected(selected)
    setSelectedExercises([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Exercise Library</DialogTitle>
        </DialogHeader>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto flex-1 p-1">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent"
            >
              <Checkbox
                id={`modal-${exercise.id}`}
                checked={selectedExercises.includes(exercise.id)}
                onCheckedChange={(checked) => {
                  setSelectedExercises(
                    checked
                      ? [...selectedExercises, exercise.id]
                      : selectedExercises.filter((id) => id !== exercise.id)
                  )
                }}
              />
              <label
                htmlFor={`modal-${exercise.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {exercise.title}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={selectedExercises.length === 0}>
            Add Selected
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
