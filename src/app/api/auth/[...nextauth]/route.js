import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        const data = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
            username: credentials.username,
            password: credentials.password,
          })
        })
        const userData = await data.json()
        if(userData.email) {
          return userData
        } else {
          throw new Error("Couldn't login")
        }
      }
      
    })
  ],
  pages: {
      error: "/login"
  }
})

export { handler as GET, handler as POST };

