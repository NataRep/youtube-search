import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export function shorteningInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const baseURL = '/youtube-api';
  const modifiedUrl = `${baseURL}${req.url}`;

  const newReq = req.clone({
    url: modifiedUrl,
  });
  return next(newReq);
}
