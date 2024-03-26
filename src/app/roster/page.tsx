import { FaFireFlameCurved } from "react-icons/fa6"
import { getRoster } from "../actions"
import { FaFan } from "react-icons/fa"

const RosterPage = async () => {
	const roster = await getRoster()
	return (
		<div className="flex flex-1 p-4 gap-4">
			<div className="rounded-xl bg-slate-100/20">
				<h2 className="p-4">
					Character Roster
				</h2>
				<table className="table-fixed">
					<thead>
						<tr>
							<th className="px-4 text-start">Name</th>
							<th className="px-4 text-start">Events</th>
						</tr>
					</thead>
					<tbody>
					{
						roster?.map(character => (
							<tr key={character.id} className="odd:bg-slate-100/10">
								<td className="px-4 align-top">
									{character.name}
								</td>
								<td className="px-4 py-2 text-end space-x-4">
									<span className="bg-violet-400 text-zinc-900 p-1 rounded-md">
										Dynamis
									</span>
									<span className="bg-teal-400 p-1 rounded-md text-zinc-900">
										Limbus
									</span>
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RosterPage