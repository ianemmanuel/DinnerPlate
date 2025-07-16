import { Loader2 } from 'lucide-react'

const Loader = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}

export default Loader
