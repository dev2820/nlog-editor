import { createBrowserRouter } from 'react-router-dom';

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
        element: <PostEditorPage></PostEditorPage>
      },
      {
        path: '/setting',
        element: <SettingPage></SettingPage>
      }
    ]
  }
]);

export default router;
