import Sidebar from '@/components/CustomSidebar'
import { fetchBranches } from '@/actions/fetch-branches'
import { BranchSelector } from '@/components/branch-selector'
import { BranchProvider } from '@/contexts/branch-context'

const navigation = {
  overview: [
    { name: 'Overview', href: '/dashboard', icon: "LayoutDashboard" },
    { name: 'Análise de Uso', href: '/dashboard/analytics/use', icon: "Activity" },
    { name: 'Tendências Recentes', href: '/dashboard/analytics/trend', icon: "TrendingUp" },
  ],
  workouts: [
    { name: 'Biblioteca de Treinos', href: '/dashboard/workout/library', icon: "BookOpen" }, // Mostra a biblioteca de treinos criadas pelo time e os treinos personalizados da propria academia
    { name: 'Criar Novo Treino', href: '/dashboard/workout/create', icon: "Edit" }, // Pagina para criar um treino
    { name: 'Acompanhamento de Treinos', href: '/dashboard/workout/monitor', icon: "LineChart" }, // Pagina para ter uma visão do progresso dos treinos em geral e dos usuarios atrelados ao treino, bem como o desempenho dos treinos em relação do esforço e opinião dos alunos
    { name: 'Histórico de Treinos', href: '/dashboard/workout/history', icon: "Clock" }, // Pagina com os treinos e historico de treinos feitos pelos usuarios
  ],
  analytics: [
    { name: 'Relatório Geral', href: '/dashboard/analytics/report/general', icon: "FileText" },
    { name: 'Progresso dos Alunos', href: '/dashboard/analytics/student-progress', icon: "BarChart3" },
    { name: 'Desempenho dos Instrutores', href: '/dashboard/analytics/instructor-performance', icon: "TrendingUp" },
    { name: 'Comparativo de Períodos', href: '/dashboard/analytics/period-comparison', icon: "PieChart" },
    { name: 'Desempenho dos Treinos', href: '/dashboard/analytics/training-performance', icon: "Activity" },
  ],
  user_management: [
    { name: 'Todos os Alunos', href: '/dashboard/students', icon: "Users" },
    { name: 'Cadastrar Aluno', href: '/dashboard/students/register', icon: "UserPlus" },
    { name: 'Consultar Detalhes do Aluno', href: '/dashboard/students/details', icon: "Search" },
    { name: 'Grupos de Alunos', href: '/dashboard/students/groups', icon: "Layers" },
  ],
  instructor_management: [
    { name: 'Todos os Instrutores', href: '/dashboard/instructors', icon: "Users" },
    { name: 'Cadastrar Instrutor', href: '/dashboard/instructors/register', icon: "UserPlus" },
    { name: 'Consultar Detalhes do Instrutor', href: '/dashboard/instructors/details', icon: "Search" },
    { name: 'Grupos de Instrutores', href: '/dashboard/instructors/groups', icon: "Layers" },
  ],
  marketing: [
    { name: 'Campanhas Promocionais', href: '/dashboard/marketing/campaign', icon: "Megaphone" },
    { name: 'Relatórios de Marketing', href: '/dashboard/marketing/analytics', icon: "BarChart3" },
  ],
  configuration: [
    { name: 'Perfil da Academia', href: '/dashboard/gym/profile', icon: "Settings" },
    { name: 'Gerenciar Acessos', href: '/dashboard/access', icon: "Key" },
    { name: 'Configurações', href: '/dashboard/settings', icon: "Settings" },
  ],
}

async function DashboardLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { branchId?: string } | undefined;
}) {
  // Fetch initial data on the server
  const branches = await fetchBranches();

  // Safely determine the initial branch
  const initialBranch =
    searchParams?.branchId
      ? branches.find((b) => b.id === searchParams.branchId)
      : branches[0];

  return (
    <BranchProvider initialBranches={branches} initialBranch={initialBranch}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden w-70 flex-shrink-0 flex-col md:flex border-r">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <BranchSelector />
          </div>
          <Sidebar navigation={navigation} initialBranch={initialBranch} />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-muted px-6 py-8 ">
            {children}
          </main>
        </div>
      </div>
    </BranchProvider>
  )
}

export default DashboardLayout