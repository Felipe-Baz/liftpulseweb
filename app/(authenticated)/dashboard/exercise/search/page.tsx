'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Exercise } from '@/types/exercise';
import { fetchExercises } from '@/actions/exercises';
import CreateExerciseModal from '@/components/CreateExerciseModal';

export default function ExerciseLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [selectedExercisesId, setSelectedExercisesId] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const storedExercises = sessionStorage.getItem('selectedExercises');

    if (storedExercises) {
      const exercisesFromLibrary = JSON.parse(storedExercises);

      setSelectedExercises(exercisesFromLibrary);
      setSelectedExercisesId(exercisesFromLibrary);
    }

    const loadExercises = async () => {
      const fetchedExercises = await fetchExercises();
      setExercises(fetchedExercises);

      // Recupera os exercícios selecionados da sessionStorage
      const storedExercises = sessionStorage.getItem('selectedExercises');
      if (storedExercises) {
        const selectedExercisesFromLibrary = JSON.parse(storedExercises);
        setSelectedExercises(selectedExercisesFromLibrary);
        setSelectedExercisesId(selectedExercisesFromLibrary.map((ex: Exercise) => ex.id));
      }
    };

    loadExercises();
  }, []);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    sessionStorage.removeItem('selectedExercises');
    sessionStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));
    setSelectedExercises([]);
    setSelectedExercisesId([]);
    router.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Library</h1>

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
              id={`exercise-${exercise.id}`}
              checked={selectedExercisesId.includes(exercise.id)}
              onCheckedChange={(checked) => {
                setSelectedExercisesId((prevSelected) =>
                  checked
                    ? [...prevSelected, exercise.id]
                    : prevSelected.filter((id) => id !== exercise.id)
                );
                setSelectedExercises((prevSelected) =>
                  checked
                    ? [...prevSelected, exercise]
                    : prevSelected.filter((ex) => ex.id !== exercise.id)
                );
              }}
            />
            <label
              htmlFor={`exercise-${exercise.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {exercise.title}
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={() => router.push('/')}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={selectedExercises.length === 0}>
          Add Selected
        </Button>
      </div>

      <Button
        type="button"
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add from exercise library</span>
      </Button>

      {/* Modal para criar novo exercício */}
      <CreateExerciseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
