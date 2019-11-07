const route = require('express').Router();
const User = require('../models/User');
const parseJwt = require('./parseJwt');
const moment = require('moment');

route.get(':userKey/check-exist-email', async (req) => {
    let user = await User.findOne({email: req.params.userKey});
    return {
        isExist : !!user
    }
});

route.get(':userKey/check-exist-username', async (req) => {
    let user = await User.findOne({
        username: req.params.userKey
    })
    return {
        isExist: !!user
    }
})

route.get('/me', parseJwt(async (req) => {
    const {subscription} = req.user;
    req.user.password = -1;
    if (
        subscription &&
        subscription.key !== 'FREE' &&
        moment(new Date()).isAfter(moment(subscription.validTo))
    ) {
        const subscription = {
            key: 'FREE',
            plan: 'payment:plan.free.title',
            boughtAt: new Date()
        }
    }
}))

module.exports = route;