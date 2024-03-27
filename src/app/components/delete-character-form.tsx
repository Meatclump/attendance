'use client'

import { FaTrashCan } from "react-icons/fa6"
import { deleteCharacter } from "@/app/actions"

interface DeleteCharacterFormProps {
	characterId: string
}

export const DeleteCharacterForm = ({
	characterId
}: DeleteCharacterFormProps) => {
	return (
		<form action={async () => {
			const result = await deleteCharacter(characterId)
		}}>
			<button>
				<FaTrashCan className="text-red-400 text-2xl" />
			</button>
		</form>
	)
}