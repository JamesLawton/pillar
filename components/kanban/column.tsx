"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { KanbanCard } from "./card"
import type { KanbanItem } from "@/lib/kanban-context"

interface KanbanColumnProps {
  id: string
  title: string
  items: KanbanItem[]
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  return (
    <div className="flex h-full w-80 flex-col gap-4 flex-shrink-0">
      <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{items.length}</span>
        </div>
      </div>
      <ScrollArea className="h-full">
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div
            ref={setNodeRef}
            className={`flex flex-col gap-4 p-2 min-h-[200px] transition-colors ${isOver ? "bg-muted/50" : ""}`}
          >
            {items.map((item) => (
              <KanbanCard key={item.id} {...item} />
            ))}
          </div>
        </SortableContext>
      </ScrollArea>
    </div>
  )
}

