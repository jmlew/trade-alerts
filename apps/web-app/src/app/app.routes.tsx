import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppHome } from '@kdb-dash/home/feature';
import { Loading } from '@kdb-dash/shared/ui-common';
import { PageNotFound } from '@kdb-dash/shell/ui';
import { UsersRoutes } from '@kdb-dash/users/feature/manage-users';

import { AppShell } from './AppShell';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <AppShell />
          </Suspense>
        }
      >
        {/* Children routes are declared within AppShell @Code{ Outlet } directive */}
        <Route
          path="users/*"
          element={
            <Suspense fallback={<Loading />}>
              <UsersRoutes />
            </Suspense>
          }
        />
        <Route path="home" element={<AppHome />} />
        <Route path="" element={<Navigate to="home" />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
