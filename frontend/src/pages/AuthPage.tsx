import { useSearchParams, Link } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import NotFoundPage from "./NotFoundPage";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const pageMode = searchParams.get('mode');

  if(!pageMode || pageMode !== 'login' && pageMode !== 'signup'){
    return <NotFoundPage/>
  }

  return (
    <>
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
         <CardDescription className='text-center'>
         {pageMode === 'login' ? 'Have no account yet' : 'Already have an account'}?{' '}
         <Link to={`/auth/?mode=${pageMode === 'login' ? 'signup' : 'login'}`} className='font-bold underline'>
           {pageMode === 'login' ? 'Register now!' : 'Log In now!'}
         </Link>
      </CardDescription>
      </Card>

      {
        pageMode === 'signup' && (
          <Alert variant="default" className="w-[90%] sm:w-100 mx-auto mt-3">
          <InfoIcon />
          <AlertTitle>Profile picture</AlertTitle>
          <AlertDescription>
            In this app we use avatars provided by Gravatar. Proceed by {<a href="https://ru.gravatar.com/" target="_blank">link</a>} if You&apos;d like to specify it.
          </AlertDescription>
          </Alert>
        )
      }
    </>
  )
}

export default AuthPage