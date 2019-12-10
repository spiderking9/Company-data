var d = parseFloat(new Date().getMonth()+1);
fetch('https://recruitment.hal.skygate.io/companies').then(data => data.json()).then(response => {
            response.forEach(company => {
                var id = company.id;
                var name = company.name;
                var city = company.city;
                var output = `<tr>
            <th>id</th>
            <th>name</th>
            <th>city</th>
            <th>total income</th>
            <th>average income</th>
            <th>last month income</th>
        </tr>`;
                fetch('https://recruitment.hal.skygate.io/incomes/' + id).then(data => data.json()).then(response => {
                    var income = Math.round(response.incomes.reduce((a, b) => a + parseFloat(b.value), 0) * 100) / 100;
                    var average = Math.round((income / 49) * 100) / 100;
                    var lastMonth = Math.round(response.incomes.map((id) => parseFloat(id.date.substring(5, 7)) === d ? id.value : 0).reduce((a, b) => {
                        return a + parseFloat(b);
                    }, 0) * 100) / 100;
                    this.output = `
                            <tr>
                                <td>${id}</td>
                                <td>${name}</td>
                                <td>${city}</td>
                                <td>${income}</td>
                                <td>${average}</td>
                                <td>${lastMonth}</td>
                            </tr>`;
                    document.getElementById('data').innerHTML += this.output;
                    document.getElementById('data').rows.length;
                });
            })

        });


// var ids=210
// async function getIncomes(id){
//     const response = await fetch('https://recruitment.hal.skygate.io/incomes/' + id);
//     const json = await response.json();
//         var income = Math.round(json.incomes.reduce((a, b) => a + parseFloat(b.value), 0) * 100) / 100;
//         var average = Math.round((income / 49) * 100) / 100;
//         var lastMonth = Math.round(json.incomes.map((id) => parseFloat(id.date.substring(5, 7)) === d ? id.value : 0)
//             .reduce((a, b) => {return a + parseFloat(b);}, 0) * 100) / 100;
//             console.log(income);
//     return {income,average,last};


// }
// console.log(getIncomes(ids));
