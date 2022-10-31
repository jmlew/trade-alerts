import { useFormik } from 'formik';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  FormParamUser,
  createValidationSchema,
  formAutocompleteMap,
  formLabelMap,
  isFieldError,
} from '@trade-alerts/shared/util-form';
import { UserDetails, UserRecord } from '@trade-alerts/users/domain';

interface UserDetailsFormProps {
  user?: UserRecord;
  initialValues: UserDetails;
  onSubmit: (values: UserDetails) => void;
  onCancel: () => void;
}

export function UserDetailsForm({
  user,
  initialValues,
  onSubmit,
  onCancel,
}: UserDetailsFormProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createValidationSchema([
      FormParamUser.FirstName,
      FormParamUser.LastName,
      FormParamUser.Email,
    ]),
  });

  if (!formik.isValid) {
    console.log(formik.errors);
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ pt: 4, pb: 2, px: 4 }}>
            <Typography variant="h4" color="textPrimary">
              {user == null ? 'New User' : `Edit User ${user.id}`}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, ml: 0.3 }}
            >
              Sample MUI form using Formik.
            </Typography>
            <Divider flexItem={true} sx={{ my: 3 }} />
            <TextField
              {...formik.getFieldProps(FormParamUser.FirstName)}
              error={isFieldError(FormParamUser.FirstName, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.FirstName)}
              autoComplete={formAutocompleteMap.get(FormParamUser.FirstName)}
              helperText={formik.errors[FormParamUser.FirstName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(FormParamUser.LastName)}
              error={isFieldError(FormParamUser.LastName, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.LastName)}
              autoComplete={formAutocompleteMap.get(FormParamUser.LastName)}
              helperText={formik.errors[FormParamUser.LastName]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...formik.getFieldProps(FormParamUser.Email)}
              error={isFieldError(FormParamUser.Email, formik.touched, formik.errors)}
              label={formLabelMap.get(FormParamUser.Email)}
              autoComplete={formAutocompleteMap.get(FormParamUser.Email)}
              helperText={formik.errors[FormParamUser.Email]}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Divider flexItem={true} sx={{ mt: 3 }} />
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', mr: 3, mb: 2 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
