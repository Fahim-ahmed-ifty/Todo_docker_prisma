import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { name, email, password } = await req.json();

		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: 'Missing fields' },
				{ status: 400 }
			);
		}

		const exist = await prisma.user.findUnique({
			where: {
				email: String(email)
			}
		});

		if (exist) {
			return NextResponse.json(
				{ message: 'Email already exists' },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword
			}
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 }
		);
	}
}
