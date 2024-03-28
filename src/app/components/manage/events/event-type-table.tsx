import { getEventTypes } from "@/app/actions"
import { ColorSelectForm } from "./color-select-form"

export const EventTypeTable = async () => {
	const eventTypes = await getEventTypes()
	return (
		<div className="w-full">
			<table className="table-fixed w-full">
				<thead>
					<tr className="">
						<th className="text-start px-4">
							Name
						</th>
						<th className="text-start px-4 w-[150px]">
							Color
						</th>
					</tr>
				</thead>
				<tbody>
					{
						eventTypes && eventTypes.map(type => (
							<tr
								key={type.id}
								className="odd:bg-slate-100/10 hover:bg-orange-100/20"
							>
								<td className="px-4">
									{type.name}
								</td>
								<td className="px-4 py-1">
									<ColorSelectForm currentColor={type.color.name} eventTypes={eventTypes} />
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}