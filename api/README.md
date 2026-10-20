## Express.js Server for CPAN212 Group 2 Project

## Testing

### Curl commands for each endpoint
curl -i "http://localhost:4000/api/anime/search?q=bleach"
Expected status code: 200 OK

curl -i "http://localhost:4000/api/watchlist-entries/"
Expected status code: 200 OK

curl -i "http://localhost:4000/api/watchlist-entries/1"
Expected status code: 200 OK

curl -i -X POST "http://localhost:4000/api/watchlist-entries/" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2,"title":"Naruto"}'
Expected status code: 201 Created

curl -i -X PUT "http://localhost:4000/api/watchlist-entries/2" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2, "title": "Naruto: Shippuden"}'
Expected status code: 200 OK

curl -i -X DELETE "http://localhost:4000/api/watchlist-entries/2"
Expected status code: 204 No Content

curl -i "http://localhost:4000/api/watchlists/"
Expected status code: 200 OK

curl -i "http://localhost:4000/api/watchlists/2"
Expected status code: 200 OK

curl -i -X POST "http://localhost:4000/api/watchlists/" \
-H "Content-Type: application/json" \
-d '{"_id":"3","userId":"001","name":"Completed"}'
Expected status code: 201 Created

curl -i -X PUT "http://localhost:4000/api/watchlists/3" \
-H "Content-Type: application/json" \
-d '{"userId":"001","name":"Finished"}'
Expected status code: 200 OK

curl -i -X DELETE "http://localhost:4000/api/watchlists/3"
Expected status code: 204 No Content

### Curl command that fails validation
curl -i -X POST "http://localhost:4000/api/watchlist-entries/" \
-H "Content-Type: application/json" \
-d '{"malId":2}'
Expected status code: 400 Bad Request

### Curl command that returns 404
curl -i -X POST "http://localhost:4000/api/watchlists-entries/" \
-H "Content-Type: application/json" \
-d '{"watchlistId":"2","malId":2}'
Expected status code: 404 Not Found