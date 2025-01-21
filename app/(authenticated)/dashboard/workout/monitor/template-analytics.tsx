"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { BarChart, ChevronDown, MessageSquare } from "lucide-react"

// This would typically come from your API
const SAMPLE_DATA = {
  templates: [
    {
      id: "1",
      name: "Full Body Workout",
      averageEffort: 8.5,
      averageRating: 4.7,
      completions: 245,
      comments: [
        { user: "John D.", rating: 5, effort: 9, comment: "Great full body workout, really challenging!" },
        { user: "Sarah M.", rating: 4, effort: 8, comment: "Good balance of exercises, but quite intense." },
      ],
    },
    {
      id: "2",
      name: "Upper Body Focus",
      averageEffort: 7.8,
      averageRating: 4.5,
      completions: 189,
      comments: [
        { user: "Mike R.", rating: 5, effort: 8, comment: "Perfect for upper body strength." },
        { user: "Emma L.", rating: 4, effort: 7, comment: "Good progression of exercises." },
      ],
    },
    {
        id: "3",
        name: "Lower Body Focus",
        averageEffort: 7.8,
        averageRating: 4.5,
        completions: 189,
        comments: [
        ],
      },
    // Add more templates as needed
  ],
  timeRanges: ["Last 7 days", "Last 30 days", "Last 3 months", "All time"],
}

export default function TemplateAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 30 days")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const getTemplate = (id: string) => {
    return SAMPLE_DATA.templates.find((t) => t.id === id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Desempenho do Template</CardTitle>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {SAMPLE_DATA.timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Template</TableHead>
              <TableHead>Média de Nível de esforço</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Completos</TableHead>
              <TableHead>Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_DATA.templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={template.averageEffort * 10} className="w-[60px]" />
                    <span>{template.averageEffort}/10</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{template.averageRating}</span>
                  </div>
                </TableCell>
                <TableCell>{template.completions}</TableCell>
                <TableCell>
                  {template.comments.length <= 0 ? <span>Sem feedback</span> : <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(template.id)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Feedback
                  </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedTemplate && getTemplate(selectedTemplate)?.name} - User Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedTemplate &&
                getTemplate(selectedTemplate)?.comments.map((comment, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{comment.user}</span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <BarChart className="h-4 w-4 mr-1" />
                            <span>Effort: {comment.effort}/10</span>
                          </div>
                          <div className="flex items-center">
                            <span>⭐ {comment.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{comment.comment}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

