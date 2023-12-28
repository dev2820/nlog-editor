import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { PageLayout } from './layouts/PageLayout';
import { PostEditorPage } from './pages/PostEditorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <PageLayout>
            <PostEditorPage></PostEditorPage>
          </PageLayout>
        )
      }
    ]
  }
]);

export default router;
