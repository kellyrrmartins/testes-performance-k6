import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json'
import Product from '../request/product.request';
import Customer from '../request/customer.request'


export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 50 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }
  ],

  tresholds: {
    http_req_duration: ['p(99) < 2000']
  }
}
export default function () {

  let login = new Login()
  let product = new Product()
  let customer = new Customer()

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass)
  })

  group('lista Produtos', () => {
    product.list(login.getToken())
  })

  group('listar clientes', () => {
    customer.listCustomer(login.getToken())
  })
}