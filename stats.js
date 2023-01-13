const { createApp } = Vue
createApp( {
    data(){
        return {
            asistencia : [],
            futuro: [],
            pasados: [],
        }
    },
    created(){
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then( respuesta => respuesta.json() )
            .then( datos => {
                this.asistencias(datos)
                this.eventosfut(datos.events.filter(e=>e.date>=datos.currentDate))
                this.eventospas(datos.events.filter(e=>e.date<datos.currentDate))
            } )
            .catch( )   
    },
    methods: {
        asistencias:function (data){
                    let aux=0;
                    let event_may="";
                    let aux2=0;
                    let aux3=100;
                    let event_men="";
                    let cap=0;
                    let cap_may="";
                    for(let lis of data.events){
                        if(lis.capacity>cap){
                            cap=lis.capacity;
                            cap_may=lis.name;
                        }
                        if(data.currentDate>lis.date){
                            aux2=parseFloat((lis.assistance*100)/lis.capacity);
                            if(aux2>aux){
                                aux=aux2.toFixed(2);
                                event_may=lis.name;
                            }
                            if(aux2<aux3){
                                aux3=aux2.toFixed(2);
                                event_men=lis.name;
                            }
                        }
                    }
                    this.asistencia=[event_may,aux,event_men,aux3,cap_may,cap]
                },
        eventosfut:function(array){
                let categorias=[];
                array.filter(e=>{
                    if(!categorias.includes(e.category)){
                        categorias.push(e.category)
                    }
                })
                for(upcom of categorias){
                    let ingresos=0;
                    let estimado=0;
                    let acumulador=0
                    let array_fil=array.filter(e=>(e.category.includes(upcom)))
                    array_fil.forEach(element => {
                        ingresos+=element.price*element.estimate
                        estimado+=(element.estimate/element.capacity)*100
                        acumulador++
                    });
                    let resultado=(estimado/acumulador).toFixed(2)
                    this.futuro.push([upcom,ingresos,resultado])
                }
            },
            eventospas:function(array){
                let categorias=[];
                array.filter(e=>{
                    if(!categorias.includes(e.category)){
                        categorias.push(e.category)
                    }
                })
                for(past of categorias){
                    let ingresos=0;
                    let estimado=0;
                    let acumulador=0
                    let array_fil=array.filter(e=>(e.category.includes(past)))
                    array_fil.forEach(element => {
                        ingresos+=element.price*element.assistance
                        estimado+=(element.assistance/element.capacity)*100
                        acumulador++
                    });
                    let resultado=(estimado/acumulador).toFixed(2)
                    this.pasados.push([past,ingresos,resultado])
                }
            }
    },

} ).mount("#app")