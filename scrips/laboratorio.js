//http://127.0.0.1:5500/laboratorio.html?lab=HEMOGRAMA%20AUTOMATIZADO&area=HEMATOLOGIA
function sendMensaje(data) {
    console.log(data);
    console.log('Valor de mensaje:', data.mensaje);
    console.log('Valor de idinput:', data.idinput);
    const numero = document.getElementById(data.idinput).value;
    const numeroCompleto = `591${numero}`;
    const numeroSinEspacios = numeroCompleto.replace(/\s/g, '');
    const url = `https://api.whatsapp.com/send?phone=${numeroSinEspacios}&text=${encodeURIComponent(mensaje)}`;
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
                const mensaje = `Prueba de laboratorio: ${item.prueba_laboratorio}.. aboratorio: ${item.area}.. Condiciones del paciente: ${item.Condiciones_paciente}.. Dias: ${item.dias}.. Precio: ${item.precio}..Muestra: ${item.muestra}`;
                const idInput = `number-id-wha${index}`;
                const data= {
                    mensaje: mensaje,
                    idInput: idInput
                }
                // data to string
                const dataString = JSON.stringify(data);
                return `
                <div class="card-lab">
                <div class="card-lab-header">
                  <!-- alinear los elementos del div en columna -->
                  <div class="d-flex flex-column">
                    <h6 class="card-lab-title">${item.prueba_laboratorio}</h6>
                    <h7 class="card-lab-title">${item.area}</h7>
                  </div>
                  <div>
                    <button class="btn btn-primary card-lab-btn" id="btn-1">Ver mas</button>
                    <button type="button" class="btn btn-primary card-lab-btn" data-bs-toggle="modal" data-bs-target="#exampleModalA${index}">
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
                <!-- Modal -->
                <div class="modal fade" id="exampleModalA${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Introduzca su numero</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <input id="${idInput}" type="text" class="form-control rounded-9" placeholder="Numero">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            OnClick="sendMensaje('${dataString}')"
                        >
                            enviar mensaje
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
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
            return `
            <div class="card-lab">
            <div class="card-lab-header">
              <!-- alinear los elementos del div en columna -->
              <div class="d-flex flex-column">
                <h6 class="card-lab-title">${item.prueba_laboratorio}</h6>
                <h7 class="card-lab-title">${item.area}</h7>
              </div>
              <div>
                <button class="btn btn-primary card-lab-btn" id="btn-1">Ver mas</button>
                <button class="btn btn-primary card-lab-btn" id="btn-1">Enviar a whatsapp</button>
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