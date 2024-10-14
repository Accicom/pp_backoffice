

// Llama a checkAuthentication al cargar la página
document.addEventListener('DOMContentLoaded', checkAuthentication);


function showModule(module) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpiar contenido previo

    switch(module) {
        case 'cargaBD':
            mainContent.innerHTML = `
                <h2>Carga de Base de Datos</h2>
                <div class="dropdown">
                    <select id="seccionesCarga" onchange="showSection('cargaBD', this.value)">
                        <option value="">Seleccione una sección...</option>
                        <option value="leads">Leads</option>
                        <option value="cendeu">CENDEU</option>
                        <option value="descartes">Descartes</option>
                        <option value="miniPadron">Mini Padrón</option>
                    </select>
                </div>
                <div id="cargaBDContent"></div>
            `;
            break;

        case 'ruc':
            mainContent.innerHTML = `
                <h2>RUC</h2>
                <p>Última RUC Vigente: #12536</p>
                <table class="table">
                    <thead>
                        <tr><th>LEADS</th><th>PERIODO</th><th>CENDEU</th><th>PERIODO</th><th>RUC GENERADA</th></tr>
                    </thead>
                    <tbody id="rucTable">
                        <tr><td>leads_junio.csv</td><td>Junio 2023</td><td>cendeu_junio.csv</td><td>Junio 2023</td><td>RUC001</td></tr>
                        <tr><td>leads_julio.csv</td><td>Julio 2023</td><td>cendeu_julio.csv</td><td>Julio 2023</td><td>RUC002</td></tr>
                    </tbody>
                </table>
            `;
            break;

        case 'parametros':
            mainContent.innerHTML = `
                <h2>Parámetros</h2>
                <div class="dropdown">
                    <select id="seccionesParametros" onchange="showSection('parametros', this.value)">
                        <option value="">Seleccione una sección...</option>
                        <option value="limites">Límites</option>
                        <option value="tasas">Tasas</option>
                        <option value="segmentos">Segmentos</option>
                        <option value="filtros">Filtros Explicación</option>
                        <option value="leads">Leads</option>
                        <option value="cendeu">CENDEU</option>
                    </select>
                </div>
                <div id="parametrosContent"></div>
            `;
            break;

        case 'aplicaciones':
            mainContent.innerHTML = `
                <h2>Aplicaciones</h2>
                <table class="table">
                    <thead>
                        <tr><th>CLIENTE</th><th>CUIT</th><th>RESULT</th><th>RISK</th><th>CON PRÉSTAMO</th><th>FECHA DE APLICACIÓN</th><th>MORA</th></tr>
                    </thead>
                    <tbody id="applicationsTable">
                        <tr><td>Juan Pérez</td><td>20-12345678-9</td><td>Aprobado</td><td>2</td><td>Sí</td><td>01/10/2023</td><td>No</td></tr>
                        <tr><td>María García</td><td>20-98765432-1</td><td>Pendiente</td><td>3</td><td>No</td><td>02/10/2023</td><td>Sí</td></tr>
                    </tbody>
                </table>
            `;
            break;
    }
}

function showSection(module, section) {
    const content = document.getElementById(`${module}Content`);
    content.innerHTML = ''; // Limpiar contenido previo

    if (module === 'cargaBD') {
        switch (section) {
            case 'leads':
                content.innerHTML = `
                    <h3>Leads</h3>
                    <input type="file" id="leadsFile" />
                    <input type="text" placeholder="Ingrese periodo" id="leadsPeriod" />
                    <button onclick="uploadLeads()">Cargar</button>
                    <table class="table">
                        <thead>
                            <tr><th>Archivo</th><th>Periodo</th></tr>
                        </thead>
                        <tbody id="leadsHistory">
                            <tr><td>leads_junio.csv</td><td>Junio 2023</td></tr>
                            <tr><td>leads_julio.csv</td><td>Julio 2023</td></tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'cendeu':
                content.innerHTML = `
                    <h3>CENDEU</h3>
                    <input type="file" id="cendeuFile" />
                    <input type="text" placeholder="Ingrese periodo" id="cendeuPeriod" />
                    <button onclick="uploadCendeu()">Cargar</button>
                    <table class="table">
                        <thead>
                            <tr><th>Archivo</th><th>Periodo</th></tr>
                        </thead>
                        <tbody id="cendeuHistory">
                            <tr><td>cendeu_junio.csv</td><td>Junio 2023</td></tr>
                            <tr><td>cendeu_julio.csv</td><td>Julio 2023</td></tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'descartes':
                content.innerHTML = `
                    <h3>Descartes</h3>
                    <input type="file" id="descartesFile" />
                    <input type="text" placeholder="Ingrese periodo" id="descartesPeriod" />
                    <button onclick="uploadDescartes()">Cargar</button>
                    <table class="table">
                        <thead>
                            <tr><th>Archivo</th><th>Periodo</th></tr>
                        </thead>
                        <tbody id="descartesHistory">
                            <tr><td>descartes_junio.csv</td><td>Junio 2023</td></tr>
                            <tr><td>descartes_julio.csv</td><td>Julio 2023</td></tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'miniPadron':
                content.innerHTML = `
                    <h3>Mini Padrón</h3>
                    <input type="file" id="miniPadronFile" />
                    <input type="text" placeholder="Ingrese periodo" id="miniPadronPeriod" />
                    <button onclick="uploadMiniPadron()">Cargar</button>
                    <table class="table">
                        <thead>
                            <tr><th>Archivo</th><th>Periodo</th></tr>
                        </thead>
                        <tbody id="miniPadronHistory">
                            <tr><td>mini_padron_junio.csv</td><td>Junio 2023</td></tr>
                            <tr><td>mini_padron_julio.csv</td><td>Julio 2023</td></tr>
                        </tbody>
                    </table>
                `;
                break;
        }
    } else if (module === 'parametros') {
        switch (section) {
            case 'limites':
                content.innerHTML = `
                    <h3>Límites</h3>
                    <p>Mínimo: <input type="text" placeholder="Ej: 1000"></p>
                    <p>Máximo: <input type="text" placeholder="Ej: 50000"></p>
                `;
                break;

            case 'tasas':
                content.innerHTML = `
                    <h3>Tasas</h3>
                    <p>TNA: <input type="text" placeholder="Ej: 15%"></p>
                    <p>TEA: <input type="text" placeholder="Ej: 16%"></p>
                    <p>CFTEA: <input type="text" placeholder="Ej: 14%"></p>
                `;
                break;

            case 'segmentos':
                content.innerHTML = `
                    <h3>Segmentos</h3>
                    <p><input type="checkbox"> Jubilados</p>
                    <p><input type="checkbox"> Privados</p>
                    <p><input type="checkbox"> Pensionados</p>
                    <p><input type="checkbox"> Autónomos</p>
                `;
                break;

            case 'filtros':
                content.innerHTML = `
                    <h3>Filtros Explicación</h3>
                    <p><input type="text" placeholder="Colocar parámetros"></p>
                `;
                break;

            case 'leads':
                content.innerHTML = `
                    <h3>Leads</h3>
                    <p><input type="text" placeholder="Colocar parámetros"></p>
                `;
                break;

            case 'cendeu':
                content.innerHTML = `
                    <h3>CENDEU</h3>
                    <p><input type="text" placeholder="Colocar parámetros"></p>
                `;
                break;
        }
    }
}

function uploadLeads() {
    alert("Archivo de Leads cargado (simulación).");
}

function logout() {
    // Simulación de cierre de sesión
    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
}


// Puedes agregar funciones similares para cargar otros archivos
