import * as React from "react"
import { cn } from "@/lib/utils"

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl border border-slate-800">
      <table
        ref={ref}
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

export const THead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-slate-900/70 text-slate-300">
    <tr>{children}</tr>
  </thead>
)

export const TBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-slate-800 text-slate-100">{children}</tbody>
)

export const TR = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-slate-900/70 transition">{children}</tr>
)

export const TH = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <th
    onClick={onClick}
    className={cn(
      "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-300",
      onClick && "cursor-pointer select-none",
      className
    )}
  >
    {children}
  </th>
)

export const TD = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={cn("px-4 py-3 align-middle text-sm text-slate-100", className)}>{children}</td>
)
