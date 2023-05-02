import { atomWithStorage } from 'jotai/utils'
import { Day } from '../../GridItem'

export const daysAtom = atomWithStorage<Day[]>('daysAtom', [])
export const autoCompilationAtom = atomWithStorage<boolean>(
  'autoCompilationAtom',
  false,
)
export const workedDaysAtom = atomWithStorage<number>('workedDaysAtom', 0)
export const workedHoursAtom = atomWithStorage<number>('workedHoursAtom', 0)
