import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TemplateList from './template-list'

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Training Templates</h1>
        <Button asChild>
          <Link href="/dashboard/workout/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Link>
        </Button>
      </div>
      <TemplateList />
    </div>
  )
}
