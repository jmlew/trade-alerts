import { User } from '@kdb-dash/users/domain';
import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

export interface UsersListProps {
  users: User[];
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

export function UsersList({ users, onEditUser, onDeleteUser }: UsersListProps) {
  return (
    <List>
      {users.map((user: User) => (
        <UsersListItem
          key={user.id}
          user={user}
          onEdit={() => onEditUser(user.id)}
          onDelete={() => onDeleteUser(user.id)}
        />
      ))}
    </List>
  );
}

interface UserItemProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

function UsersListItem({ user, onEdit, onDelete }: UserItemProps) {
  return (
    <ListItem
      divider={false}
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="edit" onClick={onEdit}>
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="edit" onClick={onDelete}>
            <Delete />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.firstName} secondary={user.lastName || null} />
    </ListItem>
  );
}
