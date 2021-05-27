const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const { db } = require('../models/household');
const should = chai.should();
const Household = require('../models/household');
const User = require('../models/user');

chai.use(chaiHttp);

describe('household (home) router', ()=>{

    var householdCollection;
    var _household;

    beforeEach((done)=>{
        _household = new Household({
            _id:new mongoose.Types.ObjectId,
            address: 'Nov put 612',
            city: 'Aalborg',
            postcode: '9000'
        })
        _household.save(done)
    })

    it('should create a new household', (done)=>{
        chai.request(app)
        .post('/home')
        .set('content-type', 'application/json')
        .send(_household)
        .end((err, res)=>{
            res.should.have.status(200);
            // should.exist([_household.userID, _household.username]);
            done();
        })
    })
})

describe('get all households', ()=>{
    var loginUser;
    beforeEach(()=>{
        loginUser = new User({
            username: "jesse",
            password: "1234"
        })
    })
    it('should get all households', (done)=>{
        chai.request(app)
        .post('/')
        .send(loginUser)
        .then(()=>{
            chai.request(app)
            .get('/home/getall')
            .send()
            .end((err, res)=>{
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            })
        })
    })
})