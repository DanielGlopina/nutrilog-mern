import { useAuthStore } from "@/store/useAuthStore"
import { Outlet, Navigate} from "react-router"


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
