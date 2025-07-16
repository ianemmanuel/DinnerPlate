// IconButton.tsx
import Link from 'next/link'
import { Button, ButtonProps } from '../ui/button'

interface IconButtonProps {
  href: string;
  icon: React.ElementType;
  badge?: number;
  className?: string;
  buttonVariant?: ButtonProps['variant'];
}

export default function IconButton({ 
  href, 
  icon: Icon, 
  badge,
  className = '',
  buttonVariant = 'ghost'
}: IconButtonProps) {
  return (
    <Button 
      variant={buttonVariant} 
      size="icon" 
      className={`px-3 text-foreground relative ${className}`} 
      asChild
    >
      <Link href={href}>
        <Icon className="h-5 w-5" />
        {badge !== undefined && badge > 0 && (
          <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
            <span className="text-white font-medium text-sm">{badge > 9 ? '9+' : badge}</span>
          </div>
        )}
      </Link>
    </Button>
  )
}