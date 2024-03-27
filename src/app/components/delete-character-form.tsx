'use client'

import { FaTrashCan } from "react-icons/fa6"
import { softDeleteCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { ClipLoader } from "react-spinners"

interface DeleteCharacterFormProps {
	character: { id: string; name: string; deleted: boolean; }
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
				? <ClipLoader
					loading={true}
					color="#fff"
					size={16}
					aria-label="Loading Character Removal"
				/>
				: <FaTrashCan aria-label="Remove Character" />
			}
		</button>
	)
}