const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp); 

describe("register", ()=>{
    var testUser;

    beforeEach(()=>{
        testUser = new User({
            username: "mochaTestUsername",
            name: "test testov",
            password: "12345678",
            email: "mochatestmail@gmail.com"
        })
    })
    describe("register()", ()=>{
        it('should post a new user', (done)=>{
            chai.request(app)
            .post('/register')
            .set('content-type', 'application/json')
            .send(testUser)
            .end((err, res)=>{
                testUser.save(done)
                res.should.have.status(200);
                should.not.exist(testUser.group_id);
                done();
            })
        })
    })
})

describe("login()", ()=>{
    var testUser;
    beforeEach(()=>{
        testUser = new User({
            username: "test",
            password: "1234"
        })
    })

    it("should login user", (done)=>{
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

describe('delete', ()=>{
    it('should delete a user', (done)=>{
        chai.request(app)
        .delete('')
    })
})