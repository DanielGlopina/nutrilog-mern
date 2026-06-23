import { useSearchParams } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import NotFoundPage from "./NotFoundPage";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const pageMode = searchParams.get('mode');

  if(!pageMode || pageMode !== 'login' && pageMode !== 'signup'){
    return <NotFoundPage/>
  }

  return (
     <Card className="w-[90%] sm:w-100 mx-auto mt-10 border">
         <CardHeader>
            <CardTitle className="text-2xl">{pageMode === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
            <CardDescription>{pageMode === 'login' ?
            'Login to existing account':
            'Register new account & get full-access to Nutrilog'}</CardDescription>
         </CardHeader>
         <CardContent>
           {
            pageMode === 'login' && (
                <LoginForm/>
            )
           }
           {
            pageMode === 'signup' && (
                <SignupForm/>
            )
           }
         </CardContent>
      </Card>
  )
}

export default AuthPage