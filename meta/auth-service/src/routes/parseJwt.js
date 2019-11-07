const jwt = require('jsonwebtoken');
const config = require('../config');
const boom = require('boom');
const User = require('../models/User');

module.exports = fn => async (req, res, ...restArgs) => {
    try {
        const userParse = await jwt.verify(
            req.headers.authorization,
            config.authSecret
        )
        let user = await User.findOne(
            {_id: userParse._id},
            {
                followed_tags: 0,
                followed_users: 0,
                bookmarks: 0,
                following: 0,
                followers: 0,
                followedTags: 0,
                followedUsers: 0
            }
        )
        req.user = user;
        return fn(req, res, ...restArgs);
    }
    catch(err) {
        throw boom.unauthorized(null, 'Token', {
            token: 'NOT_TOKEN'
        })
    }
}