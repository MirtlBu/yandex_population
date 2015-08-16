/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            console.log('error');
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];

function getObject(request) {
    var responses = {};
    for(var i = 0; i < 3; i++) {
        (function() {
            var objKey = requests[i];
            getData(objKey, function(error, result) {
                responses[objKey] = result;
                countHandler(responses, request);
            });
        })();
    }
}

function getPopulation() {
    var request = document.getElementById('input').value;
    getObject(capitalizeFirstLetter(request));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function countHandler(responses, request) {

    if(Object.keys(responses).length === requests.length) {
        var cities = [];

        for (var i = 0; i < responses['/cities'].length; i++) {

            if(responses['/cities'][i].country === request || responses['/cities'][i].name === request) {
                cities.push(responses['/cities'][i].name);
                getSum();
                return;
            }
            else {
                document.getElementById('answer').innerHTML = 'Города или страны ' + request + ' нет в нашем списке.';
            }
        }

        function getSum() {
            var sum = 0;
            for(var i = 0; i < cities.length; i++) {
                for(var j = 0; j < responses['/populations'].length; j++) {
                    if(cities[i] === responses['/populations'][j].name) {
                        sum = sum + responses['/populations'][j].count;
                    }
                }
            }
            document.getElementById('answer').innerHTML = 'Численность населения ' + request + ' равна ' + sum + '.';
        }

    }
}
