//esta forma incluye todos los elementos en los archivos en los que se importa el archivo
//implementarlo con la forma props/template 
Vue.component('dynamic-menu', {
    data: function () {
        if(localStorage.getItem("loggedIn")){
            options = {
                method: "POST",
                body: JSON.stringify({
                    _function: "currentToken",
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                }),
            }
            fetch('http://localhost/SPII-jwt/loginJWT.php', options)
            .then(response => response.json())
            .then((jsonData) => {
                //console.log(jsonData)
                //si la verificación devuelve incorrecto
                if (jsonData.success == false) {
                    logout()
                    // si se verifica el token
                } else {
                    //añadimos al menú las urls de los modelos del token
                    let menu = document.getElementById("listId")
                    let modulos = jsonData.modulos
                    let urls = jsonData.modulosUrls
                    
                    modulos.forEach((element, index) => {
                        menu.innerHTML += 
                            `<li class="nav-item">
                                <a class="nav-link " href="./${urls[index]}">${element}</a>
                            </li>`
                    })
                    menu.innerHTML +=   
                        `<li class="nav-item">
                            <button class="btn btn-block nav-link" onclick="logout()">Cerrar Sesión</button>
                        </li>`
                    //obtenemos el último fragmento de la url
                    let url = window.location.href
                    let urlElements = url.split("/")
                    let page = urlElements[urlElements.length - 1]
                    //console.log(page);
                    //si el modulo no se encuentra en el array de modulos del token redireccionamos al primer módulo en el array
                    if (!jsonData.modulosUrls.includes(page)) {
                        window.location.href = jsonData.modulosUrls[0]
                    }
                }
                display_overlay(false)
                //console.log('overlay escondido')
            }).then(
                
            )
            .catch((err)=>{
                console.error(`Ha ocurrido un error, status: ${err.status} =====> ${err.statusText}`)
            })
        }else{
            logout()
        }
        return {}
    },    
    template: `
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="http://localhost/spiii-vue/view/dashboard.html">Ejercicio Integrador</a>
            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNav">
                <ul id="listId" class="navbar-nav align-items-center">
                </ul>
            </div>
        </div>
      </nav>
      `
})

Vue.component('overlay',{
    beforeMount(){
        //console.log('se carga el css, antes de q termine de cargar el dom')
        load_styles()
    },
    mounted(){
        //console.log('se carga el dom')
        display_overlay(true)
        //console.log('overlay desplegado')
    },
    template: `
    <div id="overlay">
        <div id="text">
            <div class="fa-3x">
                <i class="fas fa-circle-notch fa-spin"></i>
            </div>
        </div>
    </div>
    `
})
function logout() {
    localStorage.clear()
    window.location.href = "http://localhost/spiii-vue/view/index.html"
}
function display_overlay(show){
    if(show){
        document.getElementById("overlay").style.display = "block";
        startTime = new Date();
        //console.log(startTime)
        return
    }
    document.getElementById("overlay").style.display = "none";
    endTime = new Date();
    //console.log(endTime)

    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    // get seconds 
    var seconds = Math.round(timeDiff);
    //console.log(seconds + " seconds");
}
function load_styles(){
    var cssId = 'myCss';  // you could encode the css path itself to generate id..
    var FAid = 'FAid';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var linkOwnCss  = document.createElement('link');
        linkOwnCss.id   = cssId;
        linkOwnCss.rel  = 'stylesheet';
        linkOwnCss.type = 'text/css';
        linkOwnCss.href = '../css/styles.scss';
        linkOwnCss.media = 'all';
        head.appendChild(linkOwnCss);
        //appending Font Awesome to every module visited
        var linkFA  = document.createElement('link');
        linkFA.id = FAid
        linkFA.rel  = 'stylesheet';
        linkFA.href = 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
        linkFA.integrity = 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr';
        linkFA.crossOrigin="anonymous"
        head.appendChild(linkFA);
    }
}