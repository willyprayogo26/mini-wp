const baseUrl = 'http://localhost:3000'

var app = new Vue({
    el: "#app",
    data: {
        articles: [],
        isLogin: false,
        isRegis: true,
        isAll: false,
        inputTitle: '',
        inputContent: '',
        featured_image: ''
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.isRegis = null
            this.isLogin = true
            this.isAll = true
            this.getAllArticle()
        }
    },
    methods: {
        getRegisForm: function() {
            this.isRegis = true
        },
        getLoginForm: function() {
            this.isRegis = false
            this.isLogin = false
            this.articles = []
            localStorage.clear()
        },
        getAddArticleForm: function() {
            this.inputTitle = ''
            this.inputContent = ''
            this.author = ''
            this.featured_image = ''
        },
        getContent: function() {
            this.isRegis = null
            this.isLogin = true
            this.isAll = true
            this.getAllArticle()
        },
        getAllArticle: function() {
            axios
                .get(`${baseUrl}`)
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getArticleByUser: function() {
            let access_token = localStorage.getItem('access_token')
            axios
                .get(`${baseUrl}/article`, {headers: {access_token}})
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        
        handleFileUpload() {
            this.featured_image = this.$refs.file.files[0]
        },

        addArticle: function() {
            let access_token = localStorage.getItem('access_token')
            let data = new FormData()
            data.append('title', this.inputTitle)
            data.append('content', this.inputContent)
            data.append('image', this.featured_image)
            axios({
            method: 'POST',
            url: `${baseUrl}/article`,
            data,
            headers: {
                access_token: access_token,
                'Content-Type': 'multipart/form-data'
            }
            })
                .then(response => {
                    this.inputTitle = ''
                    this.inputContent = ''
                    this.featured_image = ''
                    Swal.fire({
                        type: 'success',
                        title: 'Successful add Article',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err)
                })
        },

        updateArticle: function() {
            let update = {
                title: this.inputTitle,
                content: this.inputContent
            }
    
            axios
                .put(`${baseUrl}/article/${this.id}`, update)
                .then(({ data }) => {
                    this.inputTitle = ''
                    this.inputContent = ''
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err)
                })
          },
    
          deleteArticle: function(id) {
            axios
                .delete(`${baseUrl}/article/${id}`)
                .then(({ data }) => {
                    article.getAllArticle()
                })
                .catch(err => {
                    console.log(err)
                })
          },
    }
})