import { getInactiveRoster, getRoster } from "@/app/actions"
import { DeleteCharacterForm } from "@/app/components/delete-character-form"
import { RestoreCharacterForm } from "@/app/components/restore-character-form"
import { Suspense } from "react"

interface RosterTableProps {
	inactive: boolean
}

export const RosterTable = async ({
	inactive
}: RosterTableProps) => {
	const roster = inactive
		? await getInactiveRoster()
		: await getRoster()

	return (
		<table className="table-fixed w-full">
			<thead>
				<tr>
					<th className="px-4 text-start w-[200px]">
						Character
					</th>
					<th className="px-4 text-start">
						Participates In
					</th>
					<th className="px-4 text-center w-[150px]">
						{
							inactive
							? (<>Reactivate</>)
							: (<>Remove</>)
						}
					</th>
				</tr>
			</thead>
			<tbody>
				{
					roster?.map(character => (
						<tr key={character.id} className="odd:bg-slate-100/10 hover:bg-orange-100/20">
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
									{
										inactive
										? <RestoreCharacterForm character={character} />
										: <DeleteCharacterForm character={character} />
									}
								</div>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}