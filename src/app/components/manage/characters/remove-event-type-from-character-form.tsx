'use client'
import type { Character, EventType } from "@prisma/client"
import { removeEventFromCharacter } from "@/app/actions"

interface RemoveEventTypeFromCharacterFormProps {
	character: Character
	type: EventType
}

export const RemoveEventTypeFromCharacterForm = ({
	character,
	type
} : RemoveEventTypeFromCharacterFormProps) => {

	const handleClick = async () => {
		const result = await removeEventFromCharacter(character.id, type.id)
		console.log("Final result:",result)
	}

	return (
		<button
			className={`bg-${type.color.toLocaleLowerCase()}-400 p-1 rounded-md text-zinc-900 text-sm`}
			onClick={handleClick}
		>
			{type.name}
		</button>
	)
}