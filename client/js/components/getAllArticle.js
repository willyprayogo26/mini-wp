Vue.component('get-all-article', {
    props: ['articles'],
    template: `
    <div class="row">
        <div class="card m-3 w-10 h-15" v-for="article in articles" style="width: 15rem;">
            <img class="card-img-top" v-bind:src="article.featured_image" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#read">Read</button>
            </div>
            <div class="modal fade" id="read" tabindex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="title">{{ article.title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img class="card-img-top" v-bind:src="article.featured_image" alt="Card image cap">
                        </div>
                        <div class="modal-body">
                            {{ article.content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})