import { Outlet } from "react-router";
import ClientErrorMessage from "../../ui/client-error-message";

export default function AnonymousLayout() {
    return (
        <div>
            <main className="bg-light w-100 vh-100 d-flex  justify-content-center align-items-center" >
                <Outlet />
            </main>

            <ClientErrorMessage anonymous={true} />
        </div>
    )
}