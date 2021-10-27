$(function (event) {
    let table = new Table();
    table.createFakeTable();

    $('#formFile').on('change', function (ev) {
        let chosenFile = this.files[0];

        if (chosenFile) {
            table.startLoad();
            readFile(chosenFile);
        }
    });

    $('#button-remove').on('click', function (ev) {
        let keyDefaultUniqueId = 'COD'
        let selections = table.getSelections();
        let ids = selections.map(selected => {
            if (
                selected && typeof(selected) == 'object'
                && selected.hasOwnProperty(keyDefaultUniqueId)
            ) {
                return selected[keyDefaultUniqueId];
            }

            return null;
        });

        table.removeData(ids, keyDefaultUniqueId);
    });

    $('#button-importar').on('click', function (ev) {
        $('#formFile').click();
        table.startLoad();
    });

    $('#button-exportar').on('click', function (ev) {
        let data = table.getSelections();
        if (!validArray(data)) {
            data = table.getAll();
        }

        if (!validArray(data)) {
            Mensagen.error('Adicione algum arquivo Excel!');
            return;
        }

        console.log(data);
        $('#view-card').empty();
        let card = new CardTemplate();
        data.forEach(data => {
            let cardMonted = card.mount(data);
            ExportationReport.pdf(cardMonted, data);
        });
    });

    function validArray(data) {
        return Array.isArray(data) && data.length;
    }

    function readFile(file) {
        let reader = new FileReader();
        reader.onload = (ev) => {
            let converted = parseXlsxToJson(ev.target.result);
            let data = converted[0];
            let columns = table.createColumns(data);
            table.createTable(columns, data);
            table.stopLoad();
        };

        reader.onerror = (error) => {
            console.error('falha ao importar:', error);
            Mensagen.error('Falha ao adicionar seu arquivo tente novamente por favor!');
        }

        reader.readAsBinaryString(file);
    }

    function parseXlsxToJson(data) {
        let sheetData = null;
        let dataConverted = [];
        let xlsxRead = XLSX.read(data, {type: 'binary'});
        let options = {
            raw: false,
            defval: '-'
        };

        xlsxRead.SheetNames.forEach(name => {
            let pageDoc = xlsxRead.Sheets[name];
            sheetData = XLSX.utils.sheet_to_row_object_array(pageDoc, options);
            if (sheetData.length) dataConverted.push(sheetData);
        });

        return dataConverted;
    }
});
