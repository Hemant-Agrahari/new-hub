import { OutlinedInput, styled } from '@mui/material'

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  background: 'var(--gray-600, --gray-500)',
  borderRadius: '8px',
  '& .MuiOutlinedInput-input': {
    color: 'var(--white)', 
    border: 'none',
    background: 'transparent',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'var(--white)',
    opacity: 1,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    borderColor: 'transparent',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--white)',
  },
  '& .MuiInputAdornment-root': {
    color: 'var(--white)',
  },
}))
export default CustomOutlinedInput
