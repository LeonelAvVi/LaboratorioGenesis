function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

//http://127.0.0.1:5500/laboratorio.html?lab=HEMOGRAMA%20AUTOMATIZADO&area=HEMATOLOGIA
function sendMensaje(data) {
    console.log(data);
    console.log('Valor de mensaje:', data.mensaje);
    console.log('Valor de idinput:', data.idinput);
    const numero = document.getElementById(data.idinput).value;
    const numeroCompleto = `591${numero}`;
    const numeroSinEspacios = numeroCompleto.replace(/\s/g, '');
    const url = `https://api.whatsapp.com/send?phone=${numeroSinEspacios}&text=hola`;
    window.open(url, '_blank');
}
function sendWhatsapp(messaje){
    const numero = document.getElementById('number-id-wha').value;
    
    const numeroCompleto = `591${numero}`;
    const numeroSinEspacios = numeroCompleto.replace(/\s/g, '');

    // mi mensaje tiene espaciosytildes como lo conviertoa url
    const mensajeSinEspacios = messaje.replace(/\s/g, '%20');
    const mensajeSinTildes = mensajeSinEspacios.replace(/á/g, '%C3%A1');
    const mensajeSinTildes1 = mensajeSinTildes.replace(/é/g, '%C3%A9');
    const mensajeSinTildes2 = mensajeSinTildes1.replace(/í/g, '%C3%AD');
    const mensajeSinTildes3 = mensajeSinTildes2.replace(/ó/g, '%C3%B3');
    const mensajeSinTildes4 = mensajeSinTildes3.replace(/ú/g, '%C3%BA');
    const mensajeSinTildes5 = mensajeSinTildes4.replace(/ñ/g, '%C3%B1');
    // const mensajeSinTildes6 = mensajeSinTildes5.replace(/./g, '%2E');
    const mensajeSinTildes7 = mensajeSinTildes5.replace(/,/g, '%2C');
    const mensajeSinTildes8 = mensajeSinTildes7.replace(/:/g, '%3A');
    const mensajeSinTildes9 = mensajeSinTildes8.replace(/;/g, '%3B');
    const mensajeSinTildes10 = mensajeSinTildes9.replace(/◉/g, '%E2%97%89');
    //codigo ascii de la salto de linea %0A

    const url = `https://api.whatsapp.com/send?phone=${numeroSinEspacios}&text=${mensajeSinTildes10}`;
    window.open(url, '_blank');

}

function getParamsFromHash() {
    var hashString = window.location.hash;
    console.log('Valor de hashString:', hashString);
    var params = new URLSearchParams(hashString.substring(1));
    console.log('Valor de params:', params);
    var param1 = params.get('lab');
    var param2 = params.get('area');
    console.log('Valor de param1  ss:', param1);
    console.log('Valor de param2:', param2);
    const dataParams = {
        lab: param1,
        area: param2
    };
    return dataParams;
}
const loadModal = (title, mensaje) =>{
    const titleModal = document.getElementById('exampleModalLabel');
    titleModal.innerHTML = title;
    const divButtonSend = document.getElementById('button-send');
    divButtonSend.innerHTML ='';
    divButtonSend.innerHTML = `<button type="button" class="btn btn-primary"
    onclick="sendWhatsapp('${mensaje}')"
  >Enviar a Whatsapp</button>`;
}
function searchFromData(data){
    const searchLab = document.getElementById('search-lab');
    
    const searchResultList = document.getElementById('cards-from-labs');
/*
    searchLab.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredData = data.filter((item) => {
            return (
                item.prueba_laboratorio.toLowerCase().includes(searchString) ||
                item.area.toLowerCase().includes(searchString)
            );
        });
        displayData(filteredData);
    }
    );*/


    const displayData = (data) => {
        const htmlString = data
            .map((item, index) => {
                const mensaje = `*LABORATORIO GENESIS* %0A Indicaciones al Paciente %0A ⮞ *Prueba de laboratorio:* ${item.prueba_laboratorio}%0A ⮞ *Tipo de laboratorio:* ${item.area}%0A ⮞ *Condiciones del paciente:* ${item.Condiciones_paciente}%0A ⮞ *Días:* ${item.dias}%0A ⮞ *Precio Bs:* ${item.precio}%0A ⮞ *Muestra:* ${item.muestra}`;
                return `
                <div class="card-lab">
                    <div class="card-lab-header">
                        <!-- alinear los elementos del div en columna -->
                        <div class="d-flex flex-column">
                            <h6 class="card-lab-title">${item.prueba_laboratorio}</h6>
                            <h7 class="card-lab-title">${item.area}</h7>
                        </div>
                        <div>
                            <button 
                                type="button" 
                                class="btn btn-primary card-lab-btn" 
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onclick="loadModal('${item.prueba_laboratorio}','${mensaje}')"
                            >
                            Enviar a whatsapp
                            </button>
                        </div>
                    </div>
                    <p class="card-lab-body">
                        Las condiciones del paciente son: ${item.Condiciones_paciente} <br/>
                        ${item.dias}<br/>
                        El precio es: ${item.precio} <br/>
                        Muestra: ${item.muestra} 
                    </p>                                
                </div>
            `;
            })
            .join('');
        searchResultList.innerHTML = htmlString;
    }



    


    const searchString = searchLab.value.toLowerCase();
    if (searchString === '') {
        displayData(data);
        return;
    }
    const filteredData = data.filter((item) => {
        return (
            item.prueba_laboratorio.toLowerCase().includes(searchString) ||
            item.area.toLowerCase().includes(searchString)
        );
    });
    displayData(filteredData);

}

