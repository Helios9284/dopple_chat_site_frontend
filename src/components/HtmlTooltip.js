import { Tooltip } from "@mui/material";

const HtmlTooltip = (props) => {
	const { className } = props
	return (
		<Tooltip {...props} classes={{ popper: className }} />
	)
}

export default HtmlTooltip;