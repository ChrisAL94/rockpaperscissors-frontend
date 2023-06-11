import { Injectable } from '@angular/core';

export const LOGIN_COOKIE_NAME = "loggedUser";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  readCookieByName(cookieName: string): string | undefined {
    return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop();
  }
}
