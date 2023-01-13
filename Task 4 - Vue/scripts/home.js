
const { createApp } = Vue

createApp({
    data(){
    return {
        eventsInformation: undefined,
        checkBoxesCategories : undefined, 
        arrayEvents : [],
        keyWordSearch : [],
        checked: [],
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing') //Fetch hace un pedido a esa URL y regresa promesas, bien o mal, pero las regresa. 
            .then( information => information.json ()) //este metodo devuelve otra promesa que debo manejarlo con otra promesa
            .then( data =>{
                // aca voy a querer solo las categorias. 
                // por esa razon filtro, en caso de que un evento no tenga categoria, no se va a mostrar. 
                this.eventsInformation = data.events 
                this.arrayEvents = [...this.eventsInformation]
                this.checkBoxes = this.checkBoxes (this.arrayEvents) //invoco la funcion como argumentos le paso el array

                
            })
            .catch(err => console.log(err) )
    },
methods:{
    checkBoxes : function (informationArray){
        return this.checkBoxesCategories = new Set (informationArray.map(event => event.category))
    },
    filtroCruzado : function () {
        let filtroPorBusqueda = this.eventsInformation.filter(event => event.name.toLowerCase().includes (this.keyWordSearch.toLowerCase()))
        if (this.checked.length === 0){
            this.arrayEvents = filtroPorBusqueda
        }
        else{
            let filtroPorCheck = filtroPorBusqueda.filter(event => this.checked.includes(event.category))
            this.arrayEvents = filtroPorCheck
        }
    }
}               
}).mount('#app')