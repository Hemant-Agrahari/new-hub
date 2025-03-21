import React from 'react';
import Pagination from '@mui/material/Pagination';

interface CustomPaginationProps {
  page: number;
  count: number;
  className: string;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  variant?: 'outlined' | 'text';
  shape?: 'rounded' | 'circular'; 
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  onChange,
  className,
  variant = 'outlined',
  shape = 'rounded',
}) => {
  return (
    <Pagination
      className={className}
      page={page}
      count={count}
      onChange={onChange}
      variant={variant}
      shape={shape}
    />
  );
};

export default CustomPagination;
