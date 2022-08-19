import { Routes, Route } from 'react-router-dom';

import { Layout, Home, Account, Accounts, Login } from './pages';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:accnumber" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
