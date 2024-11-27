import { Library } from '@/contracts/gallery'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, FileText, User } from 'lucide-react'

interface LibraryCardProps {
  library: Library
  onViewDetails: (id: string) => void;
}

export function LibraryCard({ library, onViewDetails }: LibraryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{library.name}</CardTitle>
        <CardDescription className="truncate">ID: {library.id.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600 truncate">
            Owner: {library.owner}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Blobs: {library.blobs.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Members: {library.members.length}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(library.b36addr)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
} 