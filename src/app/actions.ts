'use server'

import prisma from "@/db"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Get all roster characters in database
 */
export const getRoster = async () => {
	try {
		const roster = await prisma.character.findMany()
		return roster
	} catch (error) {
		return null
	}
}

export const deleteCharacter = async (id:string) => {
	try {
		const result = await prisma.character.delete({
			where: {id}
		})
		revalidatePath("page")
		return {
			success: "Successfully deleted character."
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return {
					error: "Character Not Found!"
				}
			}
		}
	}
}

/**
 * Get a specific character from database by id
 */
export const getCharacter = async (id:string) => {
	try {
		const char = await prisma.character.findUniqueOrThrow({
			where: {id}
		})
		return char
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return {
					error: "Character Not Found!"
				}
			}
		}
	}
}

/**
 * Create a new roster character in the database
 */
export const createCharacter = async (name:string) => {
	try {
		const createChar = await prisma.character.create({
			data: { name }
		})
		revalidatePath("page")
		return {
			success: `Successfully created character: ${createChar.name}`
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				revalidatePath("page")
				return { error: "Name must be unique." }
			}
		}
		revalidatePath("page")
		return { error: "Something went wrong!" }
	}
}
