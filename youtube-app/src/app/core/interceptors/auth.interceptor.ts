import { HttpRequest, HttpHandlerFn, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = environment.apiKey;
  const headers = new HttpHeaders({
    'X-Authentication-Token': authToken,
  });
  // Clone the request to add the authentication header.
  const newReq = req.clone({ headers });
  return next(newReq);
}
