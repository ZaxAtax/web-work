import { rds } from '../services/rds';
import { Request, Response } from 'express';
import { cognito } from '../services/cognito';

export const accountsHandler = (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;
  cognito.getUser(accessToken).then(({ Username }) => {
    rds
      .executeStatement({
        text: 'SELECT AccountNumber, AccountType, CurrentBalance FROM Accounts WHERE CognitoSub = $1',
        values: [Username],
      })
      .then((data) => {
        res.send(data.rows);
      });
  }).catch((err)=>{
    res.status(403).send('Invalid Token')
  })
};
