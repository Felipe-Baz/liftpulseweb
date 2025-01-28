import { BranchProvider } from "@/contexts/branch-context";

async function CreateFirstGymLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BranchProvider>
        {children}
    </BranchProvider>
  )
}

export default CreateFirstGymLayout