import { ReactNode } from "react";
import SideNav from "./sidenav";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}:  LayoutProps) => {
    return (
        <section className="py-16 px-4 flex justify-center items-center mt-[24vh]">
            {children}
            <SideNav />
        </section>
    )
}

export default Layout;