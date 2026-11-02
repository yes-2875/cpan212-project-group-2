![Logo](https://github.com/user-attachments/assets/f5c8c8fd-f112-4254-9e94-ff54b0f55284)

# CPAN 212 Group 2 Project Members:
- Mirza (@yes-2875)
- Zlata (@ZlataSkotnyk)
- Keziah (@cheetochiyo)

## M3: Running the frontend and backend

### 1. Installing dependencies
- Install frontend dependencies
cd web
npm install

- Install backend dependencies
cd ../api
npm install

### 2. Environment variable configuration
- Frontend (web/)
Make a .env.local file with the following contents:
API_ORIGIN=http://localhost:4000
BASE_URL=http://localhost:3000

- Backend (api/)
Make a .env file with the following contents:
PORT=4000

### 3. Start backend
- Runs at http://localhost:4000
cd api
npm run dev

### 4. Start frontend
- Runs at http://localhost:3000
cd web
npm run dev

### 5. Open app
- Visit http://localhost:3000

## AI use
### M2
- ChatGPT: explained how to install Express 5 and why branch push rejected.
- Gemini: explained how Map caching works for external API endpoint. Diagnosed 404 Not Found error when testing external API endpoint (was missing a forward slash in a router file).