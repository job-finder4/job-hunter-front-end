export default function (context) {
  console.log("[Middleware] Should not Company");
  if (context.store.getters.isAuthenticated && context.store.getters.getUserRole === 'jobSeeker') {
    context.redirect("/");
  }
}