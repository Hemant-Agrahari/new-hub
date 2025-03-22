// External dependencies
import { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { Email, Https, Visibility, VisibilityOff } from '@mui/icons-material'
import RedeemIcon from '@mui/icons-material/Redeem'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import { CustomOutlinedInput } from '../common'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/user/userReducer'
import { useMutateData } from '@/services'
import { Button } from '../common'
import { logError } from '@/utils'
import { clearBTInstance, refreshComponent } from '@/redux/btSlice/btSlice'
import { useTranslation } from 'react-i18next'
import FormErrorMessage from '../common/FormErrorMessage'
import { validationMsg } from '@/utils/validationMsg'
import { passwordRegex } from '@/utils/regex'

const SignIn = ({
  handleCloseLoginModal,
}: {
  handleCloseLoginModal: () => void
}) => {
  const router = useRouter()
  const { mutateData, isMutating } = useMutateData()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const searchParams = new URLSearchParams(document.location.search)
  const referralCode = searchParams?.get('referralcode')
  const agentId = searchParams?.get('agentId')

  // Define validation schema using zod
  const validationSchema = z.object({
    email: z
      .string()
      .email(`${t(validationMsg.email.invalidEmail)}`)
      .nonempty(t(validationMsg.email.require)),
    password: z
      .string()
      .nonempty(t(validationMsg.password.require))
      .regex(passwordRegex, t(validationMsg.password.match))
      .min(6, { message: t(validationMsg.password.min) })
      .max(15, { message: t(validationMsg.password.max) }),
    inviteCode: z.string().optional(),
    agentId: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: t(validationMsg.termsConditions.require),
    }),
    promotions: z.boolean(),
  })

  type ValidationSchemaType = z.infer<typeof validationSchema>
  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      email: '',
      password: '',
      inviteCode: referralCode ? referralCode : '',
      agentId: agentId ? agentId : '',
      terms: false,
      promotions: true,
    },
    validate: withZodSchema(validationSchema),
    onSubmit: (values) => {
      const obj = {
        email: values.email,
        password: values.password,
        invitationCode: values.inviteCode,
        recieveMail: values.promotions,
        agentId: values.agentId,
      }
      mutateData(`signUp`, {
        body: { ...obj },
      })
        .then((res) => {
          if (res?.status === 'success') {
            handleCloseLoginModal()
            dispatch(setUser(res.data?.[0]))
            toast.success(res.message)
            formik.resetForm()

            if (router.pathname === '/sport-bet') {
              dispatch(clearBTInstance())
              dispatch(refreshComponent())
            } else {
              router.push('/')
            }
          }
          toast.error(res.data.message)
          return
        })
        .catch((err) => {
          toast.error('Something Went Wrong')
          logError(err)
        })
    },
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <form className="mt-5" onSubmit={formik.handleSubmit}>
      <div>
        <Box>
          <CustomOutlinedInput
            placeholder={t('E-mail')}
            startAdornment={
              <InputAdornment position="start">
                <Email className="text-white" />
              </InputAdornment>
            }
            autoComplete="off"
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
            autoComplete="off"
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
                  onMouseDown={() => handleMouseDownPassword}
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
        <Box>
          <CustomOutlinedInput
            className="mt-4"
            id="input-with-icon-textfield"
            placeholder={t('Invitation Bonus Code (Optional)')}
            fullWidth
            readOnly={referralCode && referralCode.length > 0 ? true : false}
            disabled={
              formik.values.agentId && formik.values.agentId.length > 0
                ? true
                : false
            }
            {...formik.getFieldProps('inviteCode')}
            startAdornment={
              <InputAdornment position="start">
                <RedeemIcon className="text-white" />
              </InputAdornment>
            }
          />
          <FormErrorMessage
            error={formik.errors.inviteCode}
            touched={formik.touched.inviteCode}
          />
        </Box>
        <Box>
          <CustomOutlinedInput
            className="mt-4"
            id="input-with-icon-textfield"
            placeholder={t('Agent Id (Optional)')}
            fullWidth
            readOnly={agentId && agentId.length > 0 ? true : false}
            disabled={
              formik.values.inviteCode && formik.values.inviteCode.length > 0
                ? true
                : false
            }
            {...formik.getFieldProps('agentId')}
            startAdornment={
              <InputAdornment position="start">
                <SupportAgentOutlinedIcon className="text-white" />
              </InputAdornment>
            }
          />
          <FormErrorMessage
            error={formik.errors.agentId}
            touched={formik.touched.agentId}
          />
        </Box>
        <Box className="d-flex align-items-center mt-2">
          <Checkbox className='border-none signin-checkbox-icon'
            {...formik.getFieldProps('terms')}
          />
          <div>
            <Typography variant="body1" className='ml-1' sx={{ color: 'var(--gray-100)'}}>
              {t('I am at least 18 years old and have read and agree to the')}
              &nbsp;
              <u
                className="text-white cursor-pointer"
                onClick={() => {
                  handleCloseLoginModal()
                  router.push('/privacy-policy?tab=0')
                }}
              >
                {t('Terms & Conditions')}
              </u>
              &nbsp;{t('and')} &nbsp;
              <u className='text-white cursor-pointer'
                onClick={() => {
                  handleCloseLoginModal()
                  router.push('/privacy-policy?tab=1')
                }}
              >
                {t('Privacy Policy')}
              </u>
            </Typography>
          </div>
        </Box>
        <FormErrorMessage
          error={formik.errors.terms}
          touched={formik.touched.terms}
        />
        <Box className="d-flex align-items-center mt-1">
          <Checkbox className='promotion-checkbox-icon'
            defaultChecked
            {...formik.getFieldProps('promotions')}
            
          />
          <div>
            <Typography
              variant="body1"
              sx={{ color: 'var(--gray-100)' }}
              className="mt-1"
            >
              {t('Receive promotions by Email')}
            </Typography>
          </div>
        </Box>

        <Button
          type="submit"
          className="modal-btn-losign mt-3"
          isLoading={isMutating}
        >
          {t('Sign up')}
        </Button>
      </div>
    </form>
  )
}

export default SignIn
