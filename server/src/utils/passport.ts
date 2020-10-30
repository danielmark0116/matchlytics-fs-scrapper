import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../entity/user.entity";
import { getRepository } from "typeorm";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "oauth.com";
// opts.audience = "oauth.net";

export const initPassport = () => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await getRepository(User).findOne(jwt_payload.id);

        if (!user) {
          throw new Error("No user");
        }

        return done(null, user);
      } catch (e) {
        console.log(e);
        return done(e, false);
      }
    })
  );
};

export const initGoogleOAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_token, _tokenSecret, profile, done) => {
        try {
          const user = await getRepository(User).findOne({
            googleId: profile.id,
          });

          if (!user) {
            const newUser = getRepository(User).create({
              email: profile.emails[0].value,
              name: profile.displayName,
              password_hash: "",
              googleId: profile.id,
            });

            const user = await getRepository(User).save(newUser);

            return done(null, user);
          }

          return done(null, user);
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
};
