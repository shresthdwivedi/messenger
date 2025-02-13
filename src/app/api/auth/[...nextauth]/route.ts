import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing Credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid Credentials');
                };

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                
                if (!isCorrectPassword) {
                    throw new Error('Invalid Credentials');
                }

                return user;
            } 
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,  
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };