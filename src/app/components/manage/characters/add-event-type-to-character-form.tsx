'use client'

import { Character, Prisma } from "@prisma/client"
import { ChangeEvent, useTransition } from "react"
import { connectEventToCharacter } from "@/app/actions"

interface AddEventTypeToCharacterFormProps {
	character: Character
	eventTypes: Prisma.EventTypeGetPayload<{
		include: {
			color: true
		}
	}>[]
}

export const AddEventTypeToCharacterForm = ({
	character,
	eventTypes
}: AddEventTypeToCharacterFormProps) => {
	const [isPending, startTransition] = useTransition()

	const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		startTransition(async () => {
			if (eventTypes && eventTypes.length > 0) {
				
				if (e.target.value === "") return
				const selectedEventType = eventTypes.filter(type => type.id === e.target.value)[0]
				const result = await connectEventToCharacter(character.id, selectedEventType.id)
				if (result) {
					e.target.value = ""
				}
			}
		})
	}

	return (
		<form className="z-10 inline-block ms-1 mt-1">
			<select
				className="px-1 rounded-md p-1 border text-slate-900 text-sm max-w-[65px]"
				onChange={handleChange}
				defaultValue=""
				disabled={isPending}
			>
				<option
					className="font-sans font-medium"
					value=""
					disabled
				>
					Add...
				</option>
				{
					eventTypes.map(type => (
						<option
							className={`font-sans font-medium ${type.color.bgCSS}`}
							key={type.id}
							value={type.id}
						>
							{type.name}
						</option>
					))
				}
			</select>
		</form>
	)
}