# Movie Review API

A personal REST API I built to catalogue movies and keep track of my own reviews. Built with Node.js, Express, and MongoDB.

## Why this project?

I wanted something more personal than a generic contacts list — movies felt like a natural fit since everyone has opinions about them!

## Collections

### movies (9 fields)

- `title` — movie name
- `director` — who directed it
- `genre` — e.g. Sci-Fi, Drama, Comedy
- `releaseYear` — year it came out
- `runtime` — length in minutes
- `language` — primary language
- `rating` — score out of 10
- `synopsis` — brief plot summary
- `studio` — production studio

### reviews (5 fields)

- `reviewer` — person writing the review
- `movieTitle` — which movie they watched
- `score` — their personal score (1–10)
- `comment` — written thoughts
- `watchedOn` — date they watched it

## Endpoints

| Method | Route        | Description     |
| ------ | ------------ | --------------- |
| GET    | /movies      | All movies      |
| GET    | /movies/:id  | Single movie    |
| POST   | /movies      | Add a movie     |
| PUT    | /movies/:id  | Update a movie  |
| DELETE | /movies/:id  | Delete a movie  |
| GET    | /reviews     | All reviews     |
| GET    | /reviews/:id | Single review   |
| POST   | /reviews     | Submit a review |
| PUT    | /reviews/:id | Update a review |
| DELETE | /reviews/:id | Delete a review |

## Running Locally

```bash
npm install

# Create a .env file with:
MONGODB_URL=your_connection_string_here
PORT=3000

node server.js
```

Swagger docs available at `http://localhost:3000/api-docs`
