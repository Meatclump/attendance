'use client'

import { Prisma } from "@prisma/client"

interface ColorSelectFormProps {
	currentColor: string
	eventTypes: Prisma.EventTypeGetPayload<{
		include: {
			color: true
		}
	}>[]
}

export const ColorSelectForm = ({
	currentColor,
	eventTypes
}: ColorSelectFormProps) => {
	const handleChange = () => {

	}

	return (
		<div className="">
			<select
				className={`text-slate-900 rounded-md w-full p-1`}
				onChange={handleChange}
				defaultValue={currentColor}
			>
				{
					eventTypes &&
					eventTypes.map(type => (
						<option
							key={type.color.id}
							value={type.color.id}
							className={`${type.color.bgCSS}`}
						>
							{type.color.name}
						</option>
					))
				}
			</select>
		</div>
	)
}