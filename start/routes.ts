/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'Mohammad' }
})


//http://127.0.0.1:3333/query?first_name=Ali&last_name=Ahmad
Route.get("/query", async ({ request, response, params }) => {

  console.log(request.all());
  //{ firstName: 'Ali', lastName: 'Ahmad' }
  return "done";

});

Route.get("/posts", "PostsController.getAll");
Route.post("/login", "UsersController.login");
Route.post("/logout", "UsersController.logout");
Route.get("/posts/:id", "PostsController.getById");
Route.post("/posts", "PostsController.create");
Route.put("/posts", "PostsController.update");
Route.delete("/posts", "PostsController.delete");

Route.get("/users", "UsersController.getAll");
Route.get("/user_info", "UsersController.getById");
Route.post("/users", "UsersController.create");
Route.put("/users", "UsersController.update");
Route.delete("/users/:id", "UsersController.delete");
