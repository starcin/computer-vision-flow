export default function FunctionList({ functions }) {
	return (
		<div className="function-list">
			{functions.map((f) => {
				return <button>{f.name}</button>
			})}
		</div>
	)
}
