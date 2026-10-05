## 1. Problem and users
One or two paragraphs: who the app is for and what problem it solves for them.

## 2. Features
An MVP list of 4 to 8 features you'll have working by M6, and a Later list of ideas you won't build this term. Each MVP feature is one sentence that starts with the user, for example "A signed-in user can add a recipe to a weekly meal plan."

## 3. External API
Its name and a link to its docs, whether it needs a key, its rate limits or terms that affect you, and which feature uses it. Include one real request you ran (the full URL) and the response you got, trimmed to the fields you'll use, in a code block.

Our application will use the jikan-edge API to retrieve anime information. The API provides information about anime such as titles, scores, episode counts, airing status, genres, and images.

**Documentation**: https://jikan.lucashdo.com/docs

**Authentication**: No API key is required.

**Rate limits**: 30 requests per 10 seconds, and 60 requests per minute enforced across all routes.

The API will be used when a user searches for an anime. Our Express server will send a request to the external API and return anime search results to the React frontend. When the user selects an anime, our application can save the required anime information in our own MongoDB database.

### Example request: https://jikan.lucashdo.com/v1/anime/1
### Example response: 

```json
{
  "data": {
    "malId": 1,
    "title": "Cowboy Bebop",
    "score": 8.75,
    "episodes": 26,
    "status": "Finished Airing",
    "genres": [
      { "malId": 1, "name": "Action" },
      { "malId": 24, "name": "Sci-Fi" }
    ]
    ...
  },
  "meta": {
    ...
  }
}
```

**The response above is trimmed to show only the information that is relevant to our application.**

## 4. Data model draft
Your two main resources and a User. For each: every field, its type, and whether it's required. Then how they relate, for example "a meal plan has many recipes; a user owns many meal plans."

Our application will use MongoDB to store users' personal wwanime lists and reviews. Anime information from the external API will be used to populate an anime list item, but the user's saved data will be stored in our own database.

### User
- `_id`: ObjectId, required
- `username`: String, required
- `email`: String, required
- `password`: String, required

### AnimeListItem
- `_id`: ObjectId, required
- `userId`: ObjectId, required
- `malId`: Number, required
- `title`: String, required
- `imageUrl`: String, optional
- `totalEpisodes`: Number, optional
- `currentEpisode`: Number, required
- `status`: String, required
- `score`: Number, optional
- `createdAt`: Date, required
- `updatedAt`: Date, required

### Review
- `_id`: ObjectId, required
- `userId`: ObjectId, required
- `animeListItemId`: ObjectId, required
- `rating`: Number, required
- `comment`: String, required
- `createdAt`: Date, required
- `updatedAt`: Date, required

### Relationships
A User can have many AnimeListItem records.
Each AnimeListItem belongs to one User.
A User can create many Reviews.
Each Review belongs to one User.
Each Review belongs to one AnimeListItem.

## 5. Endpoint list
A table with method, path, what it does, the success status code, and the error status codes it can return. It covers list, get one, create, update and delete for both main resources, plus the endpoint that uses the external API. Every path starts with `/api/`.

| Method | Path                  | Description                   | Success | Errors        |
| ------ | --------------------- | ----------------------------- | ------- | ------------- |
| GET    | `/api/anime`          | Get the user's anime list     | 200     | 401, 500      |
| GET    | `/api/anime/:id`      | Get one anime                 | 200     | 404, 500      |
| POST   | `/api/anime`          | Add an anime                  | 201     | 400, 401, 500 |
| PUT    | `/api/anime/:id`      | Update an anime               | 200     | 400, 404, 500 |
| DELETE | `/api/anime/:id`      | Delete an anime               | 204     | 404, 500      |
| GET    | `/api/reviews`        | Get user's reviews            | 200     | 401, 500      |
| GET    | `/api/reviews/:id`    | Get one review                | 200     | 404, 500      |
| POST   | `/api/reviews`        | Create a review               | 201     | 400, 401, 500 |
| PUT    | `/api/reviews/:id`    | Update a review               | 200     | 400, 404, 500 |
| DELETE | `/api/reviews/:id`    | Delete a review               | 204     | 404, 500      |
| GET    | `/api/external/anime` | Search the external anime API | 200     | 400, 502      |

## 6. Wireframes
A sketch of at least 4 pages: a list page, a detail page, a create form and an edit form (these become your M3 pages). Photos of paper sketches are fine. The images are in docs/wireframes/ and shown in proposal.md.

## 7. Team roles
Who leads the API, the frontend, the database, and the repo and pull requests. Leading an area doesn't mean doing all of it: everyone writes code in every milestone from M2 on.

## 8. Repo setup
The public repo cpan212-project-group-<N> with the layout from section 3: api/ and web/ folders (a one-line README.md in each is enough for now), a root README.md with the app name, group number, and each member's name and GitHub username, and a .gitignore that covers node_modules/ and .env.

## 9. Everyone commits, and CONTRIBUTIONS.md** has an M1 section.
Every member has at least one commit from their own GitHub account, and the M1 section lists what each member wrote.
