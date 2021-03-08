<template>
    <div class="notfound-wrapper">
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-h1">
                    <img src="../assets/images/sadface.jpeg" />
                </div>
                <div class="notfound-content">
                    <h2>404 - 页面未找到...</h2>
                    <p>
                        您要查找的页面的可能已被删除或名称被更改，暂时不能被访问。
                    </p>
                    <router-link to="/welcome">返回首页</router-link>
                </div>
            </div>
        </div>
    </div></template
>

<script>
export default {
    name: 'NotFound',
}
</script>

<style scoped>
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.notfound-wrapper {
    padding: 0;
    margin: 0;
}
.notfound {
    display: flex;
    margin: 25% 0 0 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.notfound .notfound-h1 {
    display: flex;
}

.notfound .notfound-h1 h1 {
    font-family: 'Passion One', cursive;
    color: #00b5c3;
    font-size: 150px;
    letter-spacing: 15.5px;
    margin: 0px;
    font-weight: 900;
}
.notfound-content {
    width: 450px;
    margin: 30px 0 0 50px;
}
.notfound .notfound-content h2 {
    font-family: 'Raleway', sans-serif;
    color: #292929;
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    margin-top: 0;
}

.notfound .notfound-content p {
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
}

.notfound .notfound-content a {
    margin-top: 30px;
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    background: #fff;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 40px;
    color: #292929;
    font-weight: 700;
    -webkit-box-shadow: 0px 4px 15px -5px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 4px 15px -5px rgba(0, 0, 0, 0.3);
    -webkit-transition: 0.2s all;
    transition: 0.2s all;
}

.notfound .notfound-content a:hover {
    color: #fff;
    background-color: #00b5c3;
}
</style>
