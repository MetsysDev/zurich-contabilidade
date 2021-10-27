class ExportationReport {
    static pdf(valueHtml, data) {
        let fileName = ExportationReport.__generateFileName(data);
        let opt = {
            margin:       [1, 1.5],
            filename:     `${fileName}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(valueHtml).save();
    }

    static visualization(valueHtml) {
        $('#view-card').empty();
        $('#view-card').append(valueHtml);
    }

    static __generateFileName(data) {
        let keyFileName = false;
        let fileName = 'zurich_contabil';

        if (data && typeof(data) === 'object') {
            if (data.hasOwnProperty('cliente')) {
                keyFileName = 'cliente';
            }

            if (data.hasOwnProperty('CLIENTE')) {
                keyFileName = 'CLIENTE';
            }

            if (data.hasOwnProperty('clientes')) {
                keyFileName = 'clientes';
            }

            if (data.hasOwnProperty('CLIENTES')) {
                keyFileName = 'CLIENTES';
            }

            if (keyFileName) {
                fileName = data[keyFileName];
            }
        }

        fileName = fileName.replaceAll(' ', '_');
        return fileName;
    }
}