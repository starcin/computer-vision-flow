import { Box } from "@chakra-ui/react"
import React, { memo, useEffect } from "react"
import { Handle } from "react-flow-renderer"

export default memo(({ data, selected, isConnectable }) => {
	useEffect(() => {
		data.isSelected = selected
		data.onSelectedChanged(selected, data)
	}, [selected])

	return (
		<Box
			bg={selected ? "#eee" : "white"}
			border="1px"
			borderRadius="9px"
			padding="5px 9px"
			fontFamily={`'JetBrains Mono', monospace;`}
		>
			<Handle
				type="target"
				position="top"
				id={data.in}
				style={{
					background: "transparent",
					height: "15px",
					width: "15px",
					top: "-10px",
					borderRadius: "0px",
					border: "solid black",
					borderWidth: "0 5px 5px 0",
					display: "inline-block",
					transform: "translate(-50%, 0) rotate(45deg)",
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
					background: "transparent",
					height: "15px",
					width: "15px",
					bottom: "-7px",
					borderRadius: "0px",
					border: "solid black",
					borderWidth: "0 5px 5px 0",
					display: "inline-block",
					transform: "translate(-50%, 0) rotate(45deg)",
				}}
				isConnectable={isConnectable}
			/>
		</Box>
	)
})
