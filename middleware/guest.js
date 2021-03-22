export default function (context) {
  console.log("[Middleware] Just Guest");
    if (context.store.getters.isAuthenticated) {
      console.log(context.store.getters.isAuthenticated)
      context.redirect("/");
  }
}
