import { CharacterRosterPanel } from "@/app/components/manage/characters/character-roster-panel"
import { EventTypePanel } from "@/app/components/manage/events/event-type-panel"

interface RosterPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

const RosterPage = ({
	searchParams
}: RosterPageProps) => {
	return (
		<>
			<div className="flex flex-1 overflow-y-scroll">
				<div className="rounded-xl bg-slate-100/10 border border-slate-100/20 flex flex-col mx-auto w-full">
					<CharacterRosterPanel searchParams={searchParams} />
				</div>
			</div>
			<div className="flex flex-1 ">
				<div className="rounded-xl bg-slate-100/10 border border-slate-100/20 flex flex-col mx-auto w-full">
					<EventTypePanel />
				</div>
			</div>
		</>
	)
}

export default RosterPage