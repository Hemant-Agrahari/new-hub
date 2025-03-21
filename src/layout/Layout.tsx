import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { removeUser, setUser } from '@/redux/user/userReducer'
import { useRouter } from 'next/router'
import { logError } from '@/utils'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { PostMethod } from '@/services/fetchAPI'
import { toast } from 'react-toastify'

const Footer = dynamic(() => import('./Footer'), { ssr: false })
const Header = dynamic(() => import('./Header'), { ssr: false })
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

const Layout = ({ handleSearch, searchQuery, children }: any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [active, setActive] = useState(false)
  const { t } = useTranslation()
  const handleActive = () => {
    setActive(false)
  }

  const fetchData = async () => {
    const local: any = localStorage.getItem('auth')
    const auth: any = JSON.parse(local)
    try {
      const token: any = auth?.token

      if (!token) {
        return
      }

      const obj: any = {
        userId: auth?._id,
      }

      const res: any = await PostMethod('getUserDetails', obj)

      if (res.data?.status !== 'success') {
        throw new Error(res.data.message || t('Something went wrong'))
      }

      if (
        res.data?.result &&
        res.data?.result.length > 0 &&
        res.data.result[0].role !== 'affiliate'
      ) {
        dispatch(setUser(res?.data?.result[0]))
      } else {
        throw new Error(res.data.message || t('Something went wrong'))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        router.push('/').then(() => dispatch(removeUser()))
        toast.error(t('Please login'))
        logError(error)
      }
    }
  }

  useEffect(() => {
    setActive(
      ['/poker-game', '/sport-bet', '/play-game'].includes(router?.asPath) &&
        false,
    )
  }, [router.asPath])

  useEffect(() => {
    fetchData()
  }, [dispatch, router?.asPath])

  if (router.pathname === '/poker-game') {
    return <>{children}</>
  }

  return (
    <>
      <Header
        setActive={setActive}
        active={active}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <Sidebar
        active={active}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleActive={handleActive}
      />

      <main
        className={active ? 'sideBarOpen' : ''}
        style={router.pathname === '/sport-bet' ? { marginBottom: '0px' } : {}}
      >
        {children}
      </main>
      <Footer active={active} />
    </>
  )
}

export default Layout