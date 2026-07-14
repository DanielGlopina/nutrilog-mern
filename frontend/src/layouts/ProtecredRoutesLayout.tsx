import { useAuthStore } from "@/store/useAuthStore"
import { Outlet, Navigate} from "react-router"


// Route guard shared by all screens that require an authenticated session.
const ProtecredRoutesLayout = () => {
  const {isAuthenticated} = useAuthStore();

  return (
    <>
        {isAuthenticated ? (
            <Outlet/>
        ) 
        : (
            <Navigate to="/auth/?mode=login"/>
        )}
    </>
  )
}

export default ProtecredRoutesLayout
