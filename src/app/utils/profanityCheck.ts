import BadWords from 'bad-words'
import brandsBanned from '../constants/bannedLists/brands'
import environmentBanned from '../constants/bannedLists/environment'
import generalBanned from '../constants/bannedLists/general'
import politicalBanned from '../constants/bannedLists/political'
import famousBanned from '../constants/bannedLists/famous'
import famousFirstBanned from '../constants/bannedLists/famousFirst'
import famousLastBanned from '../constants/bannedLists/famousLast'
import religionBanned from '../constants/bannedLists/religion'
import threeLetterBannedWord from '../constants/bannedLists/threeLetterWord'
import { BannedCategory } from './bannedCheck'

const ProfanityChecker = new BadWords({
  list: [
    ...brandsBanned,
    ...environmentBanned,
    ...politicalBanned,
    ...religionBanned,
    ...threeLetterBannedWord
  ]
})

const ProfanityGeneralChecker = new BadWords({
  list: generalBanned
})

function profanityCheck(word: string) {
  if (ProfanityChecker.isProfane(word)) {
    return BannedCategory.General
  }
  if (ProfanityGeneralChecker.isProfane(word)) {
    return BannedCategory.Sexual
  }
  return null
}

export default profanityCheck
