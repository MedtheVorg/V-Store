import { findUserById } from '../../../services/user.service';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

passport.use(
    'jwtStrategy',
    new JwtStrategy(
        {
            secretOrKey: process.env.PUBLIC_KEY, // verification public key
            algorithms: ['RS256'], // encryption algorithm
            issuer: process.env.ISSUER, // original issuer
            audience: process.env.AUDIENCE,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // function used to extract jwt and pass it to the callback
        },
        async (payload, done) => {
            try {
                logging.warn(`the wjt Payload : ${payload}`);

                const user = await findUserById(payload.sub);
                if (!user) {
                    return done(null, false, 'UnAuthorized');
                }

                return done(null, user);
            } catch (error) {
                return done(error, false, 'Jwt Authentication failed');
            }
        }
    )
);
