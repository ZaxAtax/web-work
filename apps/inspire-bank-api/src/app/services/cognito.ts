import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  GetUserCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export interface CognitoServiceConfiguration {
  region: string;
  clientID: string;
}

export class CognitoService {
  client: CognitoIdentityProviderClient;
  clientID: string;

  constructor({ region, clientID }: CognitoServiceConfiguration) {
    this.client = new CognitoIdentityProviderClient({ region });
    this.clientID = clientID;
  }

  login(username: string, password: string) {
    return this.client.send(
      new InitiateAuthCommand({
        ClientId: this.clientID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      })
    );
  }

  refresh(token: string) {
    return this.client.send(
      new InitiateAuthCommand({
        ClientId: this.clientID,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: token,
        },
      })
    );
  }

  signUp(username: string, password: string) {
    return this.client.send(
      new SignUpCommand({
        ClientId: this.clientID,
        Username: username,
        Password: password,
      })
    );
  }

  confirmSignUp(username: string, confirmationCode: string) {
    return this.client.send(
      new ConfirmSignUpCommand({
        ClientId: this.clientID,
        Username: username,
        ConfirmationCode: confirmationCode,
      })
    );
  }

  forgotPassword(username: string) {
    return this.client.send(
      new ForgotPasswordCommand({
        ClientId: this.clientID,
        Username: username,
      })
    );
  }

  confirmForgotPassword(
    username: string,
    password: string,
    confirmationCode: string
  ) {
    return this.client.send(
      new ConfirmForgotPasswordCommand({
        ClientId: this.clientID,
        Username: username,
        Password: password,
        ConfirmationCode: confirmationCode,
      })
    );
  }

  getUser(AccessToken: string) {
    return this.client.send(new GetUserCommand({
      AccessToken
    }))
  }
}

export const cognito = new CognitoService({
  region: 'us-east-1',
  clientID: '3vcdl1a41c86jei227nu846jqk',
});

export default cognito;
