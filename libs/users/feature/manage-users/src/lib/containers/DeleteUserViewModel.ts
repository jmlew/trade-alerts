import { useState } from 'react';

import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { userFacade } from '@trade-alerts/users/domain';

interface Props {
  deleteUserId: number | null;
  deleteState: ApiState | null;
  deleteStateRef: ApiStateReference;
  deleteUser: (userId: number) => void;
  resetDelete: () => void;
}

export function DeleteUserViewModel(): Props {
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const deleteState: ApiState | null = useObservable<ApiState>(
    userFacade.usersWriteState$
  );
  const deleteStateRef: ApiStateReference = useApiStateReference(deleteState);

  function deleteUser(userId: number) {
    setDeleteUserId(userId);
    userFacade.deleteUser(userId, true);
  }

  function resetDelete() {
    userFacade.resetWriteState();
  }

  return { deleteUserId, deleteUser, resetDelete, deleteState, deleteStateRef };
}
