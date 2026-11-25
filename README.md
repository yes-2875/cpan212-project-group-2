![Logo](https://github.com/user-attachments/assets/f5c8c8fd-f112-4254-9e94-ff54b0f55284)

# CPAN 212 Group 2 Project Members:
- Mirza (@yes-2875)
- Zlata (@ZlataSkotnyk)
- Keziah (@cheetochiyo)

## M3 + M4: Running the frontend and backend
### Video demonstration for M2 and M3:
https://youtu.be/EwYVtFUykzo

### Individual walkthroughs for M3:
- Mirza: https://youtu.be/nOER3GF31no
- Keziah: https://youtu.be/1o0O9uIlhuM
- Zlata: https://www.youtube.com/watch?v=bbJ_knNiFGM

### 1. Installing dependencies
- Install frontend dependencies

`cd web`

`npm install`

- Install backend dependencies

`cd ../api`

`npm install`

### 2. M4 Database setup
M4 uses a **MongoDB database** to store watchlists and watchlist entries, as well as to offer sorting, pagination, and query capabilities in the backend which are exposed to the frontend. **The following steps show how to create a MongoDB database and connect it to the backend:**

1. Create an account at https://www.mongodb.com/cloud/atlas/register:
    - **Create a new project** using the sidebar in the user interface.
2. Create a free cluster:
    - In the sidebar, click **Project Overview**, then **Create**.
    - Select the **M0 (free)** option.
    - **Pick any provider** and a **region** close to you, give it a **name** and click **Create**.
    - Input a username and autogenerate a secure password **without special characters** in the Security Quickstart that shows, and then press **Create Database User**. Also click **Add My Current IP Address**, then click **Finish and Close**.
3. Click the Connect button, then press Drivers, and copy the connection string. It looks a bit like `mongodb+srv://<username>:<db_password>@cluster0.abcde.mongodb.net/?appName=Cluster0`.
    - Replace `<username>` and `<db_password>` with your database user's name and password. Add `yumi` after the forward slash `/`.
    - Use that string as the value of the `MONGODB_URI` environment variable in the backend as described below.
  

### 3. Environment variable configuration
Frontend (web/):
- **Copy the example environment variables** using `cp .env.example .env`

Backend (api/):
- **Copy the example environment variables** using `cp .env.example .env`
- Set `MONGODB_URI` to the MongoDB connection string retrieved earlier in the M4 database setup. Example: `MONGODB_URI=mongodb+srv://<db_user>:<db_password>@cluster0.abcde.mongodb.net/yumi?appName=Cluster0`

### 4. Start backend
- Runs at http://localhost:4000

```bash
cd api
npm run seed # Deletes all existing data and populates MongoDB with sample data
npm run dev
```

### 5. Start frontend
- Runs at http://localhost:3000

```bash
cd web
npm run dev
```

### 6. Open app
- Visit http://localhost:3000

## M4: List query parameters
Both list endpoints accept filtering, sorting and pagination in the query string. Leaving a parameter out, or sending it empty (`?q=`), uses its default. An invalid value returns `400` with a message for each field that was wrong.

### `GET /api/watchlists`
| Parameter | Type | Default | Allowed values | Description |
|---|---|---|---|---|
| `q` | text | none | Up to 100 characters | Case-insensitive search of watchlist name and description |
| `sort` | text | `name` | `name`, `created` (add `-` in front for reverse order, e.g. `-created`) | Sort order. `created` sorts by creation time |
| `page` | whole number | `1` | 1 or more | Which page to return |
| `limit` | whole number | `10` | 1 to 50 | Watchlists per page |

### `GET /api/watchlist-entries`
| Parameter | Type | Default | Allowed values | Description |
|---|---|---|---|---|
| `watchlistId` | id | none | A valid watchlist id | Only entries in this watchlist |
| `status` | text | none | `Watching`, `Completed`, `Plan to Watch`, `On Hold`, `Dropped` | Only entries with this status |
| `q` | text | none | Up to 100 characters | Case-insensitive search of anime titles |
| `sort` | text | `title` | `title`, `score`, `currentEpisode`, `totalEpisodes` (add `-` in front for reverse order, e.g. `-score`) | Sort order |
| `page` | whole number | `1` | 1 or more | Which page to return |
| `limit` | whole number | `10` | 1 to 50 | Entries per page |

### Example requests
```
GET /api/watchlists?q=anime&sort=-created&limit=5
GET /api/watchlist-entries?watchlistId=<id>&status=Watching&sort=-score&page=2&limit=5
```

### Response format
Both endpoints return one page of results plus the totals:
```json
{
  "data": [ ... ],
  "page": 2,
  "limit": 5,
  "total": 11,
  "totalPages": 3
}
```
Each watchlist in `GET /api/watchlists` also includes an `entryCount`. Each entry in `GET /api/watchlist-entries` has its `watchlistId` filled in with the whole watchlist. A page past the last one returns an empty `data` array, not an error.

## AI use
### M2
ChatGPT:
- explained how to install Express 5 and why branch push rejected.

Gemini:
- explained how Map caching works for external API endpoint
- Diagnosed 404 Not Found error when testing external API endpoint (was missing a forward slash in a router file).

### M3
Gemini:
- explained the turbopack root warning in Next.js frontend (and showed how to grab the directory name as a variable in an ES module)
- suggested some styling to fix the burden of automatic sizing of Next.js Image components (they require static width and height values)
- explained how to pass JSON data from one page to another (passing props to pages isn't possible, had to work around this and use search queries)

ChatGPT
- explained merge conflicts

### M4
Gemini:
- Pointed out validation inconsistencies in Mongoose schemas vs. old validation. I looked at the Mongoose docs in detail to check how to replicate the validation checks I was missing.
- Generated sample watchlists and entries to use for seed script
- Explained alternate method of wrapping components inside a Suspense (the old Promise.then() logic was kinda hacky and confusing to work with when involving search parameters in dynamic routes, switched to using async functions)