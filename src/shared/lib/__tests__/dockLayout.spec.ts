import { describe, it, expect } from 'vitest'
import { resolveRowCount, chunkIntoColumns } from '../dockLayout'

describe('resolveRowCount', () => {
  it.each([
    [1080, 3],
    [900, 3],
    [800, 3],
    [700, 3],
    [640, 2],
    [0, 2],
  ])('viewportHeight %i should resolve to rowCount %i', (viewportHeight, expectedRowCount) => {
    const rowCount = resolveRowCount(viewportHeight)
    expect(rowCount).toBe(expectedRowCount)
  })
})

describe('chunkIntoColumns', () => {
  it('fills columns top-to-bottom', () => {
    expect(chunkIntoColumns(['a', 'b', 'c', 'd', 'e'], 2).map((column) => column.items)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
      ['e'],
    ])
  })

  it('produces ceil(total / rowCount) columns', () => {
    expect(chunkIntoColumns(Array.from({ length: 1200 }), 3)).toHaveLength(400)
  })

  it('returns nothing when rowCount is not positive', () => {
    expect(chunkIntoColumns(['a'], 0)).toEqual([])
  })
})
