const request = require("supertest")
const app = require('../app')

const URL_GENRES = '/genres'

const genre = {
  name: "Pop"
}

let genreId;

test("Post -> 'URL_GENRES', should return status code 201, and res.body to be defined and res.body.name = genre.name", async () => {

  const res = await request(app)
    .post(URL_GENRES)
    .send(genre)

  genreId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})


test("Get -> 'URL_GENRES', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
      .get(URL_GENRES)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })
  
  
  test("Get -> 'URL_GENRES/:id', should return status code 200, res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
      .get(`${URL_GENRES}/${genreId}`)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  })
  
  test("Put -> 'URL_GENRES/:id', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
      .put(`${URL_GENRES}/${genreId}`)
      .send({ name: "pop latino" })
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("pop latino")
  })
  
  test("Delete -> 'URL_GENRES/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_GENRES}/${genreId}`)
  
    expect(res.statusCode).toBe(204)
  })