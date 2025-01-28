import { UsersTable } from "./student-table"
import { CreateStudentDialog } from "./create-student-dialog"
import { CreateGroupDialog } from "./create-group-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <div className="flex gap-4">
                    <CreateStudentDialog />
                    <CreateGroupDialog />
                </div>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Lista de Alunos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <UsersTable />
                </CardContent>
            </Card>
        </div>
    )
}