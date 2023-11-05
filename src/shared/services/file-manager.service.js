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
}
