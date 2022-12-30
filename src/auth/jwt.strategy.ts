import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { config } from "../config";
import { User } from "../models/user";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.API_SECRET,
  ignoreExpiration: true,
};

export const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, payload);
  } catch (error) {
    return done(null, false);
  }
});
