import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Flame, Dumbbell, Activity, Heart } from 'lucide-react'
import React from 'react'; // Added import for React

interface ExerciseTypeOption {
    icon: React.ReactNode
    title: string
    subtitle: string
    backgroundColor: string
    textColor: string
}

export const contentMap: Record<string, ExerciseTypeOption> = {
    Aquecimento: {
        icon: <Heart className="h-5 w-5" />,
        title: "Aquecimento",
        subtitle: "Séries leves para aumentar a circulação e evitar lesões.",
        backgroundColor: "bg-orange-100",
        textColor: "text-orange-500",
    },
    Drop: {
        icon: <Flame className="h-5 w-5" />,
        title: "Drop",
        subtitle: "Reduza o peso gradualmente durante a série.",
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-500",
    },
    Falhada: {
        icon: <Activity className="h-5 w-5" />,
        title: "Falhada",
        subtitle: "Empurre seus limites até não conseguir mais.",
        backgroundColor: "bg-red-100",
        textColor: "text-red-500",
    },
    Normal: {
        icon: <Dumbbell className="h-5 w-5" />,
        title: "Normal",
        subtitle: "O formato clássico de séries.",
        backgroundColor: "bg-green-100",
        textColor: "text-green-500",
    },
}

interface ExerciseTypeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (type: string) => void
}

export function ExerciseTypeDialog({ open, onOpenChange, onSelect }: ExerciseTypeDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tipo de Repetição</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    {Object.entries(contentMap).map(([type, { icon, title, subtitle, backgroundColor }]) => (
                        <Button
                            key={type}
                            variant="ghost"
                            className="w-full justify-start p-4 h-auto"
                            onClick={() => {
                                onSelect(type)
                                onOpenChange(false)
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${backgroundColor}`}>
                                    {icon}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium">{title}</span>
                                    <span className="text-sm text-muted-foreground">{subtitle}</span>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
