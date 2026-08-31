import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(12,107,73,0.18)] hover:bg-primary/90',
        secondary: 'border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/75',
        outline: 'border border-input bg-card text-foreground hover:border-primary/45 hover:bg-accent hover:text-accent-foreground',
        ghost: 'border border-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 rounded-xl px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
