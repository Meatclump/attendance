import type { Prisma } from "@prisma/client"
import { AddEventTypeToCharacterForm } from "./add-event-type-to-character-form"
import { RemoveEventTypeFromCharacterForm } from "./remove-event-type-from-character-form"

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
	
	return (
		<div className="flex gap-2">
			{
				character.eventTypes.map(type => 
					<RemoveEventTypeFromCharacterForm type={type} character={character} key={type.id} />
				)
			}
			<AddEventTypeToCharacterForm character={character} />
		</div>
	)
}