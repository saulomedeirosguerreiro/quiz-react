# Quiz

Quiz is ReactJS (Version: 16.13.1) project, cloud-enabled and mobile-ready

Quiz uses a number of libraries:

* v24.0.0 [jest] - A delightful JavaScript Testing Framework with a focus on simplicity
* v0.20.0 [axios] - Promise based HTTP client for the browser and node.js
* v7.0.9 [immer] -  Create the next immutable state tree by simply modifying the current tree
* v4.0.2 [polished] - A lightweight toolset for writing styles in JavaScript
* v4.0.5 [redux] - A predictable state container for JS Apps
* v5.2.0 [styled-components] -  Allows you to write actual CSS code to style your components
* v8.3.1 [uuid] -  To create a random UUID
* v3.7.2 [typescript] - TypeScript extends JavaScript by adding types.



### Installation

Quiz requires [Node.js](https://nodejs.org/) v12+ and [Yarn](https://yarnpkg.com/) v1.+ to run.

Install the dependencies and devDependencies

```sh
$ cd quiz-react
$ yarn
```

Note: Create the .env file and fill in the REACT_APP_API_URL variable
with the address of the Public API "https://opentdb.com" like .env.example file

Start the server
```sh
$ yarn start
```

Congratulations ! The project is running.

### Deploy

##### Automated Deploy

The cloud application platform called Heroku was used to automatically deploy and host the application in the cloud.

Access link: https://frontend-quiz-react.herokuapp.com


##### Manual Deploy


Install and Configure nginx

- [Install nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [How to Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/como-instalar-o-nginx-no-ubuntu-18-04-pt)

Start the nginx
```sh
$ sudo systemctl start nginx
```

Access the project directory

```sh
$ cd quiz-react
```

Generate the application build

```sh
$ yarn build
```

Note : A folder called "build" will be created in the project and you must send it to the path "/ var / www"

###### Final Step
Open the browser and put the ip and port configured in nginx for the application.
Congratulations ! You were able to deploy the system.

### Tests (unit and UI)

Access the project directory and run all tests

```sh
$ cd quiz-react
$ yarn test a
```
