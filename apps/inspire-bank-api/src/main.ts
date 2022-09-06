import * as express from 'express';
import cors = require('cors');
import {
  loginHandler,
  refreshHandler,
  signUpHandler,
  confirmSignUpHandler,
  forgotPasswordHandler,
  confirmForgotPasswordHandler,
} from './app/routes/auth';
import { accountsHandler } from './app/routes/storage';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginHandler);
app.post('/auth/refresh', refreshHandler);
app.post('/auth/signup', signUpHandler);
app.post('/auth/signup/confirm', confirmSignUpHandler);
app.post('/auth/forgotpassword', forgotPasswordHandler);
app.post('/auth/forgotpassword/confirm', confirmForgotPasswordHandler);

app.get('/accounts', accountsHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
