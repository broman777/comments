<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="#" v-if="account.user">Hi, {{ account.user.username}}!</a>
            <a class="navbar-brand" href="#" v-else>Comments</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-if="account.user">
                        <a class="nav-link" href="/login">Logout</a>
                    </li>
                    <li class="nav-item" v-else>
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0" v-if="account.user" @submit.prevent="handleSubmit">
                    <input type="text" v-model="message" name="message" class="form-control mr-sm-2" placeholder="Enter comment here" :class="{ 'is-invalid': submitted && !message }" />
                    <div v-show="submitted && !message" class="invalid-feedback">Message is required</div> 
                    <button class="btn btn-light my-sm-0" type="submit">Send</button>
                </form>
                <div v-else>
                    <router-link to="/login">Logout</router-link>
                </div>
            </div>
        </nav>
        <div v-for="comment in comments" :key="comment._id">
            <br>
            <div class="card">
                <div class="card-header">
                {{comment.name + ' ' + comment.surname}}
                </div>
                <div class="card-body">
                    <p class="card-text">{{comment.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            message: '',
            submitted: false
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            comments: state => state.comments.comments
        })
    },
    created () {
        this.getAllComments();
    },
    methods: {
        ...mapActions('comments', {
            getAllComments: 'get',
            writeComment: 'write'
        }),
        handleSubmit (e) {
            this.submitted = true;
            const { message } = this;
            if (message) {
                this.writeComment({ 
                    username: this.account.user.username,
                    name: this.account.user.name,
                    surname: this.account.user.surname,
                    text: message 
                })
            }
        }
    }
};
</script>