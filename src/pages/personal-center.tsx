import { BootstrapTooltip } from '@/component/common'
import { Button, Dialog, LinearProgress } from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/redux/hooks'
import { toast } from 'react-toastify'
import { AvatarChangeModal } from '@/component/PersonalCenter'
import WalletPopup from '@/component/HeaderModals/WalletPopup'
import { userProfilePhoto } from '@/utils/data'
import { GetStaticProps } from 'next'
import { commonStaticProps } from '@/utils/translation'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  return commonStaticProps(locale!)
}
const PersonalCenterPage = () => {
  const user = useAppSelector((state) => state.user.user)
  const [Wallet_Anchor, setWallet_Anchor] = useState(0)
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const handleCloseWalletModal = () => setOpenWalletModal(false)
  const { t } = useTranslation()
  const handlePopupTabbing = (id: number) => {
    setWallet_Anchor(id)
    setOpenWalletModal(true)
  }
  const router = useRouter()
  useEffect(() => {
    const token: string | null = localStorage.getItem('auth')
    const authToken = token ? JSON.parse(token) : null

    if (!authToken) {
      router.replace('/')
    }
  }, [])
  const copyId = async () => {
    await navigator.clipboard.writeText(`${user?.playerId}`)
    toast.success(t('ID Copied'))
  }

  const depositPercentage = user?.vipLevelDetails?.depositPer
  const result =
    depositPercentage === undefined
      ? 0
      : depositPercentage >= 100
        ? 100
        : depositPercentage > 0
          ? parseFloat(depositPercentage.toFixed(2))
          : 0

  const betPercentage = user?.vipLevelDetails?.betPer

  const betResult =
    betPercentage === undefined
      ? 0
      : betPercentage >= 100
        ? 100
        : betPercentage > 0
          ? parseFloat(betPercentage.toFixed(2))
          : 0
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const handleTooltipClose = () => {
    setTooltipOpen(false)
  }
  const handleTooltipOpen = () => {
    setTooltipOpen(true)
  }

  return (
    <>
      <div className="container personal-center-container">
        <div className="row mt-4">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex mb-3">
            <div className="personal-center-info p-5">
              <div className="personal-user">
                <h5 className="text-white font-size-18 font-weight-800">
                  {t('Personal Information')}
                </h5>
                <div className="MainUserPI mt-2 mb-2">
                  <Image
                    src={userProfilePhoto[Number(user?.avatar)]?.image}
                    alt={t('UserPhoto')}
                    key={userProfilePhoto[Number(user?.avatar)]?.id}
                    height={200}
                    width={200}
                  />
                </div>
                <h6 className="text-white font-size-16 font-weight-400">
                  {t('Username')}
                  <span className="f-16">
                    {user?.nickName ? user?.nickName : t('User')}
                  </span>
                </h6>
                <h5 className="mt-1 text-white font-size-24 font-weight-500">
                  {user?.playerId ? user?.playerId : t('User')}
                </h5>
                <button className="userButtonCopy mt-2" onClick={copyId}>
                  <Image
                    src={'/assets/images/linking.png'}
                    alt={t('Logo Link')}
                    height={23}
                    width={17}
                  />
                  <span className="m-2">
                    {t('Copy')} {t('id')}
                  </span>
                </button>
              </div>
              <div className="mt-2 d-flex justify-content-between">
                <AvatarChangeModal />
                <div
                  className="icon-userInfo"
                  onClick={() => router.push('/#Game_Section')}
                >
                  <SportsEsportsIcon className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex mb-3">
            <div className="personal-center-info p-5">
              <div className="personal-user">
                <h5 className="text-white font-size-18 font-weight-800">
                  {t('Wallets')}
                </h5>
                <div className="mt-2 d-flex">
                  <h5 className="walletRupee text-white">
                    <Image
                      src="/assets/images/coin.png"
                      alt={t('coin')}
                      width={23}
                      height={23}
                    />
                  </h5>
                  <h5 className="ms-md-2 font-size-26 font-weight-600 yellow-pink">
                    {((user?.chips ?? 0) + (user?.bonusChips ?? 0)).toFixed(2)}
                  </h5>
                </div>
                <div className="walletWithdraw mt-4">
                  <h5 className="text-white font-size-12 font-weight-800">
                    {t('Withdrawal Available')}
                  </h5>
                  <h5 className="walletRupee mt-2">
                    <Image
                      src="/assets/images/coin.png"
                      alt={t('coin')}
                      width={23}
                      height={23}
                    />{' '}
                    {user?.chips ? user?.chips.toFixed(2) : 0}
                  </h5>
                </div>
                <div className="walletWithdraw mt-4">
                  <h5 className="amount-redeemed">
                    {t('Total Amount to be Redeemed')}
                    {/* <ClickAwayListener> */}
                    <BootstrapTooltip
                      disableTouchListener
                      onClose={handleTooltipClose}
                      open={tooltipOpen}
                      arrow
                      title={<span>{t('Non-withdrawable')}</span>}
                    >
                      <Button
                        className="tooltip-btn"
                        onClick={handleTooltipOpen}
                      >
                        <HelpOutlineOutlinedIcon />
                      </Button>
                    </BootstrapTooltip>
                    {/* </ClickAwayListener> */}
                  </h5>
                  <h5 className="font-weight-700 font-size-26">
                    <Image
                      src={'/assets/images/coin.png'}
                      alt={t('coin')}
                      width={23}
                      height={23}
                    />
                    {user?.bonusChips ? user?.bonusChips?.toFixed(2) : 0}
                  </h5>
                </div>
              </div>
              <div className="walletBtnContainer mt-4">
                <button
                  className="walletBtn"
                  onClick={() => handlePopupTabbing(0)}
                >
                  {t('Deposit')}
                </button>
                <button
                  className="walletBtnWithdraw"
                  onClick={() => handlePopupTabbing(1)}
                >
                  {t('Withdraw')}
                </button>
              </div>
              <h6 className="mt-5 cursor-pointer font-size-12 text-align-center walle-history">
                <Link
                  href="/wallet-history"
                  className="text-white font-weight-600"
                >
                  <u>{t('History')}</u>
                </Link>
              </h6>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex mb-3">
            <div className="personal-center-info p-5">
              <div className="personal-user">
                <h5 className="text-white font-size-18 font-weight-800">
                  {t('My VIP Level')}
                </h5>
                <div className="userLevel">
                  <div className="vipImg mt-4">
                    <Image
                      src={'/assets/images/vip_banner.png'}
                      alt="levels"
                      className="level-slider"
                      width={50}
                      height={63}
                    />
                    {/* <h4 className="PersonallevelsPoint">{4}</h4> */}
                  </div>
                </div>
                <h4 className="vip-user-level mt-4">
                  {t('VIP')} {user?.level}
                </h4>
              </div>
              <div className="hpMenu-top-vip">
                <div className="user-levelScore">
                  <div className="userScore">
                    <div className="userScore-col deposit">
                      <div className="title-value">
                        <div className="title">{t('Deposit')}</div>
                        <div className="amount">
                          <Image
                            src={'/assets/images/coin.png'}
                            alt={t('coin')}
                            width={14}
                            height={14}
                            className="coin-margin"
                          />
                          {user?.vipLevelDetails?.currenDeposit?.toFixed(2)}/
                          <span
                            style={{
                              color: 'var(--yellow-vivid)',
                            }}
                          >
                            <Image
                              src="/assets/images/coin.png"
                              alt={t('coin')}
                              width={14}
                              height={14}
                              className="coin-margin ms-1"
                            />
                            {user?.vipLevelDetails?.nextLevelDeposit}
                          </span>
                        </div>
                      </div>
                      <div className="process-score">
                        <LinearProgress
                          variant="determinate"
                          value={result || 0}
                          className="result-linear-progress"
                        />
                        <div className="progressValue"> {result}%</div>
                      </div>
                    </div>
                    <div className="userScore-col betAmount">
                      <div className="title-value">
                        <div className="title">{t('Bet Amount')}</div>{' '}
                        <div className="amount">
                          <Image
                            src="/assets/images/coin.png"
                            alt={t('coin')}
                            width={14}
                            height={14}
                            className="coin-margin"
                          />
                          {user?.vipLevelDetails?.currentBet?.toFixed(2)}/
                          <span
                            style={{
                              color: '#9643FF',
                            }}
                          >
                            <Image
                              src="/assets/images/coin.png"
                              alt={t('coin')}
                              width={14}
                              height={14}
                              className="coin-margin ms-1"
                            />
                            {user?.vipLevelDetails?.nextLevelBet}
                          </span>
                        </div>
                      </div>
                      <div className="process-score">
                        <LinearProgress
                          className="bet-amount-linear-progress"
                          variant="determinate"
                          value={betResult || 0}
                        />
                        <div className="progressValue">{betResult}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="ranking-vip mt-5">
                <Link
                  className="text-white font-weight-600 font-size-15"
                  // href="/game-history"
                  href="/ranking-vip"
                >
                  <u>{t('View')}</u>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>{' '}
      {/* ===== Wallet Popup ===== */}
      <Dialog
        className="WalletModaluniversal"
        open={openWalletModal}
        onClose={handleCloseWalletModal}
        scroll="body"
      >
        <WalletPopup
          handleCloseWalletModal={handleCloseWalletModal}
          Wallet_Anchor={Wallet_Anchor}
          setWallet_Anchor={setWallet_Anchor}
        />
      </Dialog>
    </>
  )
}

export default dynamic(() => Promise.resolve(PersonalCenterPage), {
  ssr: false,
})
