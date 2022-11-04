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
                window.location.href ='dashboard.html'
            }
       /*  
        
        if(token != 'undefined' && page == "index.html"){
            this.props.history.push('/')
        } */
        //vm.fn_login(100)
        //console.log('created complete')
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
})
// redireccionar a la primera página de los módulos,funcion para verificar el acceso com la q ya tengo en el otro proyecto
//devolver consulta del usuario
 /* let xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/spiii-vue/model/modelLogin.php");
            //xhr.open("POST", "../model/modelLogin.php");

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = () => console.log(JSON.parse(xhr.response));

            xhr.send(data); */
           /*  fetch(rel_path, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Accept": "application/json"},
                data: data,
            })
            .then((response) =>{
                console.log(response.text())
            }).then((result) =>{
                console.log(result);
            })
            .catch(err => {
                console.error(err);
            })  

            console.log('login')
            console.log('email = ' + vm.usuario.email)
            console.log('login= ' + vm.usuario.password)
          */