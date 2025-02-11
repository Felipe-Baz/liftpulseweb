import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExerciseType, MuscleEnum, EquipmentEnum, ExerciseTypeDescriptions, MuscleDescriptions, EquipmentDescriptions } from "@/utils/enum";
import { createExercise } from "@/actions/exercises";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateExerciseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseType, setExerciseType] = useState(ExerciseType.PESO_REPETICAO);
    const [primaryMuscle, setPrimaryMuscle] = useState(MuscleEnum.ABDOMINAL);
    const [secondaryMuscle, setSecondaryMuscle] = useState(MuscleEnum.OUTROS);
    const [equipmentType, setEquipmentType] = useState(EquipmentEnum.NENHUM);

    const handleSubmit = async () => {
        if (!exerciseName || !primaryMuscle || !equipmentType || !exerciseType) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const payload = {
            title: exerciseName,
            description: "",
            image_video: '',
            is_public: true,
            type: exerciseType,
            primary_muscle: primaryMuscle,
            secondary_muscle: secondaryMuscle,
            equipment: equipmentType,
        };

        await createExercise(payload)

        console.log("Novo Exercício:", payload);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar novo Exercício</DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Nome do Exercício"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />

                <Select value={exerciseType} onValueChange={setExerciseType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o Tipo de Exercício" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(ExerciseType).map(([key, value]) => (
                            <SelectItem key={key} value={value as string}>
                                {ExerciseTypeDescriptions[key as keyof typeof ExerciseTypeDescriptions]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={primaryMuscle} onValueChange={setPrimaryMuscle}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o Músculo Principal" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(MuscleEnum).map(([key, value]) => (
                            <SelectItem key={key} value={value as string}>
                                {MuscleDescriptions[key as keyof typeof MuscleDescriptions]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={secondaryMuscle} onValueChange={setSecondaryMuscle}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o Músculo Secundário" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(MuscleEnum).map(([key, value]) => (
                            <SelectItem key={key} value={value as string}>
                                {MuscleDescriptions[key as keyof typeof MuscleDescriptions]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={equipmentType} onValueChange={setEquipmentType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o Equipamento" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(EquipmentEnum).map(([key, value]) => (
                            <SelectItem key={key} value={value as string}>
                                {EquipmentDescriptions[key as keyof typeof EquipmentDescriptions]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateExerciseModal;