function loadData(data, area){
    // id:cards-from-labs
    let filtereddata;
    if (area) {
        filtereddata = data.filter((item) => {
            return (
                // return el valor con la area exacta
                item.area.toLowerCase() === area.toLowerCase()
                //item.area.toLowerCase().includes(area.toLowerCase())
            );
        });
    }
    else {
        filtereddata = data;
    }

    const cardsFromLabs = document.getElementById('cards-from-labs');
    const htmlString = filtereddata
        .map((item) => {
            const mensaje = `*LABORATORIO GENESIS* %0A Indicaciones al Paciente %0A ⮞ *Prueba de laboratorio:* ${item.prueba_laboratorio}%0A ⮞ *Tipo de laboratorio:* ${item.area}%0A ⮞ *Condiciones del paciente:* ${item.Condiciones_paciente}%0A ⮞ *Días:* ${item.dias}%0A ⮞ *Precio Bs:* ${item.precio}%0A ⮞ *Muestra:* ${item.muestra}`;
            return `
            <div class="card-lab">
            <div class="card-lab-header">
              <!-- alinear los elementos del div en columna -->
              <div class="d-flex flex-column">
                <h6 class="card-lab-title">${item.prueba_laboratorio}</h6>
                <h7 class="card-lab-title">${item.area}</h7>
              </div>
              <div>
                <button 
                    type="button" 
                    class="btn btn-primary card-lab-btn" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="loadModal('${item.prueba_laboratorio}','${mensaje}')"
                >
                Enviar a whatsapp
                </button>
              </div>
            </div>
            <p class="card-lab-body">
                Las condiciones del paciente son: ${item.Condiciones_paciente} <br/>
                ${item.dias}<br/>
                El precio es: ${item.precio} <br/>
                Muestra: ${item.muestra} 
            </p>
            
          </div>
        `;
        })
        .join('');
    cardsFromLabs.innerHTML = htmlString;
}

function loadAreas(data){
    const areassinRepetirMasCantidadRepetidos = data.map((item) => item.area).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    const areassinRepetirMasCantidad = [...areassinRepetirMasCantidadRepetidos].map(([area, cantidad]) => ({ area, cantidad }));

    console.log(areassinRepetirMasCantidad);
    
    const areasList = document.getElementById('areas-list');
    
    //render areas in div
    const htmlString = areassinRepetirMasCantidad
        .map((item) => {
            return `
            <a
                href="/laboratorio.html#area=${item.area}"
                class="specialist-tag"
                
                >
                ${item.area}
              <span class="badge bg-primary rounded-pill">${item.cantidad}</span>
            </a>
        `;
        }
        )
        .join('');
    areasList.innerHTML = htmlString;
    
    // id: list-btn-areas
    const listBtnAreas = document.getElementById('list-btn-areas');
    // render areas in div list-btn-areas max 3 elements
    const htmlStringListBtnAreas = areassinRepetirMasCantidad
        .map((item, index) => {
            if(index<5){
                return `
                <a 
                    href="/laboratorio.html#area=${item.area}"
                    class="btn btn-primary btn-specialist-round" id="btn-1">${item.area}
                </a>
            `;;
            }
        }
        )
        .join('');
    listBtnAreas.innerHTML = htmlStringListBtnAreas;
    
}