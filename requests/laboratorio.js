
function getLaboratoryRequests(callback) {
    const options = {method: 'GET'};

    return fetch('https://api.laboratoriogenesis.com.bo/apis/laboratorio.php', options)
    .then(response => response.json())
    .then(response => {
        callback(response);
    })
    .catch(err => console.error(err));
}

function addLaboratorio(prueba_laboratorio, Condiciones_paciente, area, dias, precio, muestra) {
    const data = {
        prueba_laboratorio: prueba_laboratorio,
        Condiciones_paciente: Condiciones_paciente,
        area: area,
        dias: dias,
        precio: precio,
        muestra: muestra
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
        //body: '{"prueba_laboratorio":"TIEMPO DE CUAGULACION","Condiciones_paciente":"Ayuno de 8 hs","area":"COAGULOGRAMA","dias":"En el dia","precio":"25","muestra":"Sangre entera"}'
    };
      
    fetch('https://api.laboratoriogenesis.com.bo/apis/laboratorio.php', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
