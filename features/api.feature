Feature: API Tests using Cucumber

Scenario: POST Camera Data 
When I make a POST request with the following details
    | createdAt  | 2021-10-13T16:48:08.645Z |
    | CameraName | Canon                    |
    | CameraLens | 50mm 1.8g                |
    | SelfTimer  | true                     |
    | Flash      | false                    |
Then it responds with a http status code of 201

Scenario: Get Camera Data
When I make a GET request for the newly created data
Then I expect the following response data types
    | CameraName | string  |
    | Flash      | boolean |

Scenario: Delete Camera Data
When I make a DELETE request for the newly created data
Then it responds with a http status code of 200