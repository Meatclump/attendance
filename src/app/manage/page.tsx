import { CharacterRosterPanel } from "@/app/components/manage/characters/character-roster-panel"
import { EventTypePanel } from "@/app/components/manage/events/event-type-panel"
import { CardWrapper } from "../components/card/card-wrapper"
import { CardHeader } from "../components/card/card-header"
import Link from "next/link"

interface RosterPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

const RosterPage = ({
	searchParams
}: RosterPageProps) => {
	const params = searchParams
	const showInactive = params.tab === "inactive"
	return (
		<>
			<CardWrapper>
				<CardHeader>
					<h2 className="flex-1 py-1">
						Character Roster
					</h2>
					<div className="flex gap-4 justify-end">
						<Link
							className={`${!showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
							href="?tab=active"
						>
							Active
						</Link>
						<Link
							className={`${showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
							href="?tab=inactive"
						>
							Inactive
						</Link>
					</div>
				</CardHeader>
				<CharacterRosterPanel showInactive={showInactive} />
			</CardWrapper>
			<CardWrapper>
				<CardHeader>
					<h2 className="py-1">Event Types</h2>
				</CardHeader>
				<EventTypePanel />
			</CardWrapper>
		</>
	)
}

export default RosterPage