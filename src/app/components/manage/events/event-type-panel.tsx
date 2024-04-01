import { EventTypeTable } from "@/app/components/manage/events/event-type-table"
import { CardWrapper } from "@/app/components/card/card-wrapper"
import { CardHeader } from "@/app/components/card/card-header"
import { CardContent } from "@/app/components/card/card-content"

export const EventTypePanel = () => {
	return (

		<CardWrapper>
			<CardHeader>
				<h2 className="py-1">Event Types</h2>
			</CardHeader>
			<CardContent>
				<EventTypeTable />
			</CardContent>
		</CardWrapper>
	)
}