const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const config = require('../config');
const AuthorModel = require('../models/model-authors');

const {app, startServer, stopServer} = require('../server');

describe('API - Authors [/api/authors]', async function() {
  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase(require('./fixtures/fixtures-authors'));
  });
  after(stopServer);

  it('Should return an index of authors [/api/authors]', async function() {
    const res = await chai.request(app).get('/api/authors');
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['pages', 'recordCount', 'records']);
  });
  it('Should return a complete Author record for a given id [/api/authors/:id]', async function() {
    const author = await AuthorModel.findOne();
    const res = await chai.request(app).get(`/api/authors/${author._id}`);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['id', 'name']);
    expect(res.body.id).to.equal(author._id.toString());
  });
});