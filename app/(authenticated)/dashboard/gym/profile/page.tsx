"use client"

import { GymProfileForm } from "./gym-profile-form";
import { useEffect, useState } from "react";
import { fetchBranchDetails } from "@/actions/branches";
import { useBranch } from "@/contexts/branch-context";
import { Branch } from "@/types/branch";

export default function GymProfilePage() {
  const [branchDetails, setBranchDetails] = useState<Branch | null>(null);
  const { selectedBranch } = useBranch(); // Pegue a branch selecionada do contexto
 
  useEffect(() => {
    if (selectedBranch) {
      const loadBranchDetails = async () => {
        const data = await fetchBranchDetails(selectedBranch.id as string);
        setBranchDetails(data);
      };

      loadBranchDetails();
    }
  }, [selectedBranch]);

  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil da Academia</h1>
          <p className="text-muted-foreground">
            Gerencie as informações públicas da sua academia
          </p>
        </div>

        {/* Passa os dados para o formulário, se disponíveis */}
        {branchDetails ? (
          <GymProfileForm initialData={branchDetails} />
        ) : (
          <p>Carregando os dados da academia...</p>
        )}
      </div>
    </div>
  );
}
