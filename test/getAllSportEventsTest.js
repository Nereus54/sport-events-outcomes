'use strict';

const
    chai             = require('chai'),
    chaiHttp         = require('chai-http'),
    server           = require('../app'),
    should           = chai.should(),
    expect           = chai.expect;

chai.use(chaiHttp);

describe('./GET list of all events for a given sport', () => {

    it('should GET list of all events for a given correct sport ID', (done) => {
        chai.request(server)
            .get("/api/v1/sports/100")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should GET empty list for wrong sport ID', (done) => {
        chai.request(server)
            .get("/api/v1/sports/1111111111111")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
});