import Sidebar from '@/components/CustomSidebar'
import { fetchBranches } from '@/actions/fetch-branches'
import { BranchSelector } from '@/components/branch-selector'
import { BranchProvider } from '@/contexts/branch-context'

const navigation = {
  overview: [
    { name: 'Dashboard Geral', href: '/dashboard', icon: "LayoutDashboard" },
    { name: 'Análise de Uso', href: '/dashboard/analytics/use', icon: "Activity" },
    { name: 'Tendências Recentes', href: '/dashboard/trend', icon: "TrendingUp" },
  ],
  workouts: [
    { name: 'Biblioteca de Treinos', href: '/dashboard/workout/library', icon: "BookOpen" }, // Mostra a biblioteca de treinos criadas pelo time e os treinos personalizados da propria academia
    { name: 'Criar Novo Treino', href: '/dashboard/workout/create', icon: "Edit" }, // Pagina para criar um treino
    { name: 'Acompanhamento de Treinos', href: '/dashboard/workout/create', icon: "LineChart" }, // Pagina para ter uma visão do progresso dos treinos em geral e dos usuarios atrelados ao treino, bem como o desempenho dos treinos em relação do esforço e opinião dos alunos
    { name: 'Histórico de Treinos', href: '/dashboard/workout/history', icon: "Clock" }, // Pagina com os treinos e historico de treinos feitos pelos usuarios
  ],
  analytics: [
    { name: 'Relatório Geral', href: '/dashboard/revenue', icon: "FileText" },
    { name: 'Progresso dos Alunos', href: '/dashboard/analytics', icon: "BarChart3" },
    { name: 'Desempenho dos Instrutores', href: '/dashboard/analytics', icon: "TrendingUp" },
    { name: 'Comparativo de Períodos', href: '/dashboard/analytics', icon: "PieChart" },
    { name: 'Desempenho dos Treinos', href: '/dashboard/analytics', icon: "Activity" },
  ],
  user_management: [
    { name: 'Todos os Alunos', href: '/dashboard/revenue', icon: "Users" },
    { name: 'Cadastrar Aluno', href: '/dashboard/analytics', icon: "UserPlus" },
    { name: 'Consultar Detalhes do Aluno', href: '/dashboard/analytics', icon: "Search" },
    { name: 'Grupos de Alunos', href: '/dashboard/analytics', icon: "Layers" },
  ],
  instructor_management: [
    { name: 'Todos os Instrutores', href: '/dashboard/revenue', icon: "Users" },
    { name: 'Cadastrar Instrutor', href: '/dashboard/analytics', icon: "UserPlus" },
    { name: 'Consultar Detalhes do Instrutor', href: '/dashboard/analytics', icon: "Search" },
    { name: 'Grupos de Instrutores', href: '/dashboard/analytics', icon: "Layers" },
  ],
  marketing: [
    { name: 'Campanhas Promocionais', href: '/dashboard/revenue', icon: "Megaphone" },
    { name: 'Relatórios de Marketing', href: '/dashboard/analytics', icon: "BarChart3" },
  ],
  configuration: [
    { name: 'Perfil da Academia', href: '/dashboard/revenue', icon: "Settings" },
    { name: 'Gerenciar Acessos', href: '/dashboard/analytics', icon: "Key" },
  ],
}

async function DashboardLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams: { branchId?: string }
}) {
  // Fetch initial data on the server
  const branches = await fetchBranches();
  const initialBranch = !searchParams ? (branches.find(b => b.id === searchParams?.branchId) || branches[0]) : branches[0]

  return (
    <BranchProvider initialBranches={branches} initialBranch={initialBranch}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="hidden w-70 flex-shrink-0 flex-col bg-white dark:bg-gray-800 md:flex">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <BranchSelector />
          </div>

          <Sidebar navigation={navigation} initialBranch={initialBranch} />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-100 px-6 py-8 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </BranchProvider>
  )
}

export default DashboardLayout