const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const { db } = require('../models/household');
const should = chai.should();
const Household = require('../models/household');

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