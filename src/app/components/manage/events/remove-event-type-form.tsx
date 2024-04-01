'use client'

import { FaMinus } from "react-icons/fa6"
import { softDeleteEventType } from "@/app/actions"
import { CustomToast } from "@/app/custom-toast"
import { useTransition } from "react"
import { Spinner } from "@/app/components/spinner"
import type { EventType } from "@prisma/client"

interface RemoveEventTypeFormProps {
	eventType: EventType
}

export const RemoveEventTypeForm = ({
	eventType
}: RemoveEventTypeFormProps) => {
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async () => {
		const result = await softDeleteEventType(eventType.id)
		if (result?.success) {
			CustomToast(`Event Type "${eventType.name}" removed.`, "success")
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
			className="text-sm text-red-950 bg-red-600 p-2 rounded-md disabled:text-red-400/10"
		>
			{
				isPending
				? <Spinner ariaLabel="Loading Event Type Removal" />
				: <FaMinus aria-label="Remove Event Type" />
			}
		</button>
	)
}