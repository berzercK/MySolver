var parameters = {};
var ajaxRequest;
var table;

var firstExist = false;
var secondExist = false;
var thirdExist = false;

function init() { table = new Table(document.getElementById("Table"))}

function checkInputA() {
    parameters.a = document.input.a.value;

    if (!isNaN(parseFloat(parameters.a)) && isFinite(parameters.a)) {
        document.input.a.setAttribute("style", "background-color: transparent;");
        firstExist = true;
    } else {
        document.input.a.setAttribute("style", "background-color: red;");
        firstExist = false;
    }

    enableButton();
}

function checkInputB() {
    parameters.b = document.input.b.value;

    if (!isNaN(parseFloat(parameters.b)) && isFinite(parameters.b)) {
        document.input.b.setAttribute("style", "background-color: transparent;");
        secondExist = true;
    } else {
        document.input.b.setAttribute("style", "background-color: red;");
        secondExist = false;
    }

    enableButton();
}

function checkInputC() {
    parameters.c = document.input.c.value;

    if (!isNaN(parseFloat(parameters.c)) && isFinite(parameters.c)) {
        document.input.c.setAttribute("style", "background-color: transparent;");
        thirdExist = true;
    } else {
        document.input.c.setAttribute("style", "background-color: red;");
        thirdExist = false;
    }

    enableButton();
}

function enableButton() { document.input.bConfirm.disabled = !(firstExist && secondExist && thirdExist); }

function Table(tablereferens) {
    this.tableref = tablereferens;
    this.rows = [];

    this.addRow = function (newRow) {
        this.rows.push(newRow);
    }
}

function printTable() {
    printRow(table.rows[table.rows.length - 1]);
}

function Row(x1, x2) {
    this.a = parameters.a;
    this.b = parameters.b;
    this.c = parameters.c;
    this.x1 = x1;
    this.x2 = x2;
}

function printRow(item) {
    var row = table.tableref.insertRow(table.tableref.rows.length);

    row.onclick = function () {
        row.parentNode.removeChild(row);
    };

    addCell(row.insertCell(0), item.a);
    addCell(row.insertCell(1), item.b);
    addCell(row.insertCell(2), item.c);
    addCell(row.insertCell(3), item.x1);
    addCell(row.insertCell(4), item.x2);
}

function addCell(cell, text) {
    var content = document.createTextNode(text);
    cell.appendChild(content);
}

function addSolution(x1, x2) {
    table.addRow(new Row(x1, x2));
    printTable(table);
}

function ajaxFunction() {
    try { ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        try { ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try { jaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("You browser broke!");
                return false;
            }
        }
    }

    ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState === 4) {
            if (ajaxRequest.status === 200) {
                var json = JSON.parse(ajaxRequest.responseText);
                if (json.d >= 0) {
                    if (parameters.a !== 0 && parameters.c !== 0) {
                        addSolution(json.x1, json.x2);
                    } else { alert(" Деление на 0 запрещено! ")}
                } else { alert(" Нет действительных корней! Дискриминант = " + json.d + "!")}
            } else { alert("WARNING: " + ajaxRequest.status); }
        }
    };

    ajaxRequest.open('GET', "CalculatorServlet" + reqURL(), true);
    ajaxRequest.send(null);
}

function reqURL() { return "?a=" + parameters.a + "&b=" + parameters.b + "&c=" + parameters.c; }
