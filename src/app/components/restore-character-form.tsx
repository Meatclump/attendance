'use client'

import { restoreCharacter } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { FaRecycle } from "react-icons/fa"
import { Spinner } from "@/app/components/spinner"

interface RestoreCharacterFormProps {
	character: { id: string; name: string; deleted: boolean; }
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
			className="text-green-400 disabled:text-green-400/10 text-2xl"
		>
			{
				isPending
				? <Spinner ariaLabel="Loading Character Restoration" />
				: <FaRecycle aria-label="Restore Character" />
			}
		</button>
	)
}