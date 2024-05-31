import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      providerId: string;
      proactiveRefresh: {
        user: {
          uid: string;
          email: string;
          emailVerified: boolean;
          displayName: string;
          isAnonymous: boolean;
          phoneNumber: string;
          providerData: {
            providerId: string;
            uid: string;
            displayName: string;
            email: string;
            phoneNumber: string;
            photoURL: string;
          }[];
          stsTokenManager: {
            refreshToken: string;
            accessToken: string;
            expirationTime: number;
          };
          createdAt: string;
          lastLoginAt: string;
          apiKey: string;
          appName: string;
        };
        isRunning: boolean;
        timerId: null;
        errorBackoff: number;
      };
      reloadUserInfo: {
        localId: string;
        email: string;
        displayName: string;
        passwordHash: string;
        emailVerified: boolean;
        passwordUpdatedAt: number;
        providerUserInfo: {
          providerId: string;
          rawId: string;
          phoneNumber: string;
        }[];
        validSince: string;
        lastLoginAt: string;
        createdAt: string;
        phoneNumber: string;
        lastRefreshAt: string;
      };
      reloadListener: null;
      uid: string;
      auth: {
        apiKey: string;
        authDomain: string;
        appName: string;
        currentUser: {
          uid: string;
          email: string;
          emailVerified: boolean;
          displayName: string;
          isAnonymous: boolean;
          phoneNumber: string;
          providerData: {
            providerId: string;
            uid: string;
            displayName: string;
            email: string;
            phoneNumber: string;
            photoURL: string;
          }[];
          stsTokenManager: {
            refreshToken: string;
            accessToken: string;
            expirationTime: number;
          };
          createdAt: string;
          lastLoginAt: string;
          apiKey: string;
          appName: string;
        };
      };
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
      };
      accessToken: string;
      displayName: string;
      emailVerified: boolean;
      phoneNumber: string;
      photoURL: string;
      isAnonymous: boolean;
      tenantId: null;
      providerData: {
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: string;
        photoURL: string;
      }[];
      metadata: {
        createdAt: string;
        lastLoginAt: string;
      };
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
