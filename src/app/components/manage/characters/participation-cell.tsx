import type { Prisma } from "@prisma/client"
import { AddEventTypeToCharacterForm } from "./add-event-type-to-character-form"
import { RemoveEventTypeFromCharacterForm } from "./remove-event-type-from-character-form"
import { getEventTypes } from "@/app/actions"

interface ParticipationCellProps {
	character: Prisma.CharacterGetPayload<{
		include: {
			eventTypes: {
				include: {
					color: true
				}
			}
		}
	}>
}

export const ParticipationCell = async ({
	character
}: ParticipationCellProps) => {
	const eventTypes = await getEventTypes()
	return (
		<div>
			{
				character.eventTypes.map(type => 
					<RemoveEventTypeFromCharacterForm type={type} character={character} key={type.id} />
				)
			}
			{
				eventTypes &&
				<AddEventTypeToCharacterForm character={character} eventTypes={eventTypes} />
			}
		</div>
	)
}