import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { UserRecord } from '@trade-alerts/users/domain';

export interface UsersListProps {
  users: UserRecord[];
  isControlsHidden?: boolean;
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

export function UsersList({
  users,
  isControlsHidden,
  onEditUser,
  onDeleteUser,
}: UsersListProps) {
  return (
    <List>
      {users.map((user: UserRecord) => (
        <UsersListItem
          key={user.id}
          user={user}
          isControlsHidden={isControlsHidden ?? false}
          onEdit={() => onEditUser(user.id)}
          onDelete={() => onDeleteUser(user.id)}
        />
      ))}
    </List>
  );
}

interface UserItemProps {
  user: UserRecord;
  isControlsHidden: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function UsersListItem({ user, isControlsHidden, onEdit, onDelete }: UserItemProps) {
  return (
    <ListItem
      divider={false}
      secondaryAction={
        isControlsHidden ? null : (
          <>
            <IconButton edge="start" aria-label="edit" onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="edit" onClick={onDelete}>
              <Delete />
            </IconButton>
          </>
        )
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.firstName} secondary={user.lastName || null} />
    </ListItem>
  );
}
