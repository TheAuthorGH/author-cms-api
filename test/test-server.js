const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));

const {app, startServer, stopServer} = require('../server');

describe('Server', function() {
  it('Should perform a clean start', async function() {
    await startServer();
  });
  it('Should serve static assets on /', async function() {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(200);
    expect(res).to.be.html;
  });
  it('Should perform a clean stop', async function() {
    await stopServer();
  });
});