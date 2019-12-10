var d = parseFloat(new Date().getMonth() + 1);
var companyDate = [];
var dane = [];
var output;

//fetch from json
fetch('https://recruitment.hal.skygate.io/companies')
    .then(data => data.json()).then(resp => {
        resp.forEach(company => {
            var id = company.id;
            var name = company.name;
            var city = company.city;
            dane.push(id);
            fetch('https://recruitment.hal.skygate.io/incomes/' + id).then(data => data.json()).then(response => {
                var income = Math.round(response.incomes.reduce((a, b) => a + parseFloat(b.value), 0) * 100) / 100;
                var average = Math.round((income / 49) * 100) / 100;
                var lastMonth = Math.round(response.incomes.map((id) => parseFloat(id.date.substring(5, 7)) === d ? id.value : 0).reduce((a, b) => {
                    return a + parseFloat(b);
                }, 0) * 100) / 100;

                companyDate.push({ id, name, city, income, average, lastMonth });
            });
        });
    });

var x=0;
setTimeout(function () {
        if(x===0) {startSend(); x=1;}
}, 500);

function startSend() {
    $(function() {
            $('#data th').on('click', function() {
                var attr = $(this).attr('data-attr');
                var asc = (!$(this).attr('data-asc'));
                
                $('#data th').each(function() {
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
    companyDate.sort(function(first, secend) {
        if (asc) {
            return (first[prop] > secend[prop]) ? 1 : ((first[prop] < secend[prop]) ? -1 : 0);
        } else {
            return (secend[prop] > first[prop]) ? 1 : ((secend[prop] < first[prop]) ? -1 : 0);
        }
    });
    sendRes();
}

function sendRes () {
    var html = '';
    for (var i=0;i<10;i++) {
        html += '<tr>'
            +'<td>'+companyDate[i].id+'</td>'
            +'<td>'+companyDate[i].name+'</td>'
            +'<td>'+companyDate[i].city+'</td>'
            +'<td>'+companyDate[i].income+'</td>'
            +'<td>'+companyDate[i].average+'</td>'
            +'<td>'+companyDate[i].lastMonth+'</td>'
        +'</tr>';
    }
    $('#results').html(html);
}
