import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../models/users';
// @ts-ignore
import bcrypt from 'bcryptjs';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user: any = await Users.findOne({ where: { user_name: username } });
        if (!user?.dataValues?.id) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await bcrypt.compare(password, user?.dataValues?.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user?.dataValues);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

export default passport;
