Vue.component('get-regis-form', {
    data: function () {
      return {
        inputFullname: '',
        inputEmail: '',
        inputPassword: ''
      }
    },
    methods: {
        toRegis: function() {
            let newUser = {
                fullName: this.inputFullname,
                email: this.inputEmail,
                password: this.inputPassword
            }
            axios
                .post(`${baseUrl}/register`, newUser)
                .then(response => {
                    this.inputFullname = ''
                    this.inputEmail = ''
                    this.inputPassword = ''
                    Swal.fire({
                        type: 'success',
                        title: 'Successful registration',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    if(err.response.data.errors.email) {
                        Swal.fire({
                            title: err.response.data.errors.email.message,
                            animation: false,
                            customClass: {
                                popup: 'animated tada'
                            }
                        })
                    } else if(err.response.data.errors.password){
                        Swal.fire({
                            title: err.response.data.errors.password.message,
                            animation: false,
                            customClass: {
                                popup: 'animated tada'
                            }
                        })
                    }
                })
        }
    },
    template: `
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body">
            <h5 class="card-title text-center">Registration</h5>
            <form class="form-signin" @submit.prevent="toRegis" method="POST">
                <div class="form-label-group">
                    <input type="text" v-model="inputFullname" id="inputFullname" class="form-control" placeholder="Fullname" required autofocus>
                    <label for="inputFullname">Fullname</label>
                </div>

                <div class="form-label-group">
                    <input type="email" v-model="inputEmail" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                    <input type="password" v-model="inputPassword" id="inputPassword" class="form-control" placeholder="Password" required>
                    <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
            </form>
            </div>
        </div>
    </div>
    `
})