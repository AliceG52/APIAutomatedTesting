const axios = require('axios');
const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let postResponseStatus;
let getResponse;

When('I make a POST request with the following details', async function (table) {
    var request = table.rowsHash();

    // Set correct data type.
    request.SelfTimer = (request.SelfTimer) === 'true';
    request.Flash = (request.Flash) === 'true';
    console.log(request)

    postResponseStatus = await axios.post('https://608abf88737e470017b73d96.mockapi.io/Cameras/', request)
    .then(function (response) {
        console.log(response)
        return response;
    })
});
  
Then('it responds with a http status code of {int}', function (statusCode) {
    // console.log(postResponseStatus);
    assert(postResponseStatus.status == statusCode);
});

When('I make a GET request for the newly created data', async function () {
    getResponse = await axios.get('https://608abf88737e470017b73d96.mockapi.io/Cameras/' + postResponseStatus.data.id)
    .then(function(response) {
        console.log(response.data);
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

When('I make a DELETE request for the newly created data', async function () {
    postResponseStatus = await axios.delete('https://608abf88737e470017b73d96.mockapi.io/Cameras/' + postResponseStatus.data.id)
    .then(function(response) {
        return response;
    })
})