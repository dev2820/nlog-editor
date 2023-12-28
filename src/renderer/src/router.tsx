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
        path: '/setting',
        element: <SettingPage></SettingPage>
      },
      {
        path: '/',
        element: <PostEditorPage></PostEditorPage>
      }
    ]
  }
]);

export default router;
