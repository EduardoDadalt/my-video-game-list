import { Dictionary } from "./Dictionary";

const en: Dictionary = {
  appName: "MyVideoGameList",
  home: {
    gameOfMonth: "Games of the month",
  },
  demo: "This website is not ready yet, I don't recommend you to register yet",
  auth: {
    login: {
      title: "Login",
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Submit",
      forgotPassword: "Forgot password?",
      iDontHaveAccount: "I don't have an account",
    },
    register: {
      title: "Register",
      submit: "Submit",
      email: "Email",
    },
    errors: {
      email: "Invalid email",
      usernameMinLength: "Username must have at least 3 characters",
      usernameMaxLength: "Username must have at most 30 characters",
      passwordMinLength: "Password must have at least 3 characters",
      passwordMaxLength: "Password must have at most 100 characters",
      passwordRequired: "Password is required",
      usernameRequired: "Username is required",
      userNotFound: "User not found",
      userOrPasswordNotMatch: "Username or password incorrect",
    },
    oAuthProviders: {
      continueWith: "Continue with",
    },
  },

  gamePage: {
    addToList: "Add to list",
    score: "Score",
    publisher: "Publisher",
    developers: "Developer",
    releaseDate: "Release date",
    platform: "Platform",
    showMore: "Show more",
    showLess: "Show less",
  },
};

export default en;
