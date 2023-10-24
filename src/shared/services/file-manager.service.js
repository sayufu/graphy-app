import Papa from "papaparse";

export class FileManagerService {
    constructor() {
        this.csvData = [];
    }

    async readCsvFile(csvFilePath) {
        try {
            const response = await fetch(csvFilePath);
            const text = await response.text();

            return new Promise((resolve, reject) => {
                Papa.parse(text, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        this.csvData = result.data;
                        resolve(this.csvData);
                    },
                    error: (error) => {
                        reject(new Error('CSV parsing error: ' + error));
                    },
                });
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async writeTxtFile(data, txtFilePath) {
        try {
            const fileWriter = new FileWriter();
            fileWriter.createNewFile(txtFilePath);

            const txtData = data.join('\n');

            fileWriter.write(txtData);

            fileWriter.close();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async readTxtFile(txtFilePath) {
        try {
            const fileReader = new FileReader();
            fileReader.readAsText(new File([txtFilePath]));

            const txtData = await fileReader.readAsText();

            const arrayData = txtData.split('\n').slice(0, x);

            return arrayData;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
