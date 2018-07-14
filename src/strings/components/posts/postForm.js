export default {
  ru: {
    saveMessage: 'Пост сохранен!',
    shortTitleError: 'Заголовок должен содержать по крайней мере 4 символа!',
    editPost: 'Редактирование поста',
    newPost: 'Новый пост',
    save: 'Сохранить',
    cancel: 'Отменить',
    emptyFieldError (field) {
      return `Необходимо ввести значение для поля ${field}`;
    }
  },
  en: {
    saveMessage: 'Post saved!',
    shortTitleError: 'Title must be at least 4 characters!',
    editPost: 'Edit Post',
    newPost: 'Edit Post',
    save: 'Save',
    cancel: 'Cancel',
    emptyFieldError (field) {
      return `You must provide a value for ${field}`;
    }
  }
};
