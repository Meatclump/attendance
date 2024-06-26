'use client'
import type { Character, Prisma } from "@prisma/client"
import { removeEventFromCharacter } from "@/app/actions"

interface RemoveEventTypeFromCharacterFormProps {
	character: Character
	type: Prisma.EventTypeGetPayload<{
		include: {
			color: true
		}
	}>
}

export const RemoveEventTypeFromCharacterForm = ({
	character,
	type
} : RemoveEventTypeFromCharacterFormProps) => {

	const handleClick = async () => {
		const result = await removeEventFromCharacter(character.id, type.id)
	}

	return (
		<button
			className={`${type.color.bgCSS} ${type.deleted && 'opacity-25'} p-1 ms-1 mt-1 rounded-md text-zinc-900 text-sm`}
			onClick={handleClick}
		>
			{type.name}
		</button>
	)
}