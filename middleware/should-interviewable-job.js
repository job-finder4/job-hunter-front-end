export default async function ({store, params, error, $axios, redirect, app}) {
  console.log("[Middleware] ShouldInterviewAbleJob");
  try {
    let {data} = await $axios.get(`backend/api/jobads/${params.id}/check-interview-able`)
    store.commit('SET_INTERVIEWERS_COUNT', data)
  } catch (e) {
    if (process.client) {
      app.$toast.error(e.response.data.errors.description)
      redirect('/')
    } else {
      error(e.response.data.errors.description)
    }
  }

}
