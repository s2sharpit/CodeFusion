# CodeFusion API Documentation

Welcome to the API documentation for the College Project Showcase and Collaboration Platform. This documentation provides details on the endpoints and functionalities available in the API.

## Base URL

The base URL for accessing the API is: `https://example.com/api`

## Authentication

The API requires authentication using the OAuth 2.0 protocol. Users need to obtain an access token by authenticating through the authentication provider.

## Endpoints

### User Profile Endpoints

#### Get User Profile

- **GET** `/users/profile`
  - Retrieves the current user's profile.

#### Update User Profile

- **PUT** `/users/profile`
  - Updates the current user's profile.

### Project Endpoints

#### Get All Projects

- **GET** `/projects/all`
  - Retrieves all projects from the database.

#### Get Project by ID

- **GET** `/projects/:id`
  - Retrieves a specific project by ID from the database.

#### Create New Project

- **POST** `/projects/create`
  - Creates a new project.

#### Update Project

- **PUT** `/projects/:id`
  - Updates a specific project by ID.

#### Delete Project

- **DELETE** `/projects/:id`
  - Deletes a specific project by ID.

#### Get Projects Collaborated by User

- **GET** `/projects/collaborated/:userId`
  - Retrieves projects based on the collaborations of a specific user.

#### Like/Unlike Project

- **PUT** `/projects/:projectId/like`
  - Toggles the like status for the project by adding or removing the user's ID from the likes array.

### Collaboration Endpoints

#### Send Collaboration Request

- **POST** `/collaboration/request`
  - Sends a collaboration request from one user to another.

#### Respond to Collaboration Request

- **POST** `/collaboration/respond`
  - Allows a user to respond to a collaboration request.

## Schema

### User Schema

````json
{
  "User": {
    "Name": "string",
    "Email": "string",
    "GitHubUsername": "string",
    "Major": "string",
    "Skills": ["string"],
    "Interests": ["string"]
  }
}
````

### Project Schema
````json
{
  "Project": {
    "Title": "string",
    "Description": "string",
    "GitHubRepoLink": "string",
    "Images": ["string"],
    "Categories": ["string"],
    "TechnologyStack": ["string"],
    "Collaborators": [
      {
        "UserID": "string",
        "Role": "string"
      }
    ],
    "Likes": ["string"]
  }
}
````

### Collaboration Request Schema
````json
{
  "CollaborationRequest": {
    "SenderUserID": "string",
    "RecipientUserID": "string",
    "Status": "string",
    "Details": "string"
  }
}
````