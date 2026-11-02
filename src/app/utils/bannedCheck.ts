import brandsBanned from '../constants/bannedLists/brands'
import environmentBanned from '../constants/bannedLists/environment'
import generalBanned from '../constants/bannedLists/general'
import politicalBanned from '../constants/bannedLists/political'
import religionBanned from '../constants/bannedLists/religion'
import threeLetterBannedWord from '../constants/bannedLists/threeLetterWord'

enum BannedCategory {
  Brands = 'Brands',
  Environment = 'Environment',
  General = 'General',
  Political = 'Political',
  Religion = 'Religion',
  ThreeLetterWord = 'ThreeLetterWord',
  Hate = 'Hate',
  Sexual = 'Sexual',
  Violence = 'Violence'
}

function lowercaseAll(list: string[]) {
  return list.map(value => value.toLowerCase())
}

// const brandsList = new Set(lowercaseAll(brandsBanned))
const environmentList = new Set(lowercaseAll(environmentBanned))
const generalList = new Set(lowercaseAll(generalBanned))
const politicalList = new Set(lowercaseAll(politicalBanned))
const religionList = new Set(lowercaseAll(religionBanned))
const threeLetterWordList = new Set(lowercaseAll(threeLetterBannedWord))

const bannedWord = (word: string) => {
  if (environmentList.has(word)) {
    return BannedCategory.Environment
  } else if (generalList.has(word)) {
    return BannedCategory.Sexual
  } else if (politicalList.has(word)) {
    return BannedCategory.Political
  } else if (religionList.has(word)) {
    return BannedCategory.Religion
  } else if (threeLetterWordList.has(word)) {
    return BannedCategory.ThreeLetterWord
  }
  return null
}

const bannedCheck = (text: string) => {
  let bannedCategory = bannedWord(text.toLowerCase())
  if (bannedCategory) {
    return bannedCategory
  }

  const textSeparated = text.split(' ')

  if (textSeparated.length > 1) {
    textSeparated.some(word => {
      const bannedFound = bannedWord(word)
      if (bannedFound) {
        bannedCategory = bannedFound
        return true
      }
      return false
    })
  }

  return bannedCategory
}

export { BannedCategory }

export default bannedCheck
