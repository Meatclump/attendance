'use client'

import { Character, Prisma } from "@prisma/client"
import { ChangeEvent, useState, useTransition } from "react"
import { FaPlus } from "react-icons/fa6"
import { connectEventToCharacter, getEventTypes } from "@/app/actions"

interface AddEventTypeToCharacterFormProps {
	character: Character
}

export const AddEventTypeToCharacterForm = ({
	character
}: AddEventTypeToCharacterFormProps) => {
	const [showMenu, setShowMenu] = useState(false)
	const [eventTypes, setEventTypes] = useState<Prisma.EventTypeGetPayload<{
		include: {
			color: true
		}
	}>[]>([])
	const [isPending, startTransition] = useTransition()

	const handleClick = async () => {
		const eventTypes = await getEventTypes()
		if (eventTypes && eventTypes.length > 0) {
			setEventTypes(eventTypes)
		}
		setShowMenu(prevState => !prevState)
	}

	const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		setShowMenu(false)
		if (e.target.value === "") return
		const selectedEventType = eventTypes.filter(type => type.id === e.target.value)[0]
		const result = await connectEventToCharacter(character.id, selectedEventType.id)
	}

	return (
		<div className="flex gap-1 relative">
			<button
				className="block hover:scale-110 bg-green-600 px-2 rounded-md disabled:bg-slate-100/20"
				disabled={isPending}
				onClick={() => {
					if (isPending) return
					startTransition(() => {
						handleClick()
					})
				}}
			>
				<FaPlus className="text-green-950 text-sm rounded-sm" />
			</button>
			{
				showMenu &&
				<form className="absolute bottom-[-30px] text-slate-900 w-[200px] z-10">
					<select className="px-1 rounded-md w-full p-1 border bg-gray-300" onChange={handleChange} defaultValue="">
						<option
							className="font-sans font-medium"
							value=""
							disabled
						>
							Choose Type...
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
			}
		</div>
	)
}