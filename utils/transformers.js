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
