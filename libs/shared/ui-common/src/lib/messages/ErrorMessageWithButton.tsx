import { ReactNode } from 'react';

import { Button } from '@mui/material';

import { ErrorMessage } from './ErrorMessage';

interface Props {
  top?: number;
  label: string;
  children: ReactNode;
  onClick: () => void;
}

export function ErrorMessageWithButton({ top, label, children, onClick }: Props) {
  return (
    <>
      <ErrorMessage top={top}>{children}</ErrorMessage>
      <Button variant="contained" onClick={onClick} sx={{ mt: 3 }}>
        {label}
      </Button>
    </>
  );
}
