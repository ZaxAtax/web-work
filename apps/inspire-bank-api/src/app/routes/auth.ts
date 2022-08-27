import { Request, Response } from 'express';
import CognitoService from '../services/cognito';

const cognito = new CognitoService('us-east-1', '3vcdl1a41c86jei227nu846jqk');
export const loginHandler = (req: Request, res: Response) => {
  cognito
    .login(req.body.username, req.body.password)
    .then((cognitoRes) => {
      if (!cognitoRes.ChallengeName) {
        const { AccessToken, RefreshToken, IdToken } =
          cognitoRes.AuthenticationResult;
        res.json({
          accessToken: AccessToken,
          refreshToken: RefreshToken,
          idToken: IdToken,
        });
      }
    })
    .catch(() => {
      res.status(403).send('Incorrect Username or Password');
    });
};

export const refreshHandler = (req: Request, res: Response) => {
  cognito
    .refresh(req.headers.authorization?.replace('/BEARER /', ''))
    .then((cognitoRes) => {
      if (!cognitoRes.ChallengeName) {
        const { AccessToken, RefreshToken, IdToken } =
          cognitoRes.AuthenticationResult;
        res.json({
          accessToken: AccessToken,
          refreshToken: RefreshToken,
          idToken: IdToken,
        });
      }
    })
    .catch(() => {
      res.status(403).send('Bad Refresh Token');
    });
};

export const signUpHandler = (req: Request, res: Response) => {
  cognito
    .signUp(req.body.username, req.body.password)
    .then((cognitoRes) => {
      res.json({
        success: true,
        confirmed: cognitoRes.UserConfirmed,
      });
    })
    .catch((err) => {
        console.error(err)
      res.status(400).send('Bad Request');
    });
};

export const confirmSignUpHandler = (req: Request, res: Response) => {
  cognito
    .confirmSignUp(req.body.username, req.body.confirmationCode)
    .then((cognitoRes) => {
      if (cognitoRes.$metadata.httpStatusCode === 200) {
        res.status(200).send('Success');
      } else {
        res.status(403).send('Error');
      }
    })
    .catch(() => {
      res.status(403).send('Error');
    });
};

export const forgotPasswordHandler = (req: Request, res: Response) => {
  cognito
    .forgotPassword(req.body.username)
    .then((cognitoRes) => {
      if (cognitoRes.$metadata.httpStatusCode === 200) {
        res.status(200).send('Success');
      } else {
        res.status(403).send('Error');
      }
    })
    .catch(() => {
      res.status(403).send('Error');
    });
};

export const confirmForgotPasswordHandler = (req: Request, res: Response) => {
  cognito
    .confirmForgotPassword(
      req.body.username,
      req.body.password,
      req.body.confirmationCode
    )
    .then((cognitoRes) => {
      if (cognitoRes.$metadata.httpStatusCode === 200) {
        res.status(200).send('Success');
      } else {
        res.status(403).send('Error');
      }
    })
    .catch(() => {
      res.status(403).send('Error');
    });
};
