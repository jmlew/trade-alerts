import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import { LoadUserContainer } from '../containers/LoadUserContainer';
import { UpdateUserContainer } from '../containers/UpdateUserContainer';

export function UpdateUserView() {
  const { userId } = useParams();

  if (userId == null) {
    return <ErrorMessage>No user ID</ErrorMessage>;
  } else {
    return (
      <LoadUserContainer userId={parseInt(userId, 10)}>
        <UpdateUserContainer />
      </LoadUserContainer>
    );
  }
}
