import React from 'react';
import { Accordion as MuiAccordion, AccordionProps } from '@mui/material';
import { styled } from '@mui/system';

const CustomMuiAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginBottom: 'clamp(16px, 4px + 1.2vw, 32px)',
  backgroundColor: 'var(--gray-600)',
  borderRadius: 'clamp(10px, 4px + 1vw, 24px)',
  padding: 'clamp(8px, 4px + .5vw, 12px)',
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

export default CustomMuiAccordion;
