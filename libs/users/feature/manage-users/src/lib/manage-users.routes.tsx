import { Route, Routes } from 'react-router-dom';

import { CreateUserView } from './views/CreateUserView';
import { UpdateUserView } from './views/UpdateUserView';
import { UsersView } from './views/UsersView';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="" element={<UsersView />} />
      <Route path=":userId" element={<UpdateUserView />} />
      <Route path="/new" element={<CreateUserView />} />
    </Routes>
  );
}
