import {  HttpInterceptorFn  } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn=(request,next)=>  {
  const sessionToken=localStorage.getItem('med') ?? '';
  request=request.clone({
    setHeaders:{
      Authorization: sessionToken ? `Token ${sessionToken}` : '',
    },
  })
  return next(request);
}
