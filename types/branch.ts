export interface Branch {
    id: string;
    name: string;
    address?: string;
    description?: string;
    openingHours?: string;
    facebook?: string;
    createdAt?: string;
    updatedAt?: string;
    phoneNumber?: string;
    instagram?: string;
    website?: string;
    image?: string;
}

export interface BranchContextType {
    selectedBranch: Branch | null;
    setSelectedBranch: (branch: Branch) => void;
}

