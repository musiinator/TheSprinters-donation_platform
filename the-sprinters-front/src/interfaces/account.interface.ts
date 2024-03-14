export interface LoginInformation {
  username: string;
  password: string;
}

export interface SignUpInformation {
  username: string;
  password: string;
  userType: string;
}

export interface IConfig {
  headers: { Authorization: string };
}

