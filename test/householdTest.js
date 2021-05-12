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

    before(()=>{
        _household = new Household({
            address: 'Vesterbroo 61',
            city: 'Aalborg',
            postcode: '9000'
        })
    })

    it('should create a new household', (done)=>{
        chai.request(app)
        .post('/home')
        .set('content-type', 'application/json')
        .send(_household)
        .end((err, res)=>{
            res.should.have.status(200);
            should.exist([_household.userID, _household.username]);
            done();
        })
    })
})