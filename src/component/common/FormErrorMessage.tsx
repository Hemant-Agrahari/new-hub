import React from 'react';


interface FormErrorMessageProps {
  error: string | undefined; 
  touched: boolean | undefined;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ error, touched }) => {
  if (!touched || !error) return null;
  return <div className="form-error-message text-danger font-weight-800 mt-3">{error}</div>;
}
 
export default FormErrorMessage;
