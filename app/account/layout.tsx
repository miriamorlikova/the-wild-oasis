import SideNavigation from "../_components/SideNavigation";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="grid grid-cols-[16rem_1fr] h-full gap-12">
			<SideNavigation />
			<div className="py-1">{children}</div>
		</div>
	);
};
export default Layout;
