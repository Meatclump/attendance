'use client'

import { setEventTypeColor } from "@/app/actions"
import { EventColor, Prisma } from "@prisma/client"
import { ChangeEvent } from "react"

interface ColorSelectFormProps {
	currentEvent: Prisma.EventTypeGetPayload<{
		include: {
			color: true
		}
	}>
	eventColors: EventColor[]
}

export const ColorSelectForm = ({
	currentEvent,
	eventColors
}: ColorSelectFormProps) => {
	const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		setEventTypeColor(currentEvent.id, e.target.value)
	}

	return (
		<div className="">
			<select
				className={`text-slate-900 rounded-md w-full p-1 ${currentEvent.color.bgCSS}`}
				onChange={handleChange}
				defaultValue={currentEvent.color.id}
			>
				{
					eventColors &&
					eventColors.map(color => (
						<option
							key={color.id}
							value={color.id}
							className={`${color.bgCSS} font-sans`}
						>
							{color.name}
						</option>
					))
				}
			</select>
		</div>
	)
}