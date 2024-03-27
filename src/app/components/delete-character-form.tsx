'use client'

import { FaTrashCan } from "react-icons/fa6"
import { softDeleteCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"

interface DeleteCharacterFormProps {
	characterId: string
}

export const DeleteCharacterForm = ({
	characterId
}: DeleteCharacterFormProps) => {
	return (
		<form
			className="flex"
			action={async () => {
				const result = await softDeleteCharacter(characterId)
				if (result?.success) {
					CustomToast("Character deleted from roster.", "success")
				}
			}}
		>
			<button>
				<FaTrashCan className="text-red-400 text-2xl" />
			</button>
		</form>
	)
}