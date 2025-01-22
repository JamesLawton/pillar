"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface KanbanCardProps {
  id: string
  title: string
  description: string
  avatar: string
  author: string
  time: string
  project: string
  isDragging?: boolean
}

export function KanbanCard({ id, title, description, avatar, author, time, project, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab active:cursor-grabbing hover:bg-muted/50 transition-colors",
        (isDragging || isSortableDragging) && "opacity-50 shadow-lg",
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {project}
            </Badge>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

