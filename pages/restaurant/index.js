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
      <SearchBar placeholder="放置placeholder的地方" />
      <MainBtn text="主要按鈕" />
      <SecondaryBtn text="次要按鈕" />
      <IconBtn icon={faMap} text="icon按鈕" />

      <RateStarPill score="4.2" />
      <RateStar score="4.5" text="(50人已預約)" />

      <HashTag text="免費食物" />
      <HashTag text="可放繩" />
      <HashTag text="免費水" />
    </>
  )
}
