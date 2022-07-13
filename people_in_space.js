// Add this file to your server-directory/scriptcraft/scripts directory

/*
    Find the people in space using the open-notify People-In-Space API
    http://open-notify.org/Open-Notify-API/People-In-Space/

    The API returns a JSON object with the following fields:
    {
        "message": "success",
        "number": NUMBER_OF_PEOPLE_IN_SPACE,
        "people": [
                    {"name": NAME, "craft": SPACECRAFT_NAME},
                    ...
                ]
    }
*/
function people_in_space (params, sender) {
    var client = java.net.http.HttpClient.newBuilder().build();
    var request = java.net.http.HttpRequest.newBuilder().GET().uri(java.net.URI.create("http://api.open-notify.org/astros.json")).build();
    var response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());

    var object = JSON.parse(response.body());
    var spacecrafts = [];

    if (object.message === 'success') {
        if (object.number > 0) {
            spacecrafts = object.people.map(function (person) { // get the spacecraft name for each person
                return person.craft;
            }).filter(function (craft, index, array) { // remove duplicates
                return array.indexOf(craft) === index; // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
            }).sort(); // sort spacecraft alphabetically

            echo (sender, 'There are ' + object.number + ' people in space, aboard ' + spacecrafts.length + ' spacecraft.');

            spacecrafts.forEach(function (craft) { // print the spacecraft names
                echo (sender, craft + ':');

                object.people.forEach(function (person) { // print the names of the people in the spacecraft
                    if (person.craft === craft) {
                        echo (sender, '   - ' + person.name);
                    }
                });
                
            });
        } else {
            echo (sender, 'There are no people in space.');
        }
    } else {
        echo (sender, 'There was an error :(');
    }
    }

command('people-in-space', people_in_space);