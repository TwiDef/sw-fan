import { PARAM_PAGE } from "./constants";

export const getPageId = (url) => {
  const pos = url.lastIndexOf(PARAM_PAGE)
  const id = url.slice(pos + PARAM_PAGE.length, url.length)
  return +id
}

export const getNumFromStr = (string) => {
  return (string).replace(/[^0-9]/g, '')
}

export const getEpisodeSymbol = (id) => {
  switch (id) {
    case 1:
      return "I"
    case 2:
      return "II"
    case 3:
      return "III"
    case 4:
      return "IV"
    case 5:
      return "V"
    case 6:
      return "VI"
    default:
      return "X"
  }
}