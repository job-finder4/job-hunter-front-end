export default function (context) {
  console.log("[Middleware] ShouldCompany");
  console.log(context.store.getters.isAuthenticated)

  if (!context.store.getters.isAuthenticated) {
    console.log('not Authenticated')
    context.redirect("/");
  }
  if (context.store.getters.getUserRole !== 'jobSeeker' && context.store.getters.getUserRole !== 'admin') {
    console.log('not JobSeeker')
    context.redirect("/");
  }
}
