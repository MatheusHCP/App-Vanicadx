import {createServer, Model, Response} from 'miragejs'

createServer({
  urlPrefix: 'http://localhost:8080',
  namespace: 'api',
  models: {
    user: Model,
  },
  seeds(server){
    server.create('user', {
      firstName: 'Matheus',
      lastName: 'Pereira',
      email: 'matheus@teste.com',
      password: '123123',
      token: 'eyDASDSADqd91jdas98jd9ahd8ahs8dha8sda@'
    })
  },
  routes(){
    this.get('/user', (schema) => {
      return schema.users.all()
    })
    this.post ('/auth', (schema, request) => {
      const body = JSON.parse(request.requestBody);
      const user = schema.users.findBy({
        email: body.email,
        password: body.password
      })

      if(!user){
        return new Response(404)
      }
      return user;

    })
    this.post('/user', (schema, request) => {
      /**
       *   firstName: string;
           lastName: string;
           token: string;
           password: string;ww
       */
      const body = JSON.parse(request.requestBody);
      const user = schema.users.create({...body, token: "eydasdaushdasdhauds@dasudhausd"});
      return user;
    })
  }

})