import { Suspense } from "react"
import { AddCharacterForm } from "./add-character-form"
import { RosterTable } from "./roster-table"

interface RosterPageProps {
	showInactive: boolean
}

export const CharacterRosterPanel = ({
	showInactive
}: RosterPageProps) => {
	return (
		<>
			<div className="flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
				{
					showInactive
						? (
							<Suspense fallback="Loading...">
								<RosterTable inactive={showInactive} />
							</Suspense>
						) : (
							<Suspense fallback="Loading...">
								<RosterTable inactive={showInactive} />
							</Suspense>
						)
				}
			</div>
			<div className="p-4 border-t border-t-slate-100/20">
				<AddCharacterForm />
			</div>
		</>
	)
}