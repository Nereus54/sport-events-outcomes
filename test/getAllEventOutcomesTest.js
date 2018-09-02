'use strict';

const
    chai             = require('chai'),
    chaiHttp         = require('chai-http'),
    server           = require('../app'),
    should           = chai.should(),
    expect           = chai.expect;

chai.use(chaiHttp);

describe('./GET list of all outcomes', () => {

    it('should GET list of all outcomes for a given event', (done) => {
        chai.request(server)
            .get("/api/v1/sports/364600/events/979104200")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should GET EMPTY list of all outcomes for event with wrong eventID', (done) => {
        chai.request(server)
            .get("/api/v1/sports/364600/events/11111111111")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });

    it('should GET EMPTY list of all outcomes for event with wrong sportID', (done) => {
        chai.request(server)
            .get("/api/v1/sports/11111111111/events/979104200")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
});