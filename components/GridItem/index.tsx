import React from 'react'
import { Box, Card, Flex, NumberInput, Title } from '@mantine/core'
import {
  NO_WORKING_DAY_STYLE,
  mappCardStyle,
} from './adapter/gritemITemAdapter'

export type Day = {
  readonly id: number
  date: Date
  WorkingHours: number
  isWeekend: boolean
  isWorked: boolean
  isHoliday: boolean
  isSickDay: boolean
}

type GridItemProp = {
  day: Day
  handleDay: (dayModify: Day) => void
}

const GridITem: React.FunctionComponent<GridItemProp> = ({
  day,
  handleDay,
}) => {
  const cardDayStyle = mappCardStyle(day)

  const dateFormat = day.date.toLocaleString('it-IT', {
    weekday: 'long',
    day: '2-digit',
  })

  const toggleWorkingDay = (isWorked: boolean) => {
    const workingHours = isWorked ? 8 : 0
    handleDay({ ...day, isWorked: isWorked, WorkingHours: workingHours })
  }

  const toggleWorkingHours = (workingHours: number) => {
    const totWorkingHours = workingHours ? workingHours : 0.0

    if (totWorkingHours <= 0) {
      handleDay({ ...day, isWorked: false, WorkingHours: totWorkingHours })
      return
    }

    handleDay({ ...day, isWorked: true, WorkingHours: totWorkingHours })
  }

  const toggleSickDay = (isSickDay: boolean) => {
    const workingHours = isSickDay ? 0 : 8
    handleDay({
      ...day,
      isWorked: isSickDay ? false : true,
      WorkingHours: workingHours,
      isSickDay: isSickDay,
    })
  }

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs" style={cardDayStyle}>
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
          <Box mt={5} mb={5}>
            <label>{`Malattia`} </label>
            <input
              type="checkbox"
              id={`isSickDay${day.id}`}
              name={`isSickDay${day.id}`}
              value={`${day.isSickDay ? 'S' : 'N'}`}
              checked={day.isSickDay}
              onChange={(e) => toggleSickDay(e.target.checked)}
            />
          </Box>
          <div>
            <label>Ore lavorate: </label>
            <Flex direction={`column`}>
              <NumberInput
                value={day.WorkingHours ? day.WorkingHours : 0.0}
                placeholder="Ore Lavorate"
                min={0}
                max={24}
                step={0.05}
                precision={1}
                onChange={(val: number) => toggleWorkingHours(val)}
                disabled={day.isSickDay}
                required
              />
              <Flex direction={`column`} align={`center`} m={2}>
                <div>{day.isHoliday && <div>{`Festivo`}</div>}</div>
              </Flex>
            </Flex>
          </div>
          <div>
            <label>Permessi: </label>
            <Flex direction={`column`}>
              <NumberInput
                value={day.WorkingHours ? day.WorkingHours : 0.0}
                placeholder="Ore Permesso"
                min={0}
                max={24}
                step={0.05}
                precision={1}
                disabled={day.isSickDay}
                onChange={(val: number) => toggleWorkingHours(val)}
                required
              />
              <Flex direction={`column`} align={`center`} m={2}>
                <div>{day.isHoliday && <div>{`Festivo`}</div>}</div>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Card.Section>
    </Card>
  )
}

export { GridITem }
