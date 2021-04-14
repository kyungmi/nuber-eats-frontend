import React, { FC } from 'react';

interface FormErrorPorps {
  errorMessage: string;
}

export const FormError: FC<FormErrorPorps> = ({ errorMessage }) => {
  return (
    <span className="text-left ont-medium text-red-500">{errorMessage}</span>
  );
};
