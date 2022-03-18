import React from 'react';
import { UserProvider } from './contexts/userContext';

import './app.scss';

import Comments from './components/comments/Comments';

const App = () => {

  return (
    <UserProvider>
      <main>
        <Comments />
      </main>
    </UserProvider>
  )
}

export default App;