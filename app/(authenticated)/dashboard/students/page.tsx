"use client"

import { UsersTable } from "./student-table"
import { CreateStudentDialog } from "./create-student-dialog"
import { CreateGroupDialog } from "./create-group-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { Student } from "@/types/student";
import { useBranch } from "@/contexts/branch-context";
import { getStudentsByBranch } from "@/actions/student"
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function UsersPage() {
    const [studentList, setStudentList] = useState<Student[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { selectedBranch } = useBranch();

    const loadStudentList = async () => {
        setIsLoading(true);
        if (selectedBranch) {
            const data = await getStudentsByBranch(selectedBranch.id as string);
            setStudentList(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadStudentList();
    }, [selectedBranch]);

    if (studentList === null || isLoading) {
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
                    <CreateStudentDialog branchId={selectedBranch?.id as string} />
                    <CreateGroupDialog />
                    <Button
                        onClick={loadStudentList}
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
                    <UsersTable data={studentList} />
                </CardContent>
            </Card>
        </div>
    );
}
