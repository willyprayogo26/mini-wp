const baseUrl = "http://localhost:3000/api"

var article = new Vue({
    el: '#article',
    data: {
        search: '',
        id: '',
        title: '',
        content: '',
        articles: [],
        form: false,
        edit: false,
        allData: true
    },
    computed: {
        findArticle: function() {
            return this.articles.filter(article => {
                var date = Date.parse(article.created_at);
                var newFormatDate = new Date(date).toLocaleString()

                article.created_at = newFormatDate

                return article.title.indexOf(this.search) > -1
            })
        },
    },
    methods: {
      getArticle: function() {
        axios
            .get(`${baseUrl}/article`)
            .then(({data}) => {
                this.articles = data
            })
            .catch(err => {
                console.log(err)
            })
      },

      addArticle: function() {
          let data = {
              title: this.title,
              content: this.content
          }

          axios
            .post(`${baseUrl}/article`, data)
            .then(({ data }) => {
                this.title = ''
                this.content = ''
                this.getArticle()
                this.cancelForm()
            })
            .catch(err => {
                console.log(err)
            })
      },

      updateArticle: function() {
        let update = {
            title: this.title,
            content: this.content
        }

        axios
            .put(`${baseUrl}/article/${this.id}`, update)
            .then(({ data }) => {
                this.id = ''
                this.title = ''
                this.content = ''
                this.getArticle()
                this.cancelForm()
            })
            .catch(err => {
                console.log(err)
            })
      },

      deleteArticle: function(id) {
        axios
            .delete(`${baseUrl}/article/${id}`)
            .then(({ data }) => {
                article.getArticle()
            })
            .catch(err => {
                console.log(err)
            })
      },

      getForm: function() {
        if(!this.form) {
            this.id = ''
            this.title = ''
            this.content = ''
            this.edit = false
            this.allData = false
            this.form = true
        }
      },

      editForm: function(id) {
        if(!this.edit) {
            this.form = false
            this.allData = false
            this.edit = true
        }

        axios
            .get(`${baseUrl}/article/${id}`)
            .then(({data}) => {
                this.id = data._id
                this.title = data.title
                this.content = data.content
            })
            .catch(err => {
                console.log(err)
            })

      },

      cancelForm: function() {
          if(this.form || this.edit) {
            this.form = false
            this.edit = false
            this.allData = true
            this.title = ''
            this.content = ''
          }
      }
    }
  })

  article.getArticle()