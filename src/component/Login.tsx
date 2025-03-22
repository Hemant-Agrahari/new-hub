import { useState } from 'react'
import {
  IconButton,
  Box,
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  Dialog,
} from '@mui/material'
import { VisibilityOff, Visibility, Email, Https } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { useAppDispatch } from '@/redux/hooks'
import { useFormik } from 'formik'
import SignIn from './authForms/Signin'
import { toast } from 'react-toastify'
import { setUser } from '@/redux/user/userReducer'
import { useRouter } from 'next/router'
import { Button, CustomOutlinedInput } from './common'
import ForgetPasswordPopup from './ForgotPassword'
import { useMutateData } from '@/services'
import { Dispatch, SetStateAction } from 'react'
import { clearBTInstance, refreshComponent } from '@/redux/btSlice/btSlice'
import { logError } from '@/utils'
import { useTranslation } from 'react-i18next'
import FormErrorMessage from './common/FormErrorMessage'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { validationMsg } from '@/utils/validationMsg'

type LoginProps = {
  handleCloseLoginModal: (redirection?: boolean) => void
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>
  tabIndex: number
  setTabIndex: Dispatch<SetStateAction<number>>
}

const Login: React.FC<LoginProps> = ({
  handleCloseLoginModal,
  tabIndex,
  setTabIndex,
  setOpenLoginModal,
}: {
  handleCloseLoginModal: (redirection?: boolean) => void
  tabIndex: number
  setTabIndex: (index: number) => void
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { mutateData, isMutating } = useMutateData()
  const { t } = useTranslation()
  const handleTabChange = (event: any, newTabIndex: any) => {
    setTabIndex(newTabIndex)
  }
  const [openForgetPasswordModal, setOpenForgetPasswordModal] = useState(false)
  const handleCloseForgetPassword = () => setOpenForgetPasswordModal(false)

  const handleForgetPassword = () => {
    setOpenForgetPasswordModal(true)
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  const validationSchema = z.object({
    email: z
      .string()
      .email(`${t(validationMsg.email.invalidEmail)}`)
      .nonempty(t(validationMsg.email.require)),
    password: z.string().nonempty(t(validationMsg.password.require)),
  })

  type ValidationSchemaType = z.infer<typeof validationSchema>

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      const obj = {
        email: values.email,
        password: values.password,
      }
      mutateData('signIn', {
        body: {
          ...obj,
        },
      })
        .then((res) => {
          if (res.data.result === null) {
            toast.error(res.data.message)
            return
          }
          dispatch(setUser(res.data?.[0]))
          toast.success(res?.message)

          if (router.pathname === '/sport-bet') {
            dispatch(clearBTInstance())
            dispatch(refreshComponent())
          } else if (router.pathname === '/') {
            router.replace('/')
          }
          handleCloseLoginModal(true)
          formik.resetForm()
        })
        .catch((err) => {
          logError(err)
        })
    },
  })

  return (
    <div
      className={`modal-content ${openForgetPasswordModal ? 'd-none' : ''} `}
    >
      <div className="modal_closebtn">
        <Button
          type="button"
          className="close_form_btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <CloseIcon
            className="text-white"
            onClick={() => handleCloseLoginModal()}
          />
        </Button>
      </div>
      <div className="modal-body">
        <Box className="TabLogin_Signup">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label={t('Log in')} disableRipple={true} />
            <Tab label={t('Sign up')} disableRipple={true} />
          </Tabs>
        </Box>
        <Box>
          {tabIndex === 0 && (
            <form
              className="modal_form_signIn mt-xxl-5 mt-lg-5 mt-3"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-2">
                <Box>
                  <CustomOutlinedInput
                    placeholder={t('E-mail')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Email className="text-white" />
                      </InputAdornment>
                    }
                    fullWidth
                    {...formik.getFieldProps('email')}
                  />
                  <FormErrorMessage
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                </Box>
                <Box>
                  <CustomOutlinedInput
                    className="mt-4"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('Password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Https className="text-white" />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff className="text-white" />
                          ) : (
                            <Visibility className="text-white" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    {...formik.getFieldProps('password')}
                  />
                  <FormErrorMessage
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                </Box>
                <Box className="d-flex align-items-center justify-content-end">
                  <Typography
                    className="font-weight-600 mt-3 cursor-pointer login-forgot-text"
                    onClick={() => {
                      handleForgetPassword()
                    }}
                  >
                    {t('Forgot Password')}?
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  className="modal-btn-losign mt-3"
                  isLoading={isMutating}
                >
                  {t('Log in')}
                </Button>
                <h6 className="mt-3">
                  <span className="f-16 login-age-verify-text">
                    {t(
                      'To visit this site, please ensure that you are over 18 and agree to the',
                    )}
                    &nbsp;
                  </span>
                  <span
                    className="f-15 text-white cursor-pointer"
                    onClick={() => {
                      handleCloseLoginModal()
                      router.push('/privacy-policy?tab=0')
                    }}
                  >
                    <u>{t('Terms & Conditions')}</u>
                  </span>
                </h6>
              </div>
            </form>
          )}
          {tabIndex === 1 && (
            <SignIn handleCloseLoginModal={handleCloseLoginModal} />
          )}
        </Box>
        <Dialog
          className="signUpModaluniversal"
          open={openForgetPasswordModal}
          onClose={setOpenForgetPasswordModal}
          scroll="body"
        >
          <ForgetPasswordPopup
            handleCloseForgetPassword={handleCloseForgetPassword}
            setOpenForgetPasswordModal={setOpenForgetPasswordModal}
          />
        </Dialog>
      </div>
    </div>
  )
}
export default Login
