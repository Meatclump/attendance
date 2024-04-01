'use server'

import prisma from "@/db"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Get all active roster characters in database
 */
export const getRoster = async () => {
	try {
		const roster = await prisma.character.findMany({
			where: {
				deleted: null
			},
			include: {
				eventTypes: {
					include: {
						color: true
					}
				}
			}
		})
		return roster
	} catch (error) {
		return null
	}
}

/**
 * Get all inactive roster characters in database
 */
export const getInactiveRoster = async () => {
	try {
		const roster = await prisma.character.findMany({
			where: {
				deleted: {
					not: null
				}
			},
			include: {
				eventTypes: {
					include: {
						color: true
					}
				}
			}
		})
		return roster
	} catch (error) {
		return null
	}
}

/**
 * Get all possible colors for events
 */
export const getEventColors = async () => {
	try {
		const eventColors = await prisma.eventColor.findMany()
		return eventColors
	} catch (error) {
		return null
	}
}

/**
 * Set a color for a specified event type
 */
export const setEventTypeColor = async (eventId: string, colorId: string) => {
	try {
		const eventColors = await getEventColors()
		if (eventColors) {
			if (eventColors.find(entry => entry.id === colorId)) {
				const updatedEvent = await prisma.eventType.update({
					where: {id: eventId},
					data: {
						eventColorId: colorId
					}
				})
				revalidatePath("page")
				return updatedEvent
			} else {
				return {
					error: "Given color id not found in available color table."
				}
			}
		} else {
			return {
				error: "Unable to retreive event colors."
			}
		}
	} catch (error) {
		return {
			error: "Something went wrong!"
		}
	}
}

/**
 * Get all Event Types
 */
export const getEventTypes = async () => {
	try {
		const eventTypes = await prisma.eventType.findMany({
			include: { color: true }
		})
		return eventTypes
	} catch (error) {
		return {
			error: "Unable to retreive Event Types."
		}
	}
}

/**
 * Disconnect Event Type from specified Character
 */
export const removeEventFromCharacter = async (characterId: string, typeId: string) => {
	try {
		const result = await prisma.character.update({
			where: {id: characterId},
			data: {
				eventTypes: {
					disconnect: { id: typeId }
				}
			},
			include: {
				eventTypes: true
			}
		})
		revalidatePath("page")
		return result
	} catch (error) {
		console.error(error)
		return null
	}
}

/**
 * Connect Event Type to specified Character
 */
export const connectEventToCharacter = async (characterId: string, eventId: string) => {
	try {
		const result = await prisma.character.update({
			where: {id: characterId},
			data: {
				eventTypes: {
					connect: {
						id: eventId
					}
				}
			},
			include: {
				eventTypes: true
			}
		})
		revalidatePath("page")
		return result
	} catch (error) {
		return null
	}
}

/**
 * Get all Event Types connected to a specified Character
 */
export const getCharacterEventTypes = async (characterId: string) => {
	try {
		const characterEventTypes = await prisma.character.findMany({
			where: { id: characterId },
			include: { eventTypes: true }
		})
		return characterEventTypes
	} catch (error) {
		return null
	}
}

/**
 * Soft Delete a character which can be restored again at a later date
 */
export const softDeleteCharacter = async (id: string) => {
	try {
		const result = await prisma.character.update({
			where: { id },
			data: {
				deleted: new Date()
			}
		})
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

/**
 * Restore a character which has previously been marked as Deleted
 */
export const restoreCharacter = async (id: string) => {
	try {
		const result = await prisma.character.update({
			where: { id },
			data: { deleted: null }
		})
		revalidatePath("page")
		return {
			success: "Character restored."
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
 * Permanently delete a character
 */
export const deleteCharacter = async (id: string) => {
	try {
		const result = await prisma.character.delete({
			where: { id }
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
export const getCharacter = async (id: string) => {
	try {
		const char = await prisma.character.findUniqueOrThrow({
			where: { id }
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
 * Create a new Event Type with specified name
 */
export const createEventType = async (name: string) => {
	let validatedName = name.trim()

	if (validatedName.length < 2) {
		return {
			error: "Event Type name must be at least 2 characters."
		}
	}

	validatedName = validatedName[0].toUpperCase() + validatedName.slice(1)
	
	try {
		const eventColors = await getEventColors()
		if (eventColors) {
			const createEvtType = await prisma.eventType.create({
				data: {
					name: validatedName,
					eventColorId: eventColors[0].id
				}
			})
			revalidatePath("page")
			return {
				success: `Successfully created Event Type: ${createEvtType.name}`
			}
		} else {
			return {
				error: "Unable to retreive event colors."
			}
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				revalidatePath("page")
				return { error: "Event Type name must be unique. If no such Event Type is present, check the Inactive list." }
			}
		}
		revalidatePath("page")
		return { error: "Something went wrong!" }
	}
}

/**
 * Create a new roster character in the database
 */
export const createCharacter = async (name: string) => {
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
				name: validatedName
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
