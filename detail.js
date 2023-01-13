const { createApp } = Vue
createApp( {
    data(){
        return {
            tarjetas : [],
            tarjetasFiltradas : [],
        }
    },
    created(){
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then( respuesta => respuesta.json() )
            .then( datos => {            
                let cadenaParametroUrl = location.search
                let parametros = new URLSearchParams(cadenaParametroUrl)
                let id= parametros.get("id")
                this.tarjetas = datos.events
                this.tarjetasFiltradas =this.tarjetas.find(cards => cards._id == id);
            } )
            .catch( )   
    },

} ).mount("#app")
