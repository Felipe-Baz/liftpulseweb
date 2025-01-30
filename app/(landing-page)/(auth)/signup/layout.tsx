import { BranchProvider } from "@/contexts/branch-context";

async function signupUserLayout({
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

export default signupUserLayout