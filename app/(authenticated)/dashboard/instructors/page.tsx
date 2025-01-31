"use client"

import { InstructorTable } from "./instructor-table"
import { CreateInstructorDialog } from "./create-instructor-dialog"
import { CreateGroupDialog } from "./create-group-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { Instructor } from "@/types/instructor";
import { useBranch } from "@/contexts/branch-context";
import { getinstructorsByBranch } from "@/actions/instructors"
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function UsersPage() {
    const [instructorList, setinstructorList] = useState<Instructor[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { selectedBranch } = useBranch();

    const loadinstructorList = async () => {
        setIsLoading(true);
        if (selectedBranch) {
            const data = await getinstructorsByBranch(selectedBranch.id as string);
            setinstructorList(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadinstructorList();
    }, [selectedBranch]);
    
    if (!selectedBranch || instructorList === null || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Alunos</h1>
                <div className="flex gap-4">
                    <CreateInstructorDialog branchId={selectedBranch.id} />
                    <CreateGroupDialog />
                    <Button
                        onClick={loadinstructorList}
                    >
                        <ReloadIcon className="mr-2 h-4 w-4" />
                        Recarregar Lista
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Lista de Alunos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <InstructorTable data={instructorList}/>
                </CardContent>
            </Card>
        </div>
    );
}
