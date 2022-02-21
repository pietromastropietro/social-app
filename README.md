<div align="center">

![App logo](https://i.ibb.co/XXhPVQs/logo.png)

</div>

---

<div align="center">

### sociaALLy brings all your friends together

</div>

<div align="center">
  
  <a href="https://sociallyapp.netlify.app/">Visit the App</a>
  · 
  <a href="https://github.com/pietromastropietro/socially/tree/main/client">View Client</a>
  ·
  <a href="https://github.com/pietromastropietro/socially/tree/main/api">View API</a>
  <br />
  <br />
</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support and Contributing](#support-and-contributing)
- [Security](#security)
  - [Reporting a Vulnerability](#reporting-a-vulnerability)
- [License](#license)

</details>

---

## About

sociALLy is a social networking web app built with React and Express.

I built this project in order to improve and practice my skills in full-stack web development, providing at the same time a fully functional responsive web app that users can actually enjoy.

Users, once registered and authenticated, can:
- Search for other users
- Add/remove users as personal friends
- Accept/decline friend requests
- Create posts with text and images
- Like and comment posts from friends
- Reply to other comments
- Edit their profile

<!-- <details>
<summary>Screenshots</summary>
<br>


|                               Home Page                               |                               Login Page                               |
| :-------------------------------------------------------------------: | :--------------------------------------------------------------------: |
 | <img src="" title="Home Page" width="100%"> | <img src="" title="Login Page" width="100%"> |

</details> -->

### Built With

**Client**

Modern React with functional components and hooks, paired with [styled-components](https://styled-components.com/). Simple yet effective local state management with Context. Routing provided by [React Router v6](https://reactrouter.com/).

**API**

Express web framework for Node.js, JSON Web Token based authentication, PostgreSQL database.

## Getting Started

### Prerequisites

- You need [Node.js](https://nodejs.org/en/) version >= 10 and [postgreSQL](https://www.postgresql.org/) to work on this project.

### Installation

- Open the command prompt where you wish to save the project and clone the repository:
    
  `git clone https://github.com/pietromastropietro/socially`

- Move inside the project folder and install the required dependencies:

  ```
  cd socially
  npm run install-dependencies
  ```

- Edit the existing `.env.example` file in `/api` with your own database username and password, and rename it to `.env`

- Run the `socially.sql` script to automatically create the database and map all tables:
  <details>
    <summary>
      From command prompt/terminal
    </summary>

    - Linux
      ```
      sudo su - <your_db_username>
      psql -U <your_db_username> -f /<project_folder_path>/api/db/socially.sql
      ```

    - Windows
      ```
      psql -U <your_db_username> -f C:\<project_folder_path>\api\db\socially.sql
      ```
  </details>

  <details>
    <summary>
      From psql shell
    </summary>

    - Linux
      ```
      \i  <project_folder_path>/api/db/socially.sql
      ```

    - Windows
      ```
      \i 'C:/<project_folder_path>/api/db/socially.sql'
      ```
  </details>

## Usage

- Move inside the API folder and start the Express server in development mode with:

    `npm run devstart`

- Server should now be running on `https://localhost:4000`

- Move inside the client folder and start the React server with:

    `npm start`

- App should now be running on `https://localhost:3000` and ready to use

## Support and Contributing

Feel free to reach me out at one of the following places:

- [GitHub issues](https://github.com/pietromastropietro/socially/issues/)
- Contact options listed on [my GitHub profile](https://github.com/pietromastropietro)


If you want to say **thank you** or/and support my development feel free to add a [GitHub Star](https://github.com/pietromastropietro/socially) to the project.


## Security

sociALLy follows good practices of security, but 100% security cannot be assured.
sociALLy is provided **"as is"** without any **warranty**. Use at your own risk.

### Reporting a Vulnerability

If there are any vulnerabilities in **sociALLy**, don't hesitate to _report them_ using any of the methods listed [here](https://github.com/pietromastropietro/socially#support-and-contributing).
Please **do not disclose the vulnerability publicly** until a fix is released.

## License

This project is licensed under the **[MIT license](LICENSE)**.
