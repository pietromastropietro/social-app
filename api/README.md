# sociALLy API

Backend server providing API endpoints to authenticate users and perform CRUD operations on PostgreSQL database.

<!-- ## Project structure

| File or folder | Description |
| -------------- | ----------- |
|                |             | 
|                |             |
 -->

## Details

### PostgreSQL database

The sociALLy postgreSQL database consists of five tables: users, posts, comments, likes, relations

<details>
    <summary>
    Users table
    </summary>

| Column | Type | Nullable |
| - | - | - |
| id (PK) | SERIAL | |
| full_name | VARCHAR | NOT NULL |
| dob | TIMESTAMP WITH TIME ZONE | NOT NULL |
| email | VARCHAR | NOT NULL |
| password_hash | VARCHAR | NOT NULL |
| bio | TEXT | |
| registered_at | TIMESTAMP WITH TIME ZONE | NOT NULL |

</details>
<details>
    <summary>
    Posts table
    </summary>

| Column | Type | Nullable |
| - | - | - |
| id (PK) | SERIAL | |
| user_id (FK) | BIGINT | NOT NULL |
| text | TEXT | NOT NULL |
| image_url | TEXT | |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL |
| updated at | TIMESTAMP WITH TIME ZONE | NOT NULL |

</details>
<details>
    <summary>
    Comments table
    </summary>

| Column | Type | Nullable |
| - | - | - |
| id (PK) | SERIAL | |
| user_id (FK) | BIGINT | NOT NULL |
| post_id (FK) | BIGINT | NOT NULL |
| parent_id (FK) | BIGINT | |
| text | TEXT | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL |
| updated at | TIMESTAMP WITH TIME ZONE | NOT NULL |

</details>
<details>
    <summary>
    Likes table
    </summary>

| Column | Type | Nullable |
| - | - | - |
| id (PK) | SERIAL | |
| user_id (FK) | BIGINT | NOT NULL |
| post_id (FK) | BIGINT | |
| comment_id (FK) | BIGINT | |
| text | TEXT | NOT NULL |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL |

</details>
<details>
    <summary>
    Relations table
    </summary>

| Column | Type | Nullable |
| - | - | - |
| id (PK) | SERIAL | |
| user1_id (FK) | BIGINT | NOT NULL |
| user2_id (FK) | BIGINT | NOT NULL |
| status | integer | |

</details>

### Restricted routes

All routes except the ones for authentication (registering and login) are restricted routes, accessible only with a previously obtained token. A middleware function checks for a valid token in the request's header.

### JWT Authentication

When users register or log in, a JSON web token is created and stored in the users' browser cookies. When users perform actions hitting API endpoints, the token is sent in the 'authorization' field of the HTTP request header. The API checks for a token and performs the required action if it's valid.

### Hashed passwords

Hashed passwords are a security measure to avoid users' personal data compromission in case of server breaches. It's almost impossible for hackers to crack hashed passwords, especially when combined with a strong password policy.

