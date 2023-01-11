import dayjs from 'dayjs'
import pasta_wasm_node from '@giraugh/pasta/pkg-node/pasta_lib'

export const load = async () => {
  const date = new Date()
  const holidayName = pasta_wasm_node
    .get_holiday_for_date_string(dayjs(date).format())
    ?.name

  return {
    holidayName,
    date,
  }
}
