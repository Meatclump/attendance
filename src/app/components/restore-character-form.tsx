'use client'

import { softDeleteCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { FaRecycle } from "react-icons/fa"

interface RestoreCharacterFormProps {
	characterId: string
}

export const RestoreCharacterForm = ({
	characterId
}: RestoreCharacterFormProps) => {
	return (
		<form
			className="flex"
			action={async () => {
				const result = await softDeleteCharacter(characterId)
				if (result?.success) {
					CustomToast("Character restored to roster.", "success")
				}
			}}
		>
			<button>
				<FaRecycle className="text-green-400 text-2xl" />
			</button>
		</form>
	)
}