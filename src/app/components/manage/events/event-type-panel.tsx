import { EventTypeTable } from "@/app/components/manage/events/event-type-table"
import { CardWrapper } from "@/app/components/card/card-wrapper"
import { CardHeader } from "@/app/components/card/card-header"
import { CardContent } from "@/app/components/card/card-content"
import { CardFooter } from "@/app/components/card/card-footer"
import { AddEventTypeForm } from "./add-event-type-form"
import { EventTab } from "./event-tab"

export const EventTypePanel = () => {
	return (
		<div className="flex max-w-[400px]">
			<CardWrapper>
				<CardHeader>
					<h2 className="py-1">Event Types</h2>
					<EventTab />
				</CardHeader>
				<CardContent>
					<EventTypeTable />
				</CardContent>
				<CardFooter>
					<AddEventTypeForm />
				</CardFooter>
			</CardWrapper>
		</div>
	)
}