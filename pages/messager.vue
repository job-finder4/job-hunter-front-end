<template>
  <div>
    job<br>{{job}}
    <div>
      <div id = 'pdfDom'>
        to be downloaded into the content pdf
      <p>
        danielll
      </p></div>
      <div>
        <Button @click ="getPdf(htmlTitle)"> download </button>
      </div>
    </div>
    <div>
      <button @click ="getPdf(htmlTitle)">Download PDF WITH CSS</button>
      <br>
      <br>
      <button @click="download">Download PDF WITHOUT CSS</button>
      <div ref="content">
        <v-text-field outlined v-model="job">
        </v-text-field>
        <p style="background-color: red;">Hello Vue in CodeSandbox!</p>
        <h3>Installed CLI Plugins</h3>
        <ul>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
              target="_blank"
              rel="noopener"
            >babel</a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
              target="_blank"
              rel="noopener"
            >eslint</a>
          </li>
        </ul>
        <h3>Essential Links</h3>
        <h3>Ecosystem</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pusher",
    data() {
      return {
        job:null,
        htmlTitle: 'resume',
      }
    },
    methods: {
      // broadcast() {
      //   this.$echo.channel('jobs')
      //     .listen('.TestJobEvent', (e) => {
      //       this.job=e.name
      //       console.log(e.name);
      //     });
      //
      //   this.$echo.private('my-approved-jobs.'+42)
      //     .listen('.TestJobEvent', (e) => {
      //       this.job=e.name
      //       alert(e)
      //     })
      // }
    }
  }
</script>
