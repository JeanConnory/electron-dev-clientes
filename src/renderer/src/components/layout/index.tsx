import { Outlet } from "react-router-dom";
import { Header } from "../header";
import * as Collapsible from '@radix-ui/react-collapsible';
import { Sidebar } from "../sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Layout() {
    const [isSideBarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        function handleNavigate() {
            navigate("/create");
        }
        const unsub = window.api.onNewCustomer(handleNavigate);

        return () => {
            unsub();
        }
    }, []);

    return (
        <Collapsible.Root
            defaultOpen
            className="h-screen w-screen bg-gray-950 text-slate-100 flex"
            onOpenChange={setIsSidebarOpen}>
            <Sidebar />
            <div className="flex-1 flex flex-col max-h-screen">
                <Header isSidebarOpen={isSideBarOpen} />
                <Outlet />
            </div>
        </Collapsible.Root>
    )
}