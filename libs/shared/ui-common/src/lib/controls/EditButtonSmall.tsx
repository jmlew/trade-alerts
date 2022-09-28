import { EditRounded } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

const styles = {
  root: (fontSize: number) => ({
    '& .MuiButton-endIcon > *:nth-of-type(1)': { fontSize },
  }),
};

interface EditButtonSmallProps extends ButtonProps {
  iconSize?: number;
}

export function EditButtonSmall({ iconSize, ...props }: EditButtonSmallProps) {
  const { sx, ...rest } = props;
  return (
    <Button
      variant="text"
      size="small"
      endIcon={<EditRounded />}
      sx={{ ...styles.root(iconSize || 14), ...sx }}
      {...rest}
    >
      {props.children}
    </Button>
  );
}
