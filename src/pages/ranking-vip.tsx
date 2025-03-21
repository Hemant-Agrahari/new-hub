import Login from '@/component/Login'
import { CashbackSection, VipBonus, VipSlider } from '@/component/RankingVip'
import { useAppSelector } from '@/redux/hooks'
import { Dialog } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { commonStaticProps } from '@/utils/translation'
import dynamic from 'next/dynamic'
import { getLocalStorageItem } from '@/utils'

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  return commonStaticProps(locale!)
}

const VipPage = () => {
  let user: any = getLocalStorageItem('auth')
  const router = useRouter()

  useEffect(() => {
    console.log({ user }, typeof user)
    if (!user) {
      router.push('/')
    }
  }, [])

  return (
    <div className="container margin-top-12">
      {/* VIP Bonus ======= */}
      <VipBonus />
      {/* CASHBACK ======= */}
      <CashbackSection />
      {/* SLIDER  ===== */}
      <VipSlider />
    </div>
  )
}

export default dynamic(() => Promise.resolve(VipPage), {
  ssr: false,
})
