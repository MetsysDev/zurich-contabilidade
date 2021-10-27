class CardTemplate {
    mount(data) {
        let style = this.getStyle();
        let dataCard = this.mountDataCard(data);
        let emitionDate = new Date().toLocaleDateString('pt');

        return `
            ${style}
            <div class="template-container">
                <div class="template-header">
                    <img src="logo_zurich.jpg" alt="logo-zurich-contabil">
                    <h1>Balanço Fiscal</h1>
                </div>
                <div class="template-body">
                    <div class="grid-template-areas-company">
                        ${dataCard.company}
                        <span class="emission-date">EMITIDO EM:  ${emitionDate}</span>
                    </div>
                    <div class="grid-template-areas-business">
                        ${dataCard.business}
                    </div>
                </div>

            </div>
        `;
    }

    mountDataCard(data) {
        let spansCompany = [];
        let spansBusiness = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key.indexOf('EMPTY') != -1) {
                    continue;
                }

                if (this.isTypeCompany(key)) {
                    let value = !this.isClient(key)? `${key}: ${data[key]}`: data[key];
                    
                    spansCompany.push(`<span class="description-company ${key.toLocaleLowerCase()}">${value}</span>`);
                    continue;
                }

                if (this.checkAddKey(key)) {
                    let value = data[key];
                    spansBusiness.push(`<span>${key}: </span><span class='${this.applyClassValue(value)}'>${value}</span>`);
                }

            }
        }

        let spans = {
            'company': spansCompany.join(''),
            'business': spansBusiness.join(''),
        };

        return spans;
    }

    checkAddKey(key) {
        return key != 0 && key != 'COD';
    }

    isClient(key) {
        key = key.toLocaleLowerCase();
        return key == 'clientes' || key == 'cliente';
    }

    isTypeCompany(key) {
        let typesCompany = ['cnpj', 'clientes', 'cliente'];

        return typesCompany.includes(key.toLocaleLowerCase());
    }

    applyClassValue(value) {
        if (this.isNumeric(value)) {
            if (value < 0) {
                return 'text-danger'
            }
        }

        return 'text-dark';
    }

    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    getStyle() {
        return `
        <style>
            :root {
                --danger-color: #f44336;
                --border-width-template: 5px;
                --border-color-template:#005e66;
            }

            .template-container {
                margin: 5px;
                width: fit-content;
                height: auto;
                min-height: 550px;
                border: solid var(--border-width-template) var(--border-color-template);
            }

            .template-container .template-header img {
                /* width: 611px; */
                width: 469px;
                height: 157px;
            }

            .template-container .template-header {
                text-align: center;
                border-bottom: solid var(--border-width-template) var(--border-color-template);
            }

            .template-container 
            .template-body .grid-template-areas-company, .grid-template-areas-business {
                padding: 0 5px;
            }

            .template-container .template-body div {
                display: grid;
            }

            .template-container .template-body .description-company {
                grid-area: description-company;
            }

            .template-container .template-body .cnpj {
                grid-area: cnpj;
            }

            .template-container .template-body .emission-date {
                grid-area: emission-date;
            }

            .template-container .template-body .grid-template-areas-company {
                border-bottom: solid 5px #005e66;
                grid-template-areas:
                    "description-company description-company"
                    "cnpj emission-date"
                ;
            }

            .template-container .template-body .grid-template-areas-business {
                grid-template-columns: 1fr 1fr;
            }
        </style>
        `;
    }
}

// <!-- <div class="template-container">
//         <div class="template-header">
//             <img src="logo_zurich.jpg" alt="">
//             <h1>Balanço Fiscal</h1>
//         </div>
//         <div class="template-body">
//             <div class="grid-template-areas-company">
//                 <span class="description-company">JANAINE CRISTINE</span>
//                 <span class="cnpj">CNPJ: 32.453.642/0001-32</span>
//                 <span class="emission-date">EMITIDO EM:  23/09/2021</span>
//             </div>
//             <div class="grid-template-areas-bussiness">
//             </div>
//         </div>

//     </div> -->