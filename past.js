const { createApp } = Vue
createApp( {
    data(){
        return {
            tarjetas : [],
            categorias : [],
            valorDeBusqueda: "",
            checked: [],
            tarjetasFiltradas : [],
            sin_datos:"looding"
        }
    },
    created(){
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then( respuesta => respuesta.json() )
            .then( datos => {
                this.tarjetas = datos.events.filter(e=>e.date<datos.currentDate)
                this.tarjetasFiltradas = this.tarjetas
                this.categorias = [ ...new Set( this.tarjetas.map( tar => tar.category ) ) ]
            } )
            .catch( )   
    },
    methods: {
    filtroCruzado: function(){
            let filtradoPorBusqueda = this.tarjetas.filter( eventos => eventos.name.toLowerCase().includes( this.valorDeBusqueda.toLowerCase()))
            if( this.checked.length === 0 ){
                this.tarjetasFiltradas = filtradoPorBusqueda
            }else{
                let filtradosPorCheck = filtradoPorBusqueda.filter( eventos => this.checked.includes( eventos.category ))
                this.tarjetasFiltradas = filtradosPorCheck 
            }
        } 
    },

} ).mount("#app")

