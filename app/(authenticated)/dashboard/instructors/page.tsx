import { InstructorTable } from "./instructor-table"
import { CreateInstructorDialog } from "./create-instructor-dialog"
import { CreateGroupDialog } from "./create-group-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <CreateInstructorDialog />
                    <CreateGroupDialog />
                </div>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Lista de Instrutores
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <InstructorTable />
                </CardContent>
            </Card>
        </div>
    )
}