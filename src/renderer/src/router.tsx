import { Outlet, createBrowserRouter } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { PostEditorPage } from '@/pages/PostEditorPage';
import { SettingPage } from '@/pages/SettingPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/editor',
        element: <Outlet></Outlet>,
        children: [
          {
            index: true,
            element: <PostEditorPage></PostEditorPage>
          },
          {
            path: ':id',
            element: <PostEditorPage></PostEditorPage>
          }
        ]
      },
      {
        path: '/setting',
        element: <SettingPage></SettingPage>
      },
      {
        path: '*',
        element: <LandingPage></LandingPage>
      }
    ]
  }
]);

export default router;
