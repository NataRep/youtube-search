import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// валидация даты
export function pastDateValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: ValidationErrors } | null => {
    const dateValue = control.value;
    const error: ValidationErrors = {
      pastDate: 'The date must be in the past',
    };
    if (dateValue && new Date(dateValue) > new Date()) {
      return error;
    }
    return null;
  };
}

// валидация ссылки на изображение
export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i;
    const valid = regex.test(url);
    return valid
      ? null
      : { invalidImageUrl: 'The URL is not a valid image link' };
  };
}

// валидация ссылки на видео
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    // Регулярное выражение для проверки начала URL с http:// или https://
    const protocolPattern = /^(https?:\/\/)/i;
    const isValid = protocolPattern.test(url);
    return isValid ? null : { invalidUrl: 'The URL is not valid' };
  };
}

//генерируем рандомный id длинной 11 символов
export function generateRandomId(length: number = 11): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
