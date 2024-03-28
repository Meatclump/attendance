'use client'

import { FaTrashCan } from "react-icons/fa6"
import { softDeleteCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { Spinner } from "@/app/components/spinner"
import type { Character } from "@prisma/client"

interface DeleteCharacterFormProps {
	character: Character
}

export const DeleteCharacterForm = ({
	character
}: DeleteCharacterFormProps) => {
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async () => {
		const result = await softDeleteCharacter(character.id)
		if (result?.success) {
			CustomToast(`Character "${character.name}" deleted from roster.`, "success")
		}
	}

	return (
		<button
			disabled={isPending}
			onClick={() => {
				startTransition(() => {
					handleSubmit()
				})
			}}
			className="text-2xl text-red-400 disabled:text-red-400/10"
		>
			{
				isPending
				? <Spinner ariaLabel="Loading Character Removal" />
				: <FaTrashCan aria-label="Remove Character" />
			}
		</button>
	)
}