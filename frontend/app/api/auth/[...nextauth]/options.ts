import { auth, firestore } from "@/lib/firebase";
import { genericRequestNoAuth, GenericRequestNoAuth } from "@/lib/request";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import { genericFetchRequest } from "@/lib/utils";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredentials) => {
            if (userCredentials.user) {
              /* const res = genericFetchRequest(
                "/user/update",
                "POST",
                { email: userCredentials.user.email },
                {
                  'Content-Type': 'application/json',
            
                }
              ); */
              return userCredentials.user;
            }
            console.log("UTENTE NON ESISTE");
            return null;
          })
          .catch((error) => {
            console.error("ERROR LOGIN EMAIL", error);
            return null;
          });
      },
    }),

    CredentialsProvider({
      id: "google",
      name: "Google",
      credentials: {},
      async authorize(credentials): Promise<any> {
        /* console.log("GOOOOOOOOOOOOOOGLEEEEE ", JSON.parse(credentials.result)); */
        /*  var provider = await new GoogleAuthProvider();

        console.log("PROVIDER", provider);
        await signInWithPopup(auth, provider).then(async (result) => {
          console.log("GOOGLE LOGIN", result);
          return result;
        }); */
        return { user: {} };
      },

      /* async profile(credentials): Promise<any> {
        var provider = new GoogleAuthProvider();
      
        return signInWithPopup(auth, provider).then(async (result) => {
          console.log("GOOGLE LOGIN", result);
          return result;
        });
      }, */
    }),

    /* GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }), */
  ],
  /* adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }), */
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt", maxAge: 1 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const ses: Session = {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
      return Promise.resolve(ses);
    },
  },
} satisfies NextAuthOptions;
