export function transformTableDataToSeries(tableData) {

    // Converte as linhas para objetos de série
    const series = tableData?.map(row => {

        // Verifica se a chave 'peso_(kg)' existe no objeto row
        const hasPesoKg = row.hasOwnProperty("peso_(kg)");

        const columnValues = {
            type: row["tipo"]?.toUpperCase() || "NORMAL",
            weight: hasPesoKg ? row["peso_(kg)"] : (row["peso_acrescido_(kg)"] * -1),
            repetitions: row["repetições"],
            time: row["duração_(segundos)"],
            distance: row["distância_(m)"],
        };

        return {
            type: columnValues['type'].toUpperCase() || "NORMAL", // Padrão NORMAL
            last: "", // Valor padrão
            weight: parseFloat(columnValues['weight']) || -1, // Converte para número, padrão 0
            repetitions: parseInt(columnValues['repetitions']) || -1, // Converte para inteiro, padrão 0
            time: parseInt(columnValues['time']) || -1, // Converte para inteiro, padrão 0
            distance: parseInt(columnValues['distance']) || -1,
        };
    });

    return series;
}


export function transformSeriesToTableData(series) {

    if (series == undefined) {
        return []
    }
    // Verifica se a entrada é válida
    if (!Array.isArray(series)) {
        throw new Error("Dados inválidos: a entrada deve ser um array de objetos de série.");
    }

    // Define as colunas do tableData
    var columns = [
        "Tipo",
    ];

    // Converte os objetos de série para as linhas do tableData
    const rows = series.map(item => {
        const dictValueColumns = {};

        dictValueColumns["tipo"] = item.type || "NORMAL"; // Adiciona tipo com padrão "Normal"

        if (item.peso_kg) {
            dictValueColumns["peso_(kg)"] = String(item.peso_kg);
        } else if (item.weight) {
            dictValueColumns["peso_(kg)"] = String(item.weight);
        }

        if (item.repetições) {
            dictValueColumns["repetições"] = String(item.repetições);
        } else if (item.repetitions) {
            dictValueColumns["repetições"] = String(item.repetitions);
        }

        return dictValueColumns
    });

    var tableResponse = {
        columns,
        rows
    };

    return rows ;
}