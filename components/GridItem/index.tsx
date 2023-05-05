import React from 'react'
import styles from './GridItem.module.scss'
import { Card, Flex, Text, Title } from '@mantine/core'

export type Day = {
  readonly id: number
  date: Date
  WorkingHours: number
  isWeekend: boolean
  isWorked: boolean
  isHoliday: boolean
}

type GridItemProp = {
  day: Day
  handleDay: (dayModify: Day) => void
}

const GridITem: React.FunctionComponent<GridItemProp> = ({
  day,
  handleDay,
}) => {
  const noWorkingBg = day.isWeekend || day.isHoliday ? '#FA5252' : ''
  const noWorkingColor = day.isWeekend || day.isHoliday ? 'white' : 'black'
  const dateFormat = day.date.toLocaleString('it-IT', {
    weekday: 'long',
    day: '2-digit',
  })

  const toggleWorkingDay = (isWorked: boolean) => {
    const workingHours = isWorked ? 8 : 0
    handleDay({ ...day, isWorked: isWorked, WorkingHours: workingHours })
  }

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        style={{ backgroundColor: noWorkingBg, color: noWorkingColor }}
      >
        <input
          type="checkbox"
          id={`isWorkingDay${day.id}`}
          name={`isWorkingDay${day.id}`}
          value={`${day.isWorked ? 'S' : 'N'}`}
          checked={day.isWorked}
          onChange={(e) => toggleWorkingDay(e.target.checked)}
        />

        <Title size="h6" weight={500} tt="uppercase">
          <label htmlFor={`isWorkingDay${day.id}`}>{`${dateFormat}`} </label>
        </Title>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="xs">
        <Flex direction={`column`}>
          <Text ta="center" fz={32} fw="700">{`${day.WorkingHours}`}</Text>
          <Flex direction={`column`} align={`center`}>
            <div>{day.isHoliday && <div>{`Festivo`}</div>}</div>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  )
}

export { GridITem }
