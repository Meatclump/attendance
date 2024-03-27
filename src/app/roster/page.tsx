import { AddCharacterForm } from "@/app/components/add-character-form"
import { RosterTable } from "@/app/components/roster-table"

const RosterPage = () => {
	return (
		<div className="flex flex-1 p-4 gap-4 overflow-y-scroll">
			<div className="rounded-xl bg-slate-100/10 border border-slate-100/20 flex flex-col">
				<h2 className="p-4">
					Character Roster
				</h2>
				<div className="max-w-[500px] flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
					<RosterTable />
				</div>
				<div className="p-4 border-t border-t-slate-100/20">
					<AddCharacterForm />
				</div>
			</div>
		</div>
	)
}

export default RosterPage