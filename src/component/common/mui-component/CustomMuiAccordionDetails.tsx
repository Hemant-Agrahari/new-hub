import { AccordionDetails as MuiAccordionDetails, AccordionDetailsProps } from '@mui/material';
import { styled } from '@mui/system';

const CustomMuiAccordionDetails = styled((props: AccordionDetailsProps) => (
  <MuiAccordionDetails {...props} />
))(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0px solid rgba(0, 0, 0, .125)', 
}));

export default CustomMuiAccordionDetails;
