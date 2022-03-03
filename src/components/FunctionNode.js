import { Box } from "@chakra-ui/react"
import React, { memo, useEffect } from "react"
import { Handle } from "react-flow-renderer"

export default memo(({ data, selected, isConnectable, id }) => {
	useEffect(() => {
		data.isSelected = selected
		data.onSelectedChanged(selected, id, data)
	}, [selected])

	return (
		<Box
			bg={selected ? "#eee" : "white"}
			border="1px"
			borderRadius="9px"
			padding="5px 9px"
			fontFamily={`'JetBrains Mono', monospace;`}
			style={{ position: "relative", left: "-50%" }}
		>
			<button
				className="nodrag" // This class name is needed so the "selected" event does not fire
				onClick={(event) => data.onDeleteClicked(event, id)}
				style={{
					background: "#fff",
					border: " solid 1px",
					borderRadius: "100%",
					display: "inline-block",
					aspectRatio: "1",
					width: "20px",
					lineHeight: "5px",
					position: "absolute",
					top: "-10px",
					right: "-10px",
				}}
			>
				×
			</button>
			<Handle
				type="target"
				position="top"
				id={data.in}
				style={{
					background: "#999",
					height: "10px",
					width: "10px",
					top: "-4px",
				}}
				onConnect={(params) => console.log("handle onConnect", params)}
				isConnectable={isConnectable}
			/>
			<div>
				<strong>{data.label}</strong>
			</div>
			<label>
				{data.module ? (
					data.module.name
				) : (
					<span style={{ color: "red" }}>Select a module</span>
				)}
			</label>
			<Handle
				type="source"
				position="bottom"
				id={data.out}
				style={{
					background: "#999",
					height: "10px",
					width: "10px",
					bottom: "-5px",
				}}
				isConnectable={isConnectable}
			/>
		</Box>
	)
})
