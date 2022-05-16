const axios = require('axios');
const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let postResponseStatus;
let getResponse;

When('I make a POST request with the following details', async function (table) {
    // If the POST request returns a new ID, we could return the response.data for use later.
    postResponseStatus = await axios.post('https://608abf88737e470017b73d96.mockapi.io/Cameras/', table.rowsHash())
    .then(function (response) {
        return response.status;
    })
});
  
Then('it responds with a http status code of Created', function () {
    assert(postResponseStatus == 201);
});

When('I make a GET request for Camera {int}', async function (id) {
    // If the POST request returns a new ID, we could use the new id as the parameter for the GET.
    getResponse = await axios.get('https://608abf88737e470017b73d96.mockapi.io/Cameras/' + id)
    .then(function(response) {
        return response.data;
    })
})
 
Then('I expect the following response data types', function (table) {
    var expectedResponseDataTypes = table.raw();
    var keys = Object.keys(getResponse);
    var values = Object.values(getResponse);

    expectedResponseDataTypes.forEach(expectedProperty => {
        var expectedPropertyName = expectedProperty[0];
        var expectedPropertyDataType = expectedProperty[1]; 
        var index = keys.indexOf(expectedPropertyName);

        if (index > -1) {
            console.log(expectedPropertyName + " should be of type " + typeof values[index]);
            assert(expectedPropertyDataType == typeof values[index]);
        } else {
            throw `Property '${expectedPropertyName}' does not exist in GET response`;
        }
    });
})