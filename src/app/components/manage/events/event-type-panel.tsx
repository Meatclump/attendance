import { EventTypeTable } from "@/app/components/manage/events/event-type-table"

export const EventTypePanel = () => {
	return (
		<>
			<div className="flex items-center gap-4 p-4">
				<h2 className="py-1">Event Types</h2>
			</div>
			<div className="flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
				<EventTypeTable />
			</div>
		</>
	)
}