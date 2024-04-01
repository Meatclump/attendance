import { EventTypeTable } from "@/app/components/manage/events/event-type-table"

export const EventTypePanel = () => {
	return (
		<div className="border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
			<EventTypeTable />
		</div>
	)
}