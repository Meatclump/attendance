'use client'

import { restoreCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { FaRecycle } from "react-icons/fa"
import { Spinner } from "@/app/components/spinner"
import type { Character } from "@prisma/client"

interface RestoreCharacterFormProps {
	character: Character
}

export const RestoreCharacterForm = ({
	character
}: RestoreCharacterFormProps) => {
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async () => {
		const result = await restoreCharacter(character.id)
		if (result?.success) {
			CustomToast(`Character "${character.name}" restored to roster.`, "success")
		}
	}

	return (
		<button
			type="button"
			onClick={() => {
				if (isPending) return
				startTransition(() => {
					handleSubmit()
				})
			}}
			disabled={isPending}
			className="text-green-950 bg-green-600 rounded-md p-2 disabled:text-green-400/10 text-sm"
		>
			{
				isPending
				? <Spinner ariaLabel="Loading Character Restoration" />
				: <FaRecycle aria-label="Restore Character" />
			}
		</button>
	)
}