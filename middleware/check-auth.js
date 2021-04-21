export default function(context) {
  console.log("[Middleware] Check Auth");
  // console.log(context.$auth.$state)
  context.store.dispatch("initAuth", context.req);
}
