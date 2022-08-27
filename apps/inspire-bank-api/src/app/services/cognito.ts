import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export class CognitoService {
  client: CognitoIdentityProviderClient;
  clientID: string;

  constructor(region: string, clientID: string) {
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
}

export default CognitoService;
