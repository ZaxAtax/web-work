import { Routes, Route } from 'react-router-dom';

import { Layout, Account, Accounts, Login } from './pages';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import SignUp from './pages/sign-up/sign-up';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:accnumber" element={<Account />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
