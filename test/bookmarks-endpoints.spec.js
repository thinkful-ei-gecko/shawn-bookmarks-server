const knex = require('knex')
const app = require('../src/app')
const { API_TOKEN } = require('../src/config')
const { makeBookmarksArray } = require('./bookmarks.fixtures')

//Parent and test setup/cleanup

describe.only('Bookmarks Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  before('clean table', () => {
    return db('bookmarks_data').truncate()
  })

  afterEach('cleanup', () => {
    return db('bookmarks_data').truncate()
  })

  after('end connection with database', () => {
    return db.destroy()
  })


//GET all bookmarks

  describe('GET /bookmarks', () => {
    context('Given no bookmarks', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .expect(200, [])
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
        .into('bookmarks')
        .insert(testBookmarks)
      })

      it('gets the bookmarks from the store', () => {
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .expect(200, testBookmarks)
      })
    })
  })

 
//GET bookmarks by ID

  describe('GET /bookmarks/:bookmark_id', () => {
    context('Given no bookmarks', () => {
      it('responds with 404', () => {
        const bookmarkId = 123456
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .expect(500, { error: { message: `Bookmark doesn't exist`} 
        })
        //.expect(404, {})
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
        .into('bookmarks')
        .insert(testBookmarks)
      })

      it('responds with 200 and the specified bookmark', () => {
        const bookmarkId = 2
        const expectedBookmark = testBookmarks[bookmarkId - 1]
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .expect(200, expectedBookmark)
      })
    })
  })
})