var presentMonth = parseFloat(new Date().getMonth() + 1);
var companyDate = [];
var numberPage = 0;
var onOff = 0;

//fetch from json
fetch('https://recruitment.hal.skygate.io/companies')
    .then(data => data.json()).then(resp => {
        resp.forEach(company => {
            let id = company.id;
            let name = company.name;
            let city = company.city;
            fetch('https://recruitment.hal.skygate.io/incomes/' + id).then(data => data.json()).then(response => {
                let income = Math.round(response.incomes.reduce((a, b) => a + parseFloat(b.value), 0) * 100) / 100;
                let average = Math.round((income / 49) * 100) / 100;
                let lastMonth = Math.round(response.incomes.map((id) => parseFloat(id.date.substring(5, 7)) === presentMonth ? id.value : 0).reduce((a, b) => {
                    return a + parseFloat(b);
                }, 0) * 100) / 100;
                companyDate.push({ id, name, city, income, average, lastMonth });
            });
        });
    });

setTimeout(function () {
    if (onOff === 0) { startSend(); onOff = 1; }
}, 500);

//sorting and paginate
function startSend() {
    $(function () {
        console.log(companyDate.length);
        $('#data th').on('click', function () {
            let attr = $(this).attr('data-attr');
            let asc = (!$(this).attr('data-asc'));

            $('#data th').each(function () {
                $(this).removeAttr('data-asc');
            });

            if (asc) {
                $(this).attr('data-asc', 'asc');
            }
            sortRes(attr, asc);
        });
        sendRes();
    });
}

function sortRes(prop, asc) {
    numberPage = 0;
    companyDate.sort(function (first, secend) {
        if (asc) {
            return (first[prop] > secend[prop]) ? 1 : ((first[prop] < secend[prop]) ? -1 : 0);
        } else {
            return (secend[prop] > first[prop]) ? 1 : ((secend[prop] < first[prop]) ? -1 : 0);
        }
    });
    sendRes();
}


//sending data to tabel
function sendRes() {
    let html = '';
    for (var i = numberPage * 10; i < ((numberPage + 1) * 10); i++) {
        var filteredData = objFilter(companyDate);
        if (i === filteredData.length) { break; }
        html += '<tr class="row">'
            + '<td class="cell" data-title="Id">' + filteredData[i].id + '</td>'
            + '<td class="cell" data-title="Name">' + filteredData[i].name + '</td>'
            + '<td class="cell" data-title="City">' + filteredData[i].city + '</td>'
            + '<td class="cell" data-title="Income">' + filteredData[i].income + '</td>'
            + '<td class="cell" data-title="Average">' + filteredData[i].average + '</td>'
            + '<td class="cell" data-title="Last Month">' + filteredData[i].lastMonth + '</td>'
            + '</tr>';
    }
    $('#results').html(html);
}

//chosing page
function prevPage() {
    if (numberPage === 0) { numberPage = 0 }
    else { numberPage = numberPage - 1; sendRes(); }
}

function nextPage() {
    if ((numberPage + 1) === Math.ceil(objFilter(companyDate).length / 10) || objFilter(companyDate).length === 0) { }
    else { numberPage = numberPage + 1; sendRes(); }

}


//filtering by input 
function inputSearch() {
    numberPage = 0;
    sendRes();
}

function objFilter(objToFiltr) {
    let idToCheck = new RegExp(document.getElementById("idInput").value, 'g');
    let nameToCheck = new RegExp(document.getElementById("nameInput").value, 'g');
    let cityToCheck = new RegExp(document.getElementById("cityInput").value, 'g');
    let incomeToCheck = new RegExp(document.getElementById("incomeInput").value, 'g');
    let averageToCheck = new RegExp(document.getElementById("averageInput").value, 'g');
    let lastMonthToCheck = new RegExp(document.getElementById("lastMonthInput").value, 'g');

    return objToFiltr.filter(x => {
        return idToCheck.test(x.id) && cityToCheck.test(x.city) && nameToCheck.test(x.name) && incomeToCheck.test(x.income) && averageToCheck.test(x.average) && lastMonthToCheck.test(x.lastMonth);
    });
}