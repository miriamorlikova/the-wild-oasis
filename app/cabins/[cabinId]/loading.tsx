import Spinner from "@/app/_components/Spinner";

const Loading = () => {
	return (
		<div className="grid items-center justify-center mt-5">
			<Spinner />
			<p className="text-xl text-primary-200 mt-2">Loading cabin data...</p>
		</div>
	);
};
export default Loading;
