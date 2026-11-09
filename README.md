![Logo](https://github.com/user-attachments/assets/f5c8c8fd-f112-4254-9e94-ff54b0f55284)

# CPAN 212 Group 2 Project Members:
- Mirza (@yes-2875)
- Zlata (@ZlataSkotnyk)
- Keziah (@cheetochiyo)

## M3: Running the frontend and backend
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

### 2. Environment variable configuration
- Frontend (web/)
**Copy the example environment variables** using `cp .env.example .env`

- Backend (api/)
**Copy the example environment variables** using `cp .env.example .env`

### 3. Start backend
- Runs at http://localhost:4000
`cd api`
`npm run dev`

### 4. Start frontend
- Runs at http://localhost:3000
`cd web`
`npm run dev`

### 5. Open app
- Visit http://localhost:3000

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
