class Json2Csv {

    _delimiter = '\n';
    _columnDelimiter = ';'

    _map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };

    removerAcentos(s) {

        return s.replace(/[\W\[\] ]/g, (a) => { return this._map[a] || a })
    };

    generateJson(config, data) {

        if (!data)
            throw new Error("Data is invalid!");



        let columnsName = config.columns.map(c => c.title);

        console.log("Colunas titulo", columnsName);

        let content = '';
        content += columnsName.join(this._columnDelimiter) + this._delimiter;

        content += data.map(e => {
            let record = [];

            for (let obj of config.columns) {

                let value =  obj.name.split(".");

                
                if(value.length == 1){
                    record.push(e[obj.name]);
                }else{
                    record.push(eval('e[value[0]][value[1]]'));
                }

            }
            return record.join(this._columnDelimiter);
        }).join(this._delimiter);

       

        return this.removerAcentos(content);



    }
    downloadtoCsv(config) {

        return new Promise((resolve, reject) => {
            try {

              


                let csv = this.generateJson(config, config.data);

                csv = 'data:text/csv;charset=utf-8,' + csv;

                let data = (csv);
                



                var aTag = window.document.getElementById('downLink');
                aTag.setAttribute('href', data);
                aTag.setAttribute('download', 'relatorio_Performance.csv');
                aTag.click();

            } catch (error) {
                reject(error);
            }
            resolve();
        });
    }

}

const instance = new Json2Csv();
export default instance;