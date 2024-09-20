import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function shorteningInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const baseURL = environment.apiUrl;
  const modifiedUrl = `${baseURL}${req.url}`;

  const newReq = req.clone({
    url: modifiedUrl,
  });
  return next(newReq);
}
