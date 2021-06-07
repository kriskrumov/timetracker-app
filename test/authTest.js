const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const should = chai.should();
chai.use(chaiHttp); 

describe("REGISTER user", ()=>{
    var testUser;

    beforeEach((done)=>{
        testUser = new User({
            username: "mochaTestUsername123",
            name: "Test Tester",
            password: "123456TEST",
            email: "mochatest@test.com"
        })
        testUser.save(done);
    })
    it('Should create a new user', (done)=>{
        chai.request(app)
        .post('/register')
        .set('content-type', 'application/json')
        .send(testUser)
        .end((err, res)=>{
            res.should.have.status(200);
            should.not.exist(testUser.group_id);
            res.should.be.a('object');
            done();
        })
    })
})

describe("LOGIN user", ()=>{
    var testUser;
    beforeEach(()=>{
        testUser = new User({
            username: "test",
            password: "1234"
        })
    })

    it("Should login user", (done)=>{
        chai.request(app)
        .post('/')
        .set('content-type', 'application/json')
        .send(testUser)
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.a('object');
            done();
        })
    })
})