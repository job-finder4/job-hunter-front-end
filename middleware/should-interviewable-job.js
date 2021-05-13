export default async function ({store, params, error, $axios,redirect}) {
  console.log("[Middleware] ShouldInterviewAbleJob");
  try {
    let {data} = await $axios.get(`api/jobads/${params.id}/check-interview-able`)
    store.commit('SET_INTERVIEWERS_COUNT', data)
  } catch (e) {
    error(e.response.data.errors.description)
    if (process.client){
      setTimeout(()=>{
        redirect('/')
      },10,redirect)
    }

  }
}
