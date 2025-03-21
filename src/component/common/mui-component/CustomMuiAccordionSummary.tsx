import React from 'react';
import { AccordionSummary, AccordionSummaryProps } from '@mui/material';
import { styled } from '@mui/system';

const CustomMuiAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  // Customize the expand icon's appearance when expanded
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)', // Rotate the expand icon when expanded
    border: 'none', 
    color: 'var(--white)',
  },

  '& .MuiAccordionSummary-content': {
    border: 'none',
  },
}));

export default CustomMuiAccordionSummary;
