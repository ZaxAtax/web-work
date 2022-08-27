import * as express from 'express';
import {
  loginHandler,
  refreshHandler,
  signUpHandler,
  confirmSignUpHandler,
  forgotPasswordHandler,
  confirmForgotPasswordHandler,
} from './app/routes/auth';

const app = express();

app.use(express.json());

app.post('/auth/login', loginHandler);
app.post('/auth/refresh', refreshHandler);
app.post('/auth/signup', signUpHandler);
app.post('/auth/signup/confirm', confirmSignUpHandler);
app.post('/auth/forgotpassword', forgotPasswordHandler);
app.post('/auth/forgotpassword/confirm', confirmForgotPasswordHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
