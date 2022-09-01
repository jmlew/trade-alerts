import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppHome } from '@kdb-dash/home/feature';
import { Loading } from '@kdb-dash/shared/ui-common';
import { UsersShell } from '@kdb-dash/users/shell';

import { AppShell } from './AppShell';
import { PageNotFound } from './PageNotFound';

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
              <UsersShell />
            </Suspense>
          }
        />
        <Route path="home" element={<AppHome />} />
        <Route path="" element={<Navigate to="home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
