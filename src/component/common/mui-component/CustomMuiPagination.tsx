import React from 'react'
import Pagination from '@mui/material/Pagination'

interface CustomPaginationProps {
  pageSkip: number
  className: string
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
  variant?: 'outlined' | 'text'
  shape?: 'rounded' | 'circular'
  totalCount: number
  pageLimit: number
}

const CustomMuiPagination: React.FC<CustomPaginationProps> = ({
  pageSkip,
  onChange,
  className,
  variant = 'outlined',
  shape = 'rounded',
  totalCount,
  pageLimit,
}) => {
  const count = Math.ceil((Number(totalCount ?? 0) || 1) / Number(pageLimit))
  return (
    <Pagination
      className={className}
      page={pageSkip / 10 + 1}
      count={count}
      onChange={onChange}
      variant={variant}
      shape={shape}
    />
  )
}

export default CustomMuiPagination
