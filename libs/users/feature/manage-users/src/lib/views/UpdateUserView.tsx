import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import { LoadUserContainer, UpdateUserContainer } from '../containers';

export function UpdateUserView() {
  const { userId } = useParams();

  if (userId == null) {
    return <ErrorMessage message="No user ID"></ErrorMessage>;
  } else {
    return (
      <LoadUserContainer userId={parseInt(userId, 10)}>
        <UpdateUserContainer />
      </LoadUserContainer>
    );
  }
}
