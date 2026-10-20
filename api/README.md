## Express.js Server for CPAN212 Group 2 Project

## Testing

### Curl commands for each endpoint
```
curl -i "http://localhost:4000/api/anime/search?q=bleach"
Expected status code: 200 OK
```
```
curl -i "http://localhost:4000/api/watchlist-entries/"
Expected status code: 200 OK
```
```
curl -i "http://localhost:4000/api/watchlist-entries/1"
Expected status code: 200 OK
```
```
curl -i -X POST "http://localhost:4000/api/watchlist-entries/" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2,"title":"Naruto"}'
Expected status code: 201 Created
```
```
curl -i -X PUT "http://localhost:4000/api/watchlist-entries/2" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2, "title": "Naruto: Shippuden"}'
Expected status code: 200 OK
```
```
curl -i -X DELETE "http://localhost:4000/api/watchlist-entries/2"
Expected status code: 204 No Content
```
```
curl -i "http://localhost:4000/api/watchlists/"
Expected status code: 200 OK
```
```
curl -i "http://localhost:4000/api/watchlists/2"
Expected status code: 200 OK
```
```
curl -i -X POST "http://localhost:4000/api/watchlists/" \
-H "Content-Type: application/json" \
-d '{"name":"Completed"}'
Expected status code: 201 Created
```
```
curl -i -X PUT "http://localhost:4000/api/watchlists/1" \
-H "Content-Type: application/json" \
-d '{"name":"Finished"}'
Expected status code: 200 OK
```
```
curl -i -X DELETE "http://localhost:4000/api/watchlists/3"
Expected status code: 204 No Content
```

### Curl command that fails validation
```
curl -i -X POST "http://localhost:4000/api/watchlist-entries/" \
-H "Content-Type: application/json" \
-d '{"malId":2}'
Expected status code: 400 Bad Request
```

### Curl command that returns 404
```
curl -i -X POST "http://localhost:4000/api/watchlists-entries/" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2}'
Expected status code: 404 Not Found
```

## How to run API
1. cd api
2. npm install
3. cp .env.example .env
4. npm run dev
5. curl -i "http://localhost:4000/api/anime/search?q=naruto"

## Environment variables
PORT = 4000

## Table of endpoints
| Method | Endpoint |
| --- | --- |
| GET | /api/anime/search |
| GET | /api/watchlist-entries/ |
| GET | /api/watchlist-entries/:id |
| GET | /api/watchlists/ |
| GET | /api/watchlists/:id |
| POST | /api/watchlist-entries/ |
| POST | /api/watchlists/ |
| PUT | /api/watchlist-entries/:id |
| PUT | /api/watchlists/:id |
| DELETE | /api/watchlist-entries/:id |
| DELETE | /api/watchlists/:id |