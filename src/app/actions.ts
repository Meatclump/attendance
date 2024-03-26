'use server'

import prisma from "@/db"
import { Character, Prisma } from "@prisma/client"

export const getRoster = async () => {
	try {
		const roster = await prisma.character.findMany()
		return roster
	} catch (error) {
		return null
	}
}

export const createCharacter = async (name:string) => {
	try {
		const createChar = await prisma.character.create({
			data: { name }
		})
		return { success: `Successfully created character: ${createChar.name}`}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return { error: "Name must be unique." }
			}
		}
		return { error: "Something went wrong!" }
	}
}