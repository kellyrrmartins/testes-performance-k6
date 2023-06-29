import { check } from "k6"
import http from 'k6/http';
import Utils from '../utils/utils'


export default class Product {
  list(token) {

    let response = http.get(`${Utils.getBaseUrl()}/users`, {
      headers: {
        Authorization: `Bearer ${token}`

      }
    })

    check(response, { 'listagem deve retornar 200': r => r.status === 200 })

  }
}