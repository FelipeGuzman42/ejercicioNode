const axios = require('axios').default;
const fs = require('fs');
const http = require('http');

const proveedor = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const cliente = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

http.createServer((req, res) => 
{
    if (req.url === "/api/proveedores")
    {
        axios.get(proveedor)
        .then(function (response) {
            fs.readFile("index.html", (err, data) =>
            {
                if(err)
                    throw err;
                let prov = JSON.parse(JSON.stringify(response.data));
                let provs = "";
                for (let i = 0; i < prov.length; i++)
                    provs += escribirFila(prov[i].idproveedor, prov[i].nombrecompania, prov[i].nombrecontacto);
                provs = crearHTML(provs, "proveedores");
                data += provs;
                res.end(data);
            });
        });
    }
    if (req.url === "/api/clientes")
    {
        axios.get(cliente)
        .then(function (response) {
            fs.readFile("index.html", (err, data) =>
            {
                if(err)
                    throw err;
                let cli = JSON.parse(JSON.stringify(response.data));
                let clis = "";
                for (let i = 0; i < cli.length; i++)
                    clis += escribirFila(cli[i].idCliente, cli[i].NombreCompania, cli[i].NombreContacto);
                clis = crearHTML(clis, "clientes");
                data += clis;
                res.end(data);
            });
        });
    }
}).listen(8081);

let escribirFila = (id, compania, contacto) =>
`
<tr>
  <th scope="row">${id}</th>
  <td>${compania}</td>
  <td>${contacto}</td>
</tr>
`;

let crearHTML = (tabla, tipo) =>
`
    <h1 style="text-align:center">Listado de ${tipo}</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Compania</th>
            <th>Contacto</th>
        </tr>
    </thead>
    <tbody>
    ${tabla}
    </tbody>
    </table>
    </body>
    </html>
`;