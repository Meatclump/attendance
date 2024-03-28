import { getEventTypes } from "@/app/actions"

export const EventTypeTable = async () => {
	const eventTypes = await getEventTypes()
	console.log(eventTypes)
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
									<select
										className={`bg-${type.color.toLocaleLowerCase()}-400 text-slate-900 rounded-md w-full p-1`}
									>
										<option>{type.color}</option>
									</select>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}