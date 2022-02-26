export default function FunctionList({ functions, onItemSelected }) {
	return (
		<div className="function-list">
			{functions.map((f) => {
				return (
					<button
						key={f.id}
						onClick={() => {
							onItemSelected(f)
						}}
					>
						{f.name}
					</button>
				)
			})}
		</div>
	)
}
