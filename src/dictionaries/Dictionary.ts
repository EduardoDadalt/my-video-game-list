export type Dictionary = {
  appName: string;
  home: {
    gameOfMonth: string;
  };
  demo: string;
  auth: {
    register: {
      email: string;
      title: string;
      submit: string;
    };
    login: {
      title: string;
      username: string;
      password: string;
      confirmPassword: string;
      submit: string;
      forgotPassword: string;
      iDontHaveAccount: string;
    };
    errors: {
      email: string;
      usernameMinLength: string;
      usernameMaxLength: string;
      usernameRequired: string;
      passwordRequired: string;
      passwordMinLength: string;
      passwordMaxLength: string;
      userNotFound: string;
      userOrPasswordNotMatch: string;
    };
    oAuthProviders: {
      continueWith: string;
    };
  };
  gamePage: {
    addToList: string;
    score: string;
    publisher: string;
    developers: string;
    releaseDate: string;
    platform: string;
    showMore: string;
    showLess: string;
  };
};
