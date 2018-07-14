module.exports = {
  ru: {
    users: {
      emailPasError: `
        Минимальная длина адреса электронной почты и пароля - 6 символов!
      `,
      duplicateError: `
        Аккаунт использующий данный адрес электронной почты уже существует!
      `,
      activeTitle: 'Добро пожаловать в React Blog App',
      activeBody: `
        Проследуйте по нижеследующей ссылке для подтверждения регистрации:
      `,
      activeText: 'активировать аккаунт',
      activeSubject: 'Подтверждение регистрации',
      alreadyActiveError: 'Аккаунт уже активирован!',
      notFoundError: `
        Аккаунт с предоставленным электронным адресом не существует!
      `,
      invalidActiveLink: 'Некорректная ссылка для активации!',
      resetTitle: 'Изменение пароля',
      resetBody: 'Проследуйте по ссылке для изменения пароля:',
      resetText: 'изменить пароль',
      resetSubject: 'Запрос на восстановление доступа',
      notActiveError: 'Аккаунт не активирован!',
      invalidResetLink: 'Некорректная ссылка для восстановления пароля!',
      noDataError: 'Данные для изменения учетной записи не предоставлены!',
      shortPasError: 'Пароль должен содержать по крайней мере 6 символов!'
    }
  },
  en: {
    users: {
      emailPasError: 'Email/Password should be at least 6 characters long!',
      duplicateError: 'User with that email already exists!',
      activeTitle: 'Welcome to React Blog App',
      activeBody: 'Follow the link to activate your account:',
      activeText: 'activation link',
      activeSubject: 'Account activation',
      alreadyActiveError: 'Account is already activated!',
      notFoundError: 'Account with provided email does not exist!',
      invalidActiveLink: 'Invalid activation link!',
      resetTitle: 'Password Reset',
      resetBody: 'Use the following link to reset your password:',
      resetText: 'reset link',
      resetSubject: 'Password reset',
      notActiveError: 'Account is not activated!',
      invalidResetLink: 'Invalid reset link!',
      noDataError: 'No update data provided!',
      shortPasError: 'Password should be at least 6 characters long!'
    }
  }
};
