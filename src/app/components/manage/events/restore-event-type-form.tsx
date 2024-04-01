'use client'

import { restoreEventType } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { FaRecycle } from "react-icons/fa"
import { Spinner } from "@/app/components/spinner"
import type { EventType } from "@prisma/client"

interface RestoreEventTypeFormProps {
	eventType: EventType
}

export const RestoreEventTypeForm = ({
	eventType
}: RestoreEventTypeFormProps) => {
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async () => {
		const result = await restoreEventType(eventType.id)
		if (result?.success) {
			CustomToast(`Event Type "${eventType.name}" restored.`, "success")
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
				? <Spinner ariaLabel="Loading Event Type Restoration" />
				: <FaRecycle aria-label="Restore Event Type" />
			}
		</button>
	)
}