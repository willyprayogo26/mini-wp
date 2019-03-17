Vue.component('get-login-form', {
    data: function () {
      return {
        inputEmail: '',
        inputPassword: ''
      }
    },
    methods: {
        toLogin: function() {
            let User = {
                email: this.inputEmail,
                password: this.inputPassword
            }
            axios
                .post(`${baseUrl}/login`, User)
                .then(response => {
                    localStorage.setItem('token', response.data.access_token)
                    this.inputEmail = ''
                    this.inputPassword = ''
                    this.$emit('to-content')
                })
                .catch(err => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated tada'
                        }
                    })
                })
        },
        toLoginGoogle(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            axios
              .post(`${baseUrl}/g-login`, { id_token })
              .then(({ data }) => {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('fullName', data.fullName)
                this.$emit('to-content')
              })
              .catch(err => {
                console.log(err)
              })
          },
    },
    template: `
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                <form class="form-signin" @submit.prevent="toLogin" method="POST">
                    <div class="form-label-group">
                        <input type="email" v-model="inputEmail" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
    
                    <div class="form-label-group">
                        <input type="password" v-model="inputPassword" id="inputPassword" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                    </div>
    
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign In</button>
                    <hr class="my-4">
                    <g-signin-button v-on:done="toLoginGoogle"/>
                </form>
            </div>
        </div>
    </div>
    `
})