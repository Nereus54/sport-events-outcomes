'use strict';

const
    chai             = require('chai'),
    chaiHttp         = require('chai-http'),
    server           = require('../app'),
    should           = chai.should(),
    expect           = chai.expect;

chai.use(chaiHttp);

describe('./GET list of all sports', () => {

    it('should GET list of all sports', (done) => {
        chai.request(server)
            .get("/api/v1/sports")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should GET list of all sports for EN-GB lang', (done) => {
        chai.request(server)
            .get("/api/v1/sports?lang=en-gb")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should NOT GET list of all sports for wrong lang.', (done) => {
        chai.request(server)
            .get("/api/v1/sports?lang=de-de")
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body).to.be.empty;
                done();
            });
    });
});