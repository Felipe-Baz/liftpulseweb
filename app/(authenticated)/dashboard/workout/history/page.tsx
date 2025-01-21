import { Metadata } from 'next'
import TrainingHistory from './training-history'

export const metadata: Metadata = {
  title: 'Training History',
  description: 'View and analyze training completion history',
}

export default function TrainingHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Training History</h1>
      <TrainingHistory />
    </div>
  )
}
