export * as DateTimeUtilities from './datetime'

export function dateToISO(date: string) {
  const valid = new Date(date).toString() !== 'Invalid Date'
  if (!valid) throw new Error(`Invalid date: ${date}`)
  return new Date(date).toISOString()
}
