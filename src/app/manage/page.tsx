import { EventTypePanel } from "@/app/components/manage/events/event-type-panel"
import { CharacterRosterPanel } from "../components/manage/characters/character-roster-panel"

interface RosterPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

const RosterPage = ({
	searchParams
}: RosterPageProps) => {
	const rosterActiveTab = searchParams?.rosterTab === 'inactive'
	const eventActiveTab = searchParams?.eventTab === 'inactive'
	return (
		<>
			<CharacterRosterPanel showInactive={rosterActiveTab} />
			<EventTypePanel showInactive={eventActiveTab} />
		</>
	)
}

export default RosterPage