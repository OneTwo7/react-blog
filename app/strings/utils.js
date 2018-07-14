module.exports = {
  ru: {
    auth: {
      reqLogin: 'Необходимо войти в аккаунт для выполнения данного действия!',
      reqAdmin: 'Необходимы права администратора!',
      reqAuthor: 'Только автор может выполнить данное действие!',
      notFoundError: 'Учетной записи с предостваленным адресом не существует!',
      notActiveError: `
        Ваш аккаунт не активирован.
        Проверьте электронную почту на наличие ссылки для активации!
      `
    },
    helpers: {
      wrongType (name) {
        return `Файл ${name} не является изображением!`;
      },
      tooBig (name) {
        return `Размер изображения ${name} превосходит предел в 5МБ!`;
      }
    }
  },
  en: {
    auth: {
      reqLogin: 'You have to log in to perform that action!',
      reqAdmin: 'This action requires administrative privileges!',
      reqAuthor: 'Only the author can perform that action!',
      notFoundError: 'Account with provided email does not exist!',
      notActiveError: `
        Your account is not activated. Check your email for activation link!
      `
    },
    helpers: {
      wrongType (name) {
        return `File ${name} is not a picture!`;
      },
      tooBig (name) {
        return `Picture ${name} is too big!`;
      }
    }
  }
};
