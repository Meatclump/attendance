'use server'

import prisma from "@/db"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Get all roster characters in database
 */
export const getRoster = async () => {
	try {
		const roster = await prisma.character.findMany({
			where: {deleted: false}
		})
		return roster
	} catch (error) {
		return null
	}
}

export const getInactiveRoster = async () => {
	try {
		const roster = await prisma.character.findMany({
			where: {deleted: true}
		})
		console.log("ROSTER:",roster)
		return roster
	} catch (error) {
		return null
	}
}

export const softDeleteCharacter = async (id: string) => {
	try {
		const result = await prisma.character.update({
			where: {id},
			data: { deleted: true }
		})
		console.log(result)
		revalidatePath("page")
		return {
			success: "Character soft deleted."
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
	let validatedName = name.trim()

	if (validatedName.length < 2) {
		return {
			error: "Character name must be at least 2 characters."
		}
	}

	validatedName = validatedName[0].toUpperCase() + validatedName.slice(1)
	
	try {
		const createChar = await prisma.character.create({
			data: {
				name: validatedName,
				deleted: false
			}
		})
		revalidatePath("page")
		return {
			success: `Successfully created character: ${createChar.name}`
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				revalidatePath("page")
				return { error: "Character name must be unique. If no such Character is in the roster, check the Inactive list." }
			}
		}
		revalidatePath("page")
		return { error: "Something went wrong!" }
	}
}
