import { useMediaQuery } from '@react-hook/media-query'

const MIN_WIDTH = '768px'

export const getContainerClasses = () => {
  const isWideScreen = useMediaQuery(`(min-width: ${MIN_WIDTH})`)
  return isWideScreen ? 'flex mb-4' : 'flex flex-col mb-4'
}

export const getHalfContainerClasses = () => {
  const isWideScreen = useMediaQuery(`(min-width: ${MIN_WIDTH})`)
  return isWideScreen ? 'w-1/2' : 'w-full'
}

export const getSelectClasses = () => {
  const isWideScreen = useMediaQuery(`(min-width: ${MIN_WIDTH})`)
  return isWideScreen
    ? 'w-full border border-gray-300 rounded p-2 text-center'
    : 'w-full border border-gray-300 rounded p-2 text-center'
}

export const getInputClasses = () => {
  const isWideScreen = useMediaQuery(`(min-width: ${MIN_WIDTH})`)
  return isWideScreen
    ? 'w-full border border-gray-300 rounded p-2 text-center'
    : 'w-full border border-gray-300 rounded p-2 text-center'
}