import React from 'react';

function DinosolTable(props) {

    return (
        <table className="data-table">
            <thead>
                <tr>
                    { createHeaderRow(props.colconfig) } 
                </tr>
            </thead>
            <tbody>
                { renderDataRows(props.rowdata, props.colconfig) }
            </tbody>
        </table>
    );
}

function createHeaderRow(colConfig) {
    let headerJsx = [];
    colConfig.forEach(column => {
        headerJsx.push(<th>{column.columnName}</th>);
    });

    return headerJsx;
}

function renderDataRows(rowData, colConfig) {
    let tbodyJsx = [];

    rowData.forEach(row => {
        tbodyJsx.push(<tr className="dinosol-row">{ createRowJsx(row, colConfig) }</tr>);
    });

    return tbodyJsx;
}

function createRowJsx(row, colConfig) {
    let rowJsx = [];
    colConfig.forEach(column => {
        rowJsx.push(<td>{ row[column.fieldName] }</td>);
    });
    return rowJsx;
}

export default DinosolTable;