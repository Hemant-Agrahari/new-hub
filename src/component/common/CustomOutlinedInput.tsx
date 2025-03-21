import { OutlinedInput, styled } from '@mui/material'

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  background: 'var(--gray-600, #3C3F48)',
  borderRadius: '8px',
  '& .MuiOutlinedInput-input': {
    color: 'var(--white)', // Text color
    border: 'none', // Remove border
    background: 'transparent', // Transparent background
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'var(--white)', // Placeholder color
    opacity: 1,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent', // Hide fieldset border
    },
    '&:hover fieldset': {
      borderColor: 'transparent', // Hide fieldset border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent', // Hide fieldset border when focused
    },
    borderColor: 'transparent', // Additional override for border color
  },
  '& .MuiInputLabel-root': {
    color: 'var(--white)', // Label color
  },
  '& .MuiInputAdornment-root': {
    color: 'var(--white)', // Adornment color
  },
}))
export default CustomOutlinedInput
