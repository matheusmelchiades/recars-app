const { authSecret } = require('../../config/system');
const passport = require('passport');
const jwtPass = require('passport-jwt');
const { Strategy, ExtractJwt } = jwtPass;

module.exports = (app) => {
    const modelUser = app.api.models.users;
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, (payload, cb) => {
        return modelUser.findOne({ _id: payload._id }).then(user => {
            if (!user) return cb(null, false);
            if (new Date(payload.expirate) < new Date()) return cb(null, false);

            return cb(null, {
                _id: user._id,
                username: user._id,
                role: user.role
            });

        }).catch(err => cb(err, false));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    };
};