define({ "api": [
  {
    "type": "post",
    "url": "/logged",
    "title": "Test login",
    "name": "Logged",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message if the user is logged</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"You're logged in !\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Missing or wrong JWT:",
          "content": "HTTP/1.1 401 Unauthozized\n{\n  \"message\": \"Unauthozized\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login an user",
    "name": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg3ODgyNzc5fQ.ITW828SQqBGqjZhZSO3Vb7M2EwwuZ41pfhyTj9JJa9I\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Username not found:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Username not found\"\n}",
          "type": "json"
        },
        {
          "title": "Incorrect password:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Incorrect password\"\n}",
          "type": "json"
        },
        {
          "title": "Missing credentials:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Missing credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register an user",
    "name": "Register",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message if the user is created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User created\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Username is already taken:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Username is already taken\"\n}",
          "type": "json"
        },
        {
          "title": "Missing credentials:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Missing credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Hello World",
    "name": "Hello",
    "group": "Base",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello World !</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Hello World !\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/base.js",
    "groupTitle": "Base"
  },
  {
    "type": "get",
    "url": "/status",
    "title": "Server status",
    "name": "Status",
    "group": "Base",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Server is running</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Server is running\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/base.js",
    "groupTitle": "Base"
  }
] });
