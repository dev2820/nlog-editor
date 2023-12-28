import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { PostEditorPage } from './pages/PostEditorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <PostEditorPage></PostEditorPage>
      }
    ]
  }
]);

export default router;
