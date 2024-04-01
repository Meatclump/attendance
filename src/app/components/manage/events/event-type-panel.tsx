import { EventTypeTable } from "@/app/components/manage/events/event-type-table"
import { CardWrapper } from "@/app/components/card/card-wrapper"
import { CardHeader } from "@/app/components/card/card-header"
import { CardContent } from "@/app/components/card/card-content"
import { CardFooter } from "@/app/components/card/card-footer"
import { AddEventTypeForm } from "./add-event-type-form"
import { EventTab } from "./event-tab"

interface EventTypePanelProps {
	showInactive: boolean
}

export const EventTypePanel = ({
	showInactive
}: EventTypePanelProps) => {
	return (
		<div className="flex max-w-[400px]">
			<CardWrapper>
				<CardHeader>
					<h2 className="py-1">Event Types</h2>
					<EventTab />
				</CardHeader>
				<CardContent>
					<EventTypeTable showInactive={showInactive} />
				</CardContent>
				<CardFooter>
					<AddEventTypeForm />
				</CardFooter>
			</CardWrapper>
		</div>
	)
}