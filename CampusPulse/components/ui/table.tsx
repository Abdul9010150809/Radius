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

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-slate-900/70", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-slate-800", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { onClick?: React.MouseEventHandler<HTMLTableRowElement> }
>(({ className, onClick, tabIndex, ...props }, ref) => {
  // Make rows keyboard-focusable when they have an onClick handler
  const keyboardTabIndex = tabIndex ?? (onClick ? 0 : undefined)

  const handleKeyDown: React.KeyboardEventHandler<HTMLTableRowElement> = (e) => {
    if (!onClick) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      // Call the click handler
      ;(onClick as React.MouseEventHandler<HTMLTableRowElement>)(
        // synthesize a mouse event minimal object
        // @ts-ignore - pass minimal event
        { currentTarget: e.currentTarget } as any
      )
    }
  }

  return (
    <tr
      ref={ref}
      role="row"
      tabIndex={keyboardTabIndex}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={cn("hover:bg-slate-800/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500", className)}
      {...props}
    />
  )
})
TableRow.displayName = "TableRow"

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-3 align-middle text-sm text-slate-100", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

// Legacy exports for backward compatibility
export const THead = TableHeader
export const TBody = TableBody
export const TR = TableRow
export const TH = TableHead
export const TD = TableCell
