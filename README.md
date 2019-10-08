# LAB - 11

## JWT and Bcrypt

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-11/pull/1)
* [travis](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-11)

## Modules
### Middleware
Exports a single function which will authenticate a request, and append a web token if it is authorized.

### Router
Handles /signup and /signin post requests.

### users-model
Creates and exports a mongoose model for users.

### 404
Handles 404s

### Error
Handles errors.

### books
Handles GET /books and /books/:id

## Running the app
* `npm run start`
  
## Tests
* `npm test`

## UML
* ["UML"](https://i.imgur.com/mGDfpzp.jpg)