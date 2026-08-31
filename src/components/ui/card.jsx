import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-[1.4rem] border bg-card text-card-foreground shadow-[0_20px_60px_rgba(18,48,33,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.18)]', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('font-semibold leading-tight tracking-[-0.025em]', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
