import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchBranches } from '@/actions/fetch-branches'; // Supondo que esta função esteja disponível no servidor

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const authToken = request.cookies.get('authToken');
  
  // Verifica se o usuário está autenticado
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Chama a API para obter as branches, ou pode buscar de um cookie ou sessão
    let branches: any = [];
    try {
      branches = await fetchBranches(); // Pode usar uma função API para buscar as branches no servidor
    } catch (error) {
      console.error('Erro ao carregar as academias:', error);
    }

    // Se não houver branches, redireciona para a página de criação
    if (branches.length === 0) {
      return NextResponse.redirect(new URL('/createFirstGym', request.url));
    }

    // Se não houver uma filial selecionada, redireciona para a primeira filial
    const branchId = new URL(request.url).searchParams.get('branchId');
    if (!branchId && branches.length > 0) {
      return NextResponse.redirect(new URL(`/dashboard?branchId=${branches[0].id}`, request.url));
    }
  }

  // Redireciona para o dashboard se o usuário estiver autenticado e tentar acessar a página de login
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
