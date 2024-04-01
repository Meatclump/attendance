'use client'

import { EventColor, Prisma } from "@prisma/client"

interface ColorSelectFormProps {
	currentColor: EventColor
	eventColors: EventColor[]
}

export const ColorSelectForm = ({
	currentColor,
	eventColors
}: ColorSelectFormProps) => {
	const handleChange = () => {

	}

	return (
		<div className="">
			<select
				className={`text-slate-900 rounded-md w-full p-1 ${currentColor.bgCSS}`}
				onChange={handleChange}
				defaultValue={currentColor.id}
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