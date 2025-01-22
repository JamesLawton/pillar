import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, LayoutGrid, Plus, Search } from 'lucide-react'

export function Header() {
  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-semibold">Issues</h1>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <Select defaultValue="grid">
              <SelectTrigger className="w-32">
                <LayoutGrid className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid Layout</SelectItem>
                <SelectItem value="board">Board Layout</SelectItem>
                <SelectItem value="table">Table Layout</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Account Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="me">Assigned to Me</SelectItem>
                <SelectItem value="team">My Team</SelectItem>
                <SelectItem value="all">All Owners</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search issues..."
              className="w-64"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

