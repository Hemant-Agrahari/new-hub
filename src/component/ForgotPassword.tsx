import { Box, InputAdornment, OutlinedInput } from '@mui/material'
import { FormikHelpers, useFormik } from 'formik'
import { useMutateData } from '@/services'
import { toast } from 'react-toastify'
import { Button, CustomOutlinedInput } from './common'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { logError } from '@/utils'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { validationMsg } from '@/utils/validationMsg'
import { withZodSchema } from 'formik-validator-zod'

const ForgetPasswordPopup = ({
  handleCloseForgetPassword,
}: {
  handleCloseForgetPassword: () => void
  setOpenForgetPasswordModal: (value: boolean) => void
}) => {
  const { mutateData, isMutating } = useMutateData()
  const { t } = useTranslation()

  const validationSchema = z.object({
    resetEmail: z
      .string()
      .email(`${t(validationMsg.email.invalidEmail)}`)
      .nonempty(t(validationMsg.email.require)),
  })
  type ValidationSchemaType = z.infer<typeof validationSchema>

  const handleLoginSubmit = (
    values: { resetEmail: string },
    formikHelpers: FormikHelpers<{ resetEmail: string }>,
  ) => {
    mutateData('forgotPassword', {
      body: {
        email: values?.resetEmail,
      },
    })
      .then((res) => {
        if (res?.status !== 'success') {
          throw new Error(res?.message)
        }

        toast.success(res?.message)
        formikHelpers.resetForm()
        handleCloseForgetPassword()
      })
      .catch((err) => {
        logError(err)
      })
  }

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      resetEmail: '',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: handleLoginSubmit,
  })

  return (
    <div className="modal-content">
      <div className="modal_closebtn">
        <Button
          type="button"
          className="close_form_btn m-1"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseForgetPassword}
        >
          <CloseIcon className="text-white font-size-32" />
        </Button>
      </div>
      <div className="modal-body">
        <div className="modal_form_signIn">
          <div>
            <h2 className="m-3 mb-4 text-center font-size-22 text-white">
              {t('Forgot Password')}
            </h2>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <CustomOutlinedInput
                  as={OutlinedInput}
                  sx={{
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                    background: 'var(--gray-500)',
                    borderRadius: 2,
                  }}
                  id="input-with-icon-textfield"
                  placeholder={t('E-mail')}
                  startAdornment={
                    <InputAdornment position="start">
                      <Image
                        src={'/assets/images/msg_login_sign.png'}
                        width={30}
                        height={30}
                        alt={t('Mail icon')}
                      />
                    </InputAdornment>
                  }
                  fullWidth
                  {...formik.getFieldProps('resetEmail')}
                />
                {formik.touched.resetEmail && formik.errors.resetEmail ? (
                  <div className="text-danger mt-2 mx-2 fw-bold ">
                    {formik.errors.resetEmail}
                  </div>
                ) : null}
                <Button
                  className="modal-btn-losign mt-3"
                  type="submit"
                  isLoading={isMutating}
                >
                  {t('Submit')}
                </Button>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordPopup
