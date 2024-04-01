import { getInactiveRoster, getRoster } from "@/app/actions"
import { RemoveCharacterForm } from "@/app/components/manage/characters/remove-character-form"
import { RestoreCharacterForm } from "@/app/components/manage/characters/restore-character-form"
import { ParticipationCell } from "@/app/components/manage/characters/participation-cell"
import { Suspense } from "react"
import { Spinner } from "../../spinner"

interface RosterTableProps {
	inactive: boolean
}

export const RosterTable = async ({
	inactive
}: RosterTableProps) => {
	console.log(inactive)
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
								<td className="px-4 align-middle">
									{character.name}
								</td>
								<td className="px-4 py-1 space-x-4">
									{
										character &&
										<Suspense fallback={<Spinner ariaLabel="Loading participation tags" />}>
											<ParticipationCell character={character} />
										</Suspense>
									}
								</td>
								<td>
									<div className="flex items-center justify-center">
										{
											inactive
												? <RestoreCharacterForm character={character} />
												: <RemoveCharacterForm character={character} />
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