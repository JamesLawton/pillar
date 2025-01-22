"use client"

import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { MainNav } from "@/components/main-nav"
import { Header } from "@/components/header"
import { KanbanColumn } from "@/components/kanban/column"
import { KanbanCard } from "@/components/kanban/card"
import { KanbanProvider, useKanban } from "@/lib/kanban-context"
import { useState } from "react"

function DashboardContent() {
  const { columns, moveItem } = useKanban()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeColumnId = columns.find((col) => col.items.some((item) => item.id === active.id))?.id
    const overColumnId = over.id

    if (activeColumnId !== overColumnId) {
      const activeIndex = columns.findIndex((col) => col.id === activeColumnId)
      const overIndex = columns.findIndex((col) => col.id === overColumnId)

      if (activeIndex !== -1 && overIndex !== -1) {
        const activeColumn = columns[activeIndex]
        const overColumn = columns[overIndex]
        const activeItemIndex = activeColumn.items.findIndex((item) => item.id === active.id)
        const overItemIndex = over.data.current?.sortable.index ?? overColumn.items.length

        moveItem(active.id as string, activeColumnId!, overColumnId as string, overItemIndex)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeColumnId = columns.find((col) => col.items.some((item) => item.id === active.id))?.id
      const overColumnId = columns.find((col) => col.items.some((item) => item.id === over.id))?.id

      if (activeColumnId && overColumnId) {
        const activeColumn = columns.find((col) => col.id === activeColumnId)!
        const overColumn = columns.find((col) => col.id === overColumnId)!
        const activeIndex = activeColumn.items.findIndex((item) => item.id === active.id)
        const overIndex = overColumn.items.findIndex((item) => item.id === over.id)

        moveItem(active.id as string, activeColumnId, overColumnId, overIndex)
      }
    }
    setActiveId(null)
  }

  const activeItem = columns.flatMap((col) => col.items).find((item) => item.id === activeId)

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-muted/40 p-4">
        <div className="flex h-12 items-center border-b px-4">
          <h2 className="font-semibold">Support Dashboard</h2>
        </div>
        <MainNav />
      </div>
      <div className="flex-1 relative overflow-hidden">
        <Header />
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 p-4 h-[calc(100vh-4rem)] overflow-x-auto">
            {columns.map((column) => (
              <SortableContext
                key={column.id}
                items={column.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <KanbanColumn id={column.id} title={column.title} items={column.items} />
              </SortableContext>
            ))}
          </div>
          <DragOverlay>{activeId && activeItem && <KanbanCard {...activeItem} isDragging />}</DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <KanbanProvider>
      <DashboardContent />
    </KanbanProvider>
  )
}

