"use client";

import { useState } from "react";

type TextExpanderProps = {
	children: React.ReactNode;
};
const TextExpander = ({ children }: TextExpanderProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!children) {
		return <span> </span>;
	}

	const descriptionText = typeof children === "string" ? children : "";
	const displayText = isExpanded
		? descriptionText
		: descriptionText.split(" ").slice(0, 40).join(" ") + "...";

	return (
		<span>
			{displayText}
			<button
				className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? "Show less" : "Show more"}
			</button>
		</span>
	);
};

export default TextExpander;
