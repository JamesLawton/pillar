"use client"

import { createContext, useContext, useState } from "react"

export interface KanbanItem {
  id: string
  title: string
  description: string
  avatar: string
  author: string
  time: string
  project: string
}

interface KanbanColumn {
  id: string
  title: string
  items: KanbanItem[]
}

interface KanbanContextType {
  columns: KanbanColumn[]
  moveItem: (itemId: string, fromColumnId: string, toColumnId: string, newIndex?: number) => void
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: "new",
      title: "New",
      items: [
        {
          id: "1",
          title: "Integration Setup",
          description: "Need help setting up the API integration with our system",
          avatar: "/placeholder.svg",
          author: "John Smith",
          time: "2 hours ago",
          project: "API Team",
        },
        {
          id: "4",
          title: "New Feature Request",
          description: "Customer asking for a new reporting feature",
          avatar: "/placeholder.svg",
          author: "Emma Watson",
          time: "4 hours ago",
          project: "Product",
        },
      ],
    },
    {
      id: "on-you",
      title: "On you",
      items: [
        {
          id: "2",
          title: "Database Migration",
          description: "Planning the migration of customer data to new schema",
          avatar: "/placeholder.svg",
          author: "Sarah Johnson",
          time: "1 day ago",
          project: "Data Team",
        },
        {
          id: "5",
          title: "Performance Optimization",
          description: "Improve load times for the dashboard",
          avatar: "/placeholder.svg",
          author: "Alex Lee",
          time: "2 days ago",
          project: "Engineering",
        },
      ],
    },
    {
      id: "on-customer",
      title: "On customer",
      items: [
        {
          id: "3",
          title: "Feature Request",
          description: "Customer requesting new analytics dashboard features",
          avatar: "/placeholder.svg",
          author: "Mike Wilson",
          time: "3 days ago",
          project: "Product",
        },
        {
          id: "6",
          title: "Feedback Review",
          description: "Go through recent customer feedback and prioritize actions",
          avatar: "/placeholder.svg",
          author: "Lisa Chen",
          time: "1 week ago",
          project: "Customer Success",
        },
      ],
    },
    {
      id: "on-hold",
      title: "On hold",
      items: [
        {
          id: "7",
          title: "Security Audit",
          description: "Conduct a comprehensive security audit of our systems",
          avatar: "/placeholder.svg",
          author: "David Brown",
          time: "2 weeks ago",
          project: "Security",
        },
      ],
    },
    {
      id: "closed",
      title: "Closed",
      items: [
        {
          id: "8",
          title: "UI Redesign",
          description: "Redesign the user interface for better usability",
          avatar: "/placeholder.svg",
          author: "Sophie Taylor",
          time: "1 month ago",
          project: "Design",
        },
      ],
    },
  ])

  const moveItem = (itemId: string, fromColumnId: string, toColumnId: string, newIndex?: number) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            items: column.items.filter((item) => item.id !== itemId),
          }
        }
        if (column.id === toColumnId) {
          const itemToMove = prevColumns
            .find((col) => col.id === fromColumnId)
            ?.items.find((item) => item.id === itemId)
          if (itemToMove) {
            const newItems = [...column.items]
            if (newIndex !== undefined) {
              newItems.splice(newIndex, 0, itemToMove)
            } else {
              newItems.push(itemToMove)
            }
            return {
              ...column,
              items: newItems,
            }
          }
        }
        return column
      })
      return newColumns
    })
  }

  return <KanbanContext.Provider value={{ columns, moveItem }}>{children}</KanbanContext.Provider>
}

export function useKanban() {
  const context = useContext(KanbanContext)
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider")
  }
  return context
}

