import { Link } from "react-router";

function NotFoundPage() {
   return (
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
         <h1 className="text-3xl font-semibold tracking-tight">Page Not Found</h1>
         <p className="mt-2 text-muted-foreground">
            The link you clicked may be broken or the page may have been removed.
         </p>
         <Link className="mt-5 inline-block text-primary underline-offset-4 hover:underline" to={'/'}>
            Return to Home Page
         </Link>
      </section>
   );
}

export default NotFoundPage;