

import { getEventColors, getEventTypes, getInactiveEventTypes } from "@/app/actions"
import { ColorSelectForm } from "./color-select-form"
import { RestoreEventTypeForm } from "./restore-event-type-form"
import { RemoveEventTypeForm } from "./remove-event-type-form"

interface EventTypeTableProps {
	showInactive: boolean
}

export const EventTypeTable = async ({
	showInactive
}: EventTypeTableProps) => {
	const eventTypes = showInactive
		? await getInactiveEventTypes()
		: await getEventTypes()

	const eventColors = await getEventColors()

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
						<th className="px-4 text-center w-[150px]">
							{
								showInactive
									? (<>Reactivate</>)
									: (<>Remove</>)
							}
						</th>
					</tr>
				</thead>
				<tbody>
					{
						eventTypes && eventColors && eventTypes.sort((a, b) => a.name.localeCompare(b.name)).map(type => (
							<tr
								key={type.id}
								className="odd:bg-slate-100/10 hover:bg-orange-100/20"
							>
								<td className="px-4">
									{type.name}
								</td>
								<td className="px-4 py-1">
									<ColorSelectForm currentEvent={type} eventColors={eventColors} />
								</td>
								<td>
									<div className="flex items-center justify-center">
										{
											showInactive
												? <RestoreEventTypeForm eventType={type} />
												: <RemoveEventTypeForm eventType={type} />
										}
									</div>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}