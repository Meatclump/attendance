import { EventTypePanel } from "@/app/components/manage/events/event-type-panel"
import { CharacterRosterPanel } from "../components/manage/characters/character-roster-panel"

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
			<CharacterRosterPanel showInactive={showInactive} />
			<EventTypePanel />
		</>
	)
}

export default RosterPage