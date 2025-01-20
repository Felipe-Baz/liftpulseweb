export interface Branch {
    id: string;
    name: string;
    address?: string;
}

export interface BranchContextType {
    selectedBranch: Branch | null;
    setSelectedBranch: (branch: Branch) => void;
}

