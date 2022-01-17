# sociALLy API

Backend server providing API endpoints to authenticate users and perform CRUD operations on postgreSQL database.

## Project structure

| File or folder | Description |
| -------------- | ----------- |
|                |             | 
|                |             |

## Details

### PostgreSQL database

The sociALLy postgreSQL database consists of five tables: users, posts, comments, likes, relationships

- The 'users' table has  columns: id, 

- The 'posts' table has  columns: id, 

- The 'comments' table has  columns: id, 

- The 'likes' table has  columns: id, 

- The 'relationships' table has  columns: id, 

### Restricted routes

All routes except the ones for authentication (registering and login) are restricted routes, accessible only with a previously obtained token. A middleware function checks for a valid token in the request's header.

### JWT Authentication

When users register or log in, a JSON web token is created and stored in the users' browser cookies. When users perform actions hitting API endpoints, the token is sent in the 'authorization' field of the HTTP request header. The API checks for a token and performs the required action if it's valid.

### Hashed passwords

Hashed passwords are a security measure to avoid users' personal data compromission in case of server breaches. It's almost impossible for hackers to crack hashed passwords, especially when combined with a strong password policy.

