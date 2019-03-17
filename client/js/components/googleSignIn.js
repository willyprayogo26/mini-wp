Vue.component('g-signin-button', {
    template: `
      <button ref="signinBtn" class="g-signin2 btn btn-lg btn-google btn-block text-uppercase"><i class="fa fa-google mr-2"></i> Sign in with google</button>
    `,
    mounted() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '280167018459-0ekh5bdr1l75uvr23cbig5un04vq54r1.apps.googleusercontent.com'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.$emit('done', googleUser)
        }, error => console.log(error))
      })
    }
  })