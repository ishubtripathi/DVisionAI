'use client'

interface LoaderSpinnerProps {
  size?: number
  color?: string
}

export default function LoaderSpinner({ size = 24, color = 'currentColor' }: LoaderSpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="spin-slow"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeOpacity="0.3" />
    </svg>
  )
}
