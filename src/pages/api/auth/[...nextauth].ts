import NextAuth, { Account, Profile, User } from "next-auth";
import { query as q } from 'faunadb';
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna';

interface ISignInProps {
  user: User;
  account: Account;
  profile: Profile;
  email: {
        verificationRequest?: boolean;
    };
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn( { user, account, profile}: ISignInProps ) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
  
        return true
      } catch {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)