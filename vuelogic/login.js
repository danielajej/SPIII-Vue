app = new Vue({
    //referencia al elemento con el id app
    el: '#app',
    data:{
        title: 'Login',
        usuario: {
            email: '',
            password: ''
        },
        showLogin:true,
        showRecuperar:false
    },
    created(){
        var vm = this
        //si esta logeado y va al login redirige al primer modulo
            console.log("created")
            var token = localStorage.getItem("token")
            console.log(token)
            let url = window.location.href
            let urlElements = url.split("/")
            let page = urlElements[urlElements.length - 1]
            console.log(page)

            if(token != null && page == "index.html"){
                window.location.href ='Dashboard.html'
            }
    },
    methods: {
        
        fn_login(){
            var vm = this
            //var rel_path = '../model/modelLogin.php'
            options = {
                url: 'http://localhost/SPII-jwt/loginJWT.php',
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Accept": "application/json"},
                data: JSON.stringify({ _function: 'login', email: vm.usuario.email, password: vm.usuario.password})
            }
            $.ajax(options)
            .done((response) => {
                console.log(response);
                if(response.login){
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("loggedIn", true);
                    window.location.assign(`http://localhost/SPIII-Vue/view/${response.homepage}`) 
                }else{
                    alert(response.message)
                }
            })
            .fail((err)=>{
                console.error(`Ha ocurrido un error, status: ${err.status} =====> ${err.statusText}`)
            })
        },
        fn_recovery(){
            var vm = this;
            console.log('clicked')
            vm.showLogin = false
            vm.showRecuperar = true
        },
        fn_cancelar(){
            var vm = this;
            vm.showLogin = true
            vm.showRecuperar = false
        },
        fn_enviar(){
            console.log('enviar');
        }
    }
});