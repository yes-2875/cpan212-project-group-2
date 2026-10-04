1. Problem and users. One or two paragraphs: who the app is for and what problem it solves for them.

2. Features. An MVP list of 4 to 8 features you'll have working by M6, and a Later list of ideas you won't build this term. Each MVP feature is one sentence that starts with the user, for example "A signed-in user can add a recipe to a weekly meal plan."

3. External API. Its name and a link to its docs, whether it needs a key, its rate limits or terms that affect you, and which feature uses it. Include one real request you ran (the full URL) and the response you got, trimmed to the fields you'll use, in a code block.

- We will use the Jikan API to retrieve anime information from MyAnimeList.

### Documentation:
https://docs.api.jikan.moe/

- The API does not require an API key.

- We will use the API to search for anime and retrieve information such as the anime title, number of episodes, status, score, and image.

### Example request:

https://api.jikan.moe//v1/anime/1

### Example response: 

{
  "data": {
    "malId": 1,
    "url": "https://myanimelist.net/anime/1/Cowboy_Bebop",
    "title": "Cowboy Bebop",
    "titleEnglish": "Cowboy Bebop",
    "type": "TV",
    "episodes": 26,
    "status": "Finished Airing",
    "aired": { "from": "1998-04-03", "to": "1999-04-24", "string": "Apr 3, 1998 to Apr 24, 1999" },
    "score": 8.75,
    "scoredBy": 1073406,
    "rank": 49,
    "members": 2081325,
    "imageUrl": "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    "images": {
      "small": "https://cdn.myanimelist.net/images/anime/4/19644t.jpg",
      "medium": "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
      "large": "https://cdn.myanimelist.net/images/anime/4/19644l.jpg"
    },
    "genres": [{ "malId": 1, "name": "Action", "url": "https://myanimelist.net/anime/genre/1/Action" }],
    "studios": [{ "malId": 14, "name": "Sunrise", "url": "https://myanimelist.net/anime/producer/14/Sunrise" }]
  },
  "meta": { "cached": true, "stale": false, "refreshFailed": false, "fetchedAt": "2026-08-26T23:17:42.708Z" }
}

- This API will be used by the Express server when a user searches for an anime.

4. Data model draft. Your two main resources and a User. For each: every field, its type, and whether it's required. Then how they relate, for example "a meal plan has many recipes; a user owns many meal plans."

User
- _id: ObjectId, required
- username: String, required
- email: String, required
- password: String, required

AnimeListItem
- _id: ObjectId, required
- userId: ObjectId, required
- malId: Number, required
- title: String, required
- imageUrl: String, optional
- totalEpisodes: Number, optional
- currentEpisode: Number, required
- status: String, required
- score: Number, optional
- createdAt: Date, required
- updatedAt: Date, required

Review
- _id: ObjectId, required
- userId: ObjectId, required
- animeListItemId: ObjectId, required
- rating: Number, required
- comment: String, required
- createdAt: Date, required
- updatedAt: Date, required

### Relationships
- A user can own many anime list items.
- Each anime list item belongs to one user.
- A user can create many reviews.
- Each review belongs to one user and one anime list item.

5. Endpoint list. A table with method, path, what it does, the success status code, and the error status codes it can return. It covers list, get one, create, update and delete for both main resources, plus the endpoint that uses the external API. Every path starts with /api/.

Method |         Path          | Description                   | Success | Errors 
GET    | `/api/anime`          | Get the user's anime list     | 200     | 401, 500 
GET    | `/api/anime/:id`      | Get one anime                 | 200     | 404, 500 
POST   | `/api/anime`          | Add an anime                  | 201     | 400, 401, 500 
PUT    | `/api/anime/:id`      | Update an anime               | 200     | 400, 404, 500 
DELETE | `/api/anime/:id`      | Delete an anime               | 204     | 404, 500 
GET    | `/api/reviews`        | Get user's reviews            | 200     | 401, 500 
GET    | `/api/reviews/:id`    | Get one review                | 200     | 404, 500 
POST   | `/api/reviews`        | Create a review               | 201     | 400, 401, 500 
PUT    | `/api/reviews/:id`    | Update a review               | 200     | 400, 404, 500 
DELETE | `/api/reviews/:id`    | Delete a review               | 204     | 404, 500 
GET    | `/api/external/anime` | Search the external anime API | 200     | 400, 502 

6. Wireframes. A sketch of at least 4 pages: a list page, a detail page, a create form and an edit form (these become your M3 pages). Photos of paper sketches are fine. The images are in docs/wireframes/ and shown in proposal.md.

7. Team roles. Who leads the API, the frontend, the database, and the repo and pull requests. Leading an area doesn't mean doing all of it: everyone writes code in every milestone from M2 on.

8. Repo setup. The public repo cpan212-project-group-<N> with the layout from section 3: api/ and web/ folders (a one-line README.md in each is enough for now), a root README.md with the app name, group number, and each member's name and GitHub username, and a .gitignore that covers node_modules/ and .env.

9. Everyone commits, and CONTRIBUTIONS.md** has an M1 section.** Every member has at least one commit from their own GitHub account, and the M1 section lists what each member wrote.