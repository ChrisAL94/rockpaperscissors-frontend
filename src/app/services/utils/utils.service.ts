import { Injectable } from '@angular/core';
import {UserGameHistory} from "../gameHistoryService/game-history.service";

export const LOGIN_COOKIE_NAME = "loggedUser";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = "http://localhost:8080/api/v1"
  constructor() {
  }

  readCookieByName(cookieName: string): string | undefined {
    return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop();
  }

  fetchData<T>(path: string, requestInit?: RequestInit): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        let response = await fetch(this.apiUrl + path, requestInit);
        if (response.ok) {
          response.json().then(resolve).catch(resolve);
        } else {
          reject(JSON.parse(await response.text()).message)
        }
      } catch (err) {
        reject(err)
      }
    });
  }
}
