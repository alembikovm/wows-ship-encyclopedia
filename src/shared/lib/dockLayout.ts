const ROW_COUNT_BREAKPOINTS = [
  { minViewportHeight: 768, rowCount: 3 },
  { minViewportHeight: 0, rowCount: 2 },
] as const

export function resolveRowCount(viewportHeight: number): number {
  const breakpoint = ROW_COUNT_BREAKPOINTS.find(
    (candidate) => viewportHeight >= candidate.minViewportHeight,
  )
  return breakpoint?.rowCount ?? 2
}

export interface Column<TItem> {
  id: string
  items: TItem[]
}

export function chunkIntoColumns<TItem>(items: TItem[], rowCount: number): Column<TItem>[] {
  if (rowCount <= 0) return []

  const columns: Column<TItem>[] = []

  for (let startIndex = 0; startIndex < items.length; startIndex += rowCount) {
    columns.push({
      id: `column-${startIndex}`,
      items: items.slice(startIndex, startIndex + rowCount),
    })
  }

  return columns
}
