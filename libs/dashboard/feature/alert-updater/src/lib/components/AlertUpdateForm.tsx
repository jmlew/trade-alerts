import { ChangeEvent, useEffect, useState } from 'react';

import { DashSelector } from '@kdb-dash/dashboard/ui/controls';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';

import { AlertActionType } from '../entities/alert-updater.enum';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import { getAlertActionOptions } from '../entities/alert-updater.util';

const styles = {
  root: (isPending: boolean) => ({ width: 1, opacity: isPending ? 0.4 : 1 }),
  comments: {
    mt: 1,
    color: 'white',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 3,
    pt: 3,
    borderTop: `1px solid ${themeColors.borderDark}`,
  },
  btnSubmit: { ml: 2 },
};

interface AlertUpdateFormProps {
  initialValues: AlertUpdateFormParams;
  isPending: boolean;
  onSubmit: (values: AlertUpdateFormParams) => void;
  onCancel: () => void;
}

export function AlertUpdateForm({
  initialValues,
  isPending,
  onSubmit,
  onCancel,
}: AlertUpdateFormProps) {
  const [values, setValues] = useState<AlertUpdateFormParams>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function handleSubmit() {
    onSubmit(values);
  }

  function handleActionChange(action: AlertActionType) {
    setValues({ ...values, action });
  }

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, comment: event.target.value });
  };

  const { action, comment } = values;
  return (
    <Box sx={styles.root(isPending)}>
      <Typography sx={{ mb: 1 }} variant="body2" color="primary.main">
        Action Type
      </Typography>
      <DashSelector
        value={action}
        isDisabled={isPending}
        onChange={handleActionChange}
        options={getAlertActionOptions()}
      />
      <Typography sx={{ mt: 4, mb: 2 }} variant="body2" color="primary.main">
        Comments (optional)
      </Typography>
      <Box sx={styles.comments}>
        <TextField
          multiline
          fullWidth
          maxRows={6}
          disabled={isPending}
          value={comment || ''}
          onChange={handleCommentChange}
        />
      </Box>
      <Box sx={styles.actions}>
        <Button onClick={onCancel}>Cancel</Button>
        <LoadingButton
          sx={styles.btnSubmit}
          loading={isPending}
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
}