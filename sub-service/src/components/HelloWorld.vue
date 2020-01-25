<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>从后台获取个人信息：</h2>
        <ul>
            <li v-for="(info,index) in infoList" :key="index">
                {{info.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import httpUtil from '@http'
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
        },
        data() {
            return {
                infoList: []
            }
        },
        methods: {
            getInfo() {
                httpUtil.getPersonList().then(data => {
                    console.log(data);
                    this.infoList = data;
                })
            }
        },
        mounted() {
            this.getInfo()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
