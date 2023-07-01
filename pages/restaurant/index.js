import React from 'react'
import SearchBar from '@/components/ui/buttons/SearchBar'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn'
import IconBtn from '@/components/ui/buttons/IconBtn'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import HashTag from '@/components/ui/hashtag/HashTag'
import RateStarPill from '@/components/ui/rateStar/RateStarPill'
import RateStar from '@/components/ui/rateStar/RateStar'

export default function Restindex() {
  return (
    <>
      <SearchBar />
      <MainBtn text="找我的寶寶" />
      <SecondaryBtn text="找我的寶寶" />
      <IconBtn icon={faMap} text="我的地圖" />
      <HashTag text="免費食物" />
      <RateStarPill score="4.8" />
      <RateStar score="4.5" text="(50人已預約)" />
    </>
  )
}
