import React, { memo } from "react"

import { Handle } from "react-flow-renderer"

export default memo(({ data, isConnectable }) => {
	return (
		<>
			<Handle
				type="target"
				position="left"
				style={{ background: "#555" }}
				onConnect={(params) => console.log("handle onConnect", params)}
				isConnectable={isConnectable}
			/>
			<div style={{ background: "#eee" }}>{data.label}</div>
			<input
				className="nodrag"
				type="color"
				onChange={data.onChange}
				defaultValue={"#555"}
			/>
			<Handle
				type="source"
				position="right"
				id="a"
				style={{ top: 10, background: "#555" }}
				isConnectable={isConnectable}
			/>
			<Handle
				type="source"
				position="right"
				id="b"
				style={{ bottom: 10, top: "auto", background: "#555" }}
				isConnectable={isConnectable}
			/>
		</>
	)
})
