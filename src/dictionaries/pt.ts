import { type Dictionary } from "./Dictionary";
const pt: Dictionary = {
  appName: "MyVideoGameList",
  home: {
    gameOfMonth: "Jogos do mês",
  },
  demo: "Este site não está pronto ainda, não recomendo você se cadastrar ainda",
  auth: {
    login: {
      title: "Faça login",
      username: "Nome de usuário",
      password: "Senha",
      confirmPassword: "Confirmar senha",
      submit: "Entrar",
      forgotPassword: "Esqueceu a senha?",
      iDontHaveAccount: "Não tenho uma conta",
    },
    register: {
      title: "Cadastra-se",
      submit: "Cadastrar",
      email: "Email",
    },
    errors: {
      email: "Email inválido",
      passwordRequired: "A senha é obrigatória",
      usernameRequired: "O nome de usuário é obrigatório",
      userNotFound: "Usuário não encontrado",
      usernameMinLength: "O nome de usuário deve ter pelo menos 3 caracteres",
      usernameMaxLength: "O nome de usuário deve ter no máximo 30 caracteres",
      passwordMinLength: "A senha deve ter pelo menos 3 caracteres",
      passwordMaxLength: "A senha deve ter no máximo 100 caracteres",
      userOrPasswordNotMatch: "Usuário ou senha incorretos",
      usernameAlreadyExists: "Nome de usuário já existe",
      emailAlreadyExists: "Email já existe",
      usernameAndEmailAlreadyExists: "Nome de usuário e email já existem",
    },
    oAuthProviders: {
      continueWith: "Continuar com",
    },
  },
  gamePage: {
    addToList: "Adicionar à lista",
    score: "Nota",
    publisher: "Publicadora",
    developers: "Desenvolvedora",
    releaseDate: "Data de lançamento",
    platform: "Plataforma",
    showMore: "Mostrar mais",
    showLess: "Mostrar menos",
  },
};

export default pt;
