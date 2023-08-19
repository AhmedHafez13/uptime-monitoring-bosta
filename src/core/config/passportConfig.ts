import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../../api/users/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class PassportConfig {
  constructor() {
    this.initializeLocalStrategy();
    this.initializeJwtStrategy();
  }

  private initializeLocalStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email, password, done) => {
          try {
            const user = await UserModel.findOne({ email });

            if (!user || !user.comparePassword(password)) {
              return done(null, false, { message: 'Incorrect email or password' });
            }

            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  private initializeJwtStrategy() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    };

    passport.use(
      new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
          const user = await UserModel.findById(payload.sub);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      })
    );
  }
}

export default PassportConfig;
