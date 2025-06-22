import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				});

				if (
					user &&
					bcrypt.compareSync(credentials.password, user.password)
				) {
					return {
						id: user.id.toString(),
						name: user.name,
						email: user.email
					};
				}

				return null;
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login'
	}
});

export { handler as GET, handler as POST };
