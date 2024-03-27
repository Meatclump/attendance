import { getRoster } from "@/app/actions"
import { DeleteCharacterForm } from "./delete-character-form"

export const RosterTable = async () => {
	const roster = await getRoster()
	return (
		<table className="table-fixed w-full">
			<thead>
				<tr>
					<th className="px-4 text-start w-[200px]">Character</th>
					<th className="px-4 text-start">Participates In</th>
					<th className="px-4 text-center w-[80px]">Delete</th>
				</tr>
			</thead>
			<tbody>
				{
					roster?.map(character => (
						<tr key={character.id} className="odd:bg-slate-100/10">
							<td className="px-4 align-top">
								{character.name}
							</td>
							<td className="px-4 py-1 space-x-4">
								<span className="bg-violet-400 text-zinc-900 p-1 rounded-md text-sm">
									Dynamis
								</span>
								<span className="bg-teal-400 p-1 rounded-md text-zinc-900 text-sm">
									Limbus
								</span>
							</td>
							<td>
								<div className="flex items-center justify-center">
									<DeleteCharacterForm characterId={character.id} />
								</div>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}