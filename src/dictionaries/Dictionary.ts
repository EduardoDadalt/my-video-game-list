type Dictionary = {
  appName: string;
  home: {
    gameOfMonth: string;
  };
  auth: {
    login: {
      title: string;
      username: string;
      password: string;
      submit: string;
      forgotPassword: string;
      register: string;
    };
    errors: {
      usernameMinLength: string;
      usernameMaxLength: string;
      usernameRequired: string;
      passwordRequired: string;
      passwordMinLength: string;
      passwordMaxLength: string;
      userNotFound: string;
      userOrPasswordNotMatch: string;
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
