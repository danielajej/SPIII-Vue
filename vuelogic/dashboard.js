function buscarEnObjecto(objecto, palabra)  {
    for (let key in objecto) {
        if(objecto[key] != null){
            if (objecto.hasOwnProperty(key) && objecto[key].toString().toLowerCase().includes(palabra) ) {
                return true;
              }
        }
    }
    return false
}

var vm = new Vue({
    el: "#app",
    data: {
        title: 'Lista de Usuarios',
        showLista: true,
        showfrmEditar: false,
        showfrmAgregar: false,
        showOverlay: false,
        search_input: '',
        producto: {
            id: '',
            nombre: '',
            precio: '',
        },
        listaProductos: []
    },

    created() {
        var vm = this;
        vm.fn_getproductos();
    },
    methods: {
        fn_getproductos: function() {
            var vm = this;
            var token = localStorage.getItem('token')

            fetch("http://localhost/SPII-JWT/productos.php", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                })
            }).then(function(response) {
                console.log(response)
                return response.json();
            }).then(function(result) {
                vm.listaProductos = result;
            }).catch(error => console.log('Ha ocurrido un error: ', error));

        },
        fn_delete: function(id) {
            var vm = this;
            var token = localStorage.getItem('token')

            var data = { 
                id: id, 
            };
            console.log("json data>>>" + JSON.stringify(data))
            fetch("http://localhost/SPII-JWT/productos.php", {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                })
            }).then(function(response) {
                return response.json();
            }).then((json)=> {
                if(json){
                    listaProductos = JSON.parse(JSON.stringify(vm.listaProductos))
                    listaProductos = listaProductos.filter((item)=>{
                        return item.id != id 
                    })
                    vm.listaProductos = listaProductos
                    alert('eliminado')
                }}).catch((err) => console.error(err))
            },
        fn_editar: function(item) {
            var vm = this;
            vm.producto = item;
            vm.showfrmEditar = true;
            vm.showLista = false;
        },
        fn_actualizar: function(){
            var token = localStorage.getItem('token')
            var vm = this;
            let nombre = vm.producto.nombre 
            let precio = vm.producto.precio 
            let id = vm.producto.id 
            var data = { 
                id: id, 
                nombre: nombre, 
                precio: precio
            };
            fetch("http://localhost/SPII-JWT/productos.php", {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                })
            }).then(function(response) {
                return response.json();
            }).then((json)=> {
                if(json){
                    console.log(json)
                    listaProductos = JSON.parse(JSON.stringify(vm.listaProductos));
                    console.log(listaProductos)
                    console.log(id)
                    listaProductos.forEach((item, index)=>{
                        if (item.id == id){
                            listaProductos[index].nombre = nombre
                            listaProductos[index].precio = precio
                        }
                    })
                    vm.listaProductos = listaProductos;
                    //console.log(JSON.parse(JSON.stringify(vm.listaProductos)))  
                    alert('actualizado') 
                    this.fn_cancelar()   
                 }
                //console.log("response data>>>"+ JSON.stringify(json))
            })
        },
        fn_cancelar: function() {
            var vm = this;
            vm.showfrmEditar = false;
            vm.showfrmAgregar = false;
            vm.showLista = true;
        },
        fn_agregar: function (){
            var vm = this;
            vm.producto.nombre = ''
            vm.producto.precio= ''
            vm.showfrmAgregar = true;
            vm.showLista = false;
        },
        fn_guardar: function(){
            var token = localStorage.getItem('token')
            var vm = this;
            let nombre = vm.producto.nombre 
            let precio = vm.producto.precio 
            var data = { 
                nombre: nombre, 
                precio: precio
            };
            fetch("http://localhost/SPII-JWT/productos.php", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                })
            }).then(function(response) {
                return response.json();
            }).then((json)=> {
                console.log(json)
                if(json){
                    listaProductos = JSON.parse(JSON.stringify(vm.listaProductos));
                    listaProductos.push({nombre:nombre, precio: precio});
                    vm.listaProductos = listaProductos;
                    //console.log(JSON.parse(JSON.stringify(vm.listaProductos)))  
                    alert('creado')
                    this.fn_cancelar()
                }
            }).catch((err) => console.error(err))
        }
    },
    computed:{
        searchProduct: function () {
            if (this.listaProductos != null){
                return this.listaProductos.filter((item) => {
                    return buscarEnObjecto(item, this.search_input.toLowerCase());
                });
            }
        }
    },
});

/* app = new Vue({
        el: '#app',
        mounted(){
            this.eventFromAppTrigger = true
        },
        data(){
            return {
                tableOptions        : {
                    "title":"JD-Table Demo [Default]",
                    columns             : [
                        {
                            name          : 'businessName',
                            title         : 'Business Name',
                            order         : 1,
                            type          : 'String',
                            filterable    : true,
                            enabled       : true,
                            sort          : true,
                            sortDirection : 'asc',
                        },
                        {
                            name        : 'founderName',
                            title       : 'Founder Name',
                            order       : 2,
                            type        : 'String',
                            filterable    : true,
                            enabled       : true,
                            sort          : true,
                            sortDirection : 'asc',
                        }
                    ],
                    search: true
                },
                eventFromApp        : {
                    'name': 'sendData',
                    'payload':[
                        {
                            businessName : 'Burger King',
                            founderName  : 'James McLamore'    	
                        },
                        // Row 2
                        {
                            businessName : 'Mc Donalds',
                            founderName  : 'Maurice McDonald'   
                        }
                        // Row 3
                        ,
                        {
                            businessName : 'Wendies',
                            founderName  : 'Dave Thomas'   
                        }
                    ]
                },
                eventFromAppTrigger : false,
                tableLoader         : false,
                
            }
        },
}) */
 /* methods: {
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
                    window.location.assign("http://localhost/spiii-vue/view/dashboard.html") 
                }else{
                    alert(response.message)
                }
            })
            .fail((err)=>{
                console.error(`Ha ocurrido un error, status: ${err.status} =====> ${err.statusText}`)
            })
        } 
    } */