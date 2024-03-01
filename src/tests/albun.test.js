require('../models')
const request = require("supertest")
const app = require('../app')
const Artist = require("../models/Artist")

let artist
let album
let URL_ALBUM = '/albums'
let albumId

beforeAll(async () => {
  //generar un artista

  artist = await Artist.create({
    name: "Shakira",
    country: "Colombia",
    formationYear: 2008,
    image: "lorem30"
  })

  album = {
    name: "lorem20",
    image: "loremImage30",
    releaseYear: 2010,
    artistId: artist.id
  }

})

test("Post -> 'URL_ALBUM', sholud return status code 201, res.body. to be defined and res.body.name = album.name", async () => {
  const res = await request(app)
    .post(URL_ALBUM)
    .send(album)

  albumId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(album.name)

})

test("Get -> 'URL_ALBUM', should return status code 200, res.body to be defined and res.body.length = 1", async () => {

  const res = await request(app)
    .get(URL_ALBUM)


  //console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].artist).toBeDefined()
  expect(res.body[0].artist.id).toBe(artist.id)
})

test("Get -> 'URL_ALBUM:/id', should return status code 200, res.body to be defined and res.body.name = album.name", async () => {

  const res = await request(app)
    .get(`${URL_ALBUM}/${albumId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(album.name)
})

test("Put -> 'URL_ALBUM/:id ', should return status code 200,res.body to be defined and  res.body.name = 'new_name'", async () => {
  const res = await request(app)
    .put(`${URL_ALBUM}/${albumId}`)
    .send({ name: 'new_name' })

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe('new_name')

})

test("Delete -> 'URL_ALBUM/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_ALBUM}/${albumId}`)

  expect(res.statusCode).toBe(204)
  await artist.destroy()
})
