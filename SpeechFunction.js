var Alexa = require('alexa-sdk');

var M3dDataObj = {
    M3D: [
        "M3D stands for Metadata Driven Develoment. It is a cloud agnostic framework that helps synchronize data as well as metadata from multiple source systems to multiple target systems automatically. Additionally, it enforces a global data model on top of the synchronized metadata. M3D provides three awesome user interfaces, named as flows and assets."
    ],
    PATHFINDER: [
        "Adidas M3D Pathfinder is a set of dashboards to visualise the M3D Cosmos and it's components. The viewer can see one dasboard which focuses on location information, one which highlights the structure and one which illustrates the data flows."
    ],
    COCKPIT: [
        "Adidas M3D Cockpit is a centralized metadata repository.  It supports Data Champs in introducing and maintaining the structure of tables into the M3D Cosmos. There are certain steps to register a table into cockpit. They are nicely documented in confluence page under M3D sections."
    ]
};

var BiSalesDataObjParam = {
    FIRST: [
        "2334343"
    ],
    SECOND: [
        "879655"
    ],
    THIRD: [
        "0"
    ]
};

// a separate function that takes out the quote and returns the mdddkey and quote
function getM3dFunction(mdddkey) {

    console.log("Getting into getM3dFunction");

    // Get random mdddkey if mdddkey is not defined
    if (mdddkey === undefined) {

        var totalmdddkeys = Object.keys(M3dDataObj).length;
        var rand = Math.floor(Math.random() * totalmdddkeys);

        // random mdddkey name
        mdddkey = Object.keys(M3dDataObj)[rand];
    }

    // check the mdddkeys if it exists, and have a single mdddkey name
    switch (mdddkey) {
        case 'M3D': mdddkey = 'M3D'; break;
        case 'm3d': mdddkey = 'M3D'; break;
        case 'metadata driven development framework': mdddkey = 'M3D'; break;
        case 'pathfinder': mdddkey = 'PATHFINDER'; break;
        case 'path finder': mdddkey = 'PATHFINDER'; break;
        case 'cockpit': mdddkey = 'COCKPIT'; break;
        default: mdddkey = "Unknown";
    }

    // if mdddkey is unknown, return false
    if (mdddkey == "Unknown") {
        console.log("Author not found. Return false");
        return false;
    }

    // Get total quotations for the mdddkey from the QuoteDataObj object
    var totalquotations = M3dDataObj[mdddkey].length;

    // Select a random quotation
    var randquote = Math.floor(Math.random() * totalquotations);
    var quote = M3dDataObj[mdddkey][randquote];

    console.log("Return author and quote");

    // return both the author name and quote as an array
    return [mdddkey, quote];
}


// a separate function that takes out the sales figure for a specific query pattern
function getSalesFunction(saleyQueryKeyYear) {

    console.log("Getting into getSalesFunction");

    // Get random saleyQueryKeyYear if saleyQueryKeyYear is not defined
    if (saleyQueryKeyYear === undefined) {

        var totalSaleyQueryKeyYear = Object.keys(BiSalesDataObjParam).length;
        var rand = Math.floor(Math.random() * totalSaleyQueryKeyYear);

        // random  name
        saleyQueryKeyYear = Object.keys(BiSalesDataObjParam)[rand];
    }

    console.log("Requested query to fire is " + saleyQueryKeyYear);
    // check the saleyQueryKeyYear if it exists, and have a single saleyQueryKeyYear name
    switch (saleyQueryKeyYear) {
        case 'first': saleyQueryKeyYear = 'FIRST'; break;
        case 'second': saleyQueryKeyYear = 'SECOND'; break;
        case 'third': saleyQueryKeyYear = 'THIRD'; break;
        default: saleyQueryKeyYear = "Unknown";
    }
    console.log("The case statement to check against " + saleyQueryKeyYear);

    // if BiSalesDataObjParam is unknown, return false
    if (saleyQueryKeyYear == "Unknown") {
        console.log("key not found. Return false");
        return false;
    }

    // Get details for saleyQueryKeyYear from the BiSalesDataObjParam object
    var totalquotations = BiSalesDataObjParam[saleyQueryKeyYear].length;
    console.log("Total details " + totalquotations);

    // Select the value
    //var randquote = Math.floor(Math.random() * totalSaleyQueryKeyYear);
    var retValue = BiSalesDataObjParam[saleyQueryKeyYear][0];

    console.log("Return key and value as key " + saleyQueryKeyYear + " and value " + retValue);

    // return both the author name and quote as an array
    return [saleyQueryKeyYear, retValue];
}


var handlers = {

    // When launched without any action
    'LaunchRequest': function () {

        console.log("Launch Request Handler Called");

        // Forward it to Introduction Handler
        this.emit('Introduction');
    },

    // can go under LaunchRequest also, but separating it out, just to look cool
    'Introduction': function () {

        console.log("Introduction Handler called.");

        // The user opened the skill without providing any action or intent
        var speechOutput = "Hello, I am Ana. Glad to meet you. You can ask me any thing regarding M3D";

        // In case the user did not provide any input
        var repromptText = "I did not receive any input. Thank you and good bye.";

        // Just speak it out through an Alexa Device
        this.emit(':ask', speechOutput, repromptText);
    },

    // Defined Intents linked with Skill Start Here

    // Intent - When a user asks for a random quote
    'MDDDQuote': function () {

        console.log("MDDDQuote Intent Handler Called");

        // Call the getQuoteFunction() to get an array of mdddkey and quotation
        var getQuote = getM3dFunction();
        var mdddkey = getQuote[0];
        var mdddvalue = getQuote[1];

        // The cardTitle & cardContent is important for Alexa App and Echo Show Devices
        var cardTitle = "Quotation from " + mdddkey;
        var cardContent = mdddvalue;
        if (mdddkey === "M3D") {
            var speechOutput = mdddvalue;
        } else {
            var speechOutput = mdddvalue;
        }

        // Speak out the output along with card information
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent);

    },

    // Intent - When a user asks for quote from a specific mdddkey
    'DataAnalyticsQuote': function () {

        console.log("DataAnalyticsQuote Intent Handler Called.");

        // Get the mdddkey from the slot value specific to this intent
        var mdddkey = this.event.request.intent.slots.mdddkey.value;
        var getQuote = getM3dFunction(mdddkey);

        // if getQuoteFunction wasn't able to detect the mdddkey, then send to Unhandled Intent
        if (!getQuote) {
            this.emit('Unhandled');
        }

        // Override the mdddkey name with the one received from the getQuoteFunction
        mdddkey = getQuote[0];
        var mdddvalue = getQuote[1];

        var cardTitle = "Quotation from " + mdddkey;
        var cardContent = mdddvalue;
        var speechOutput = mdddvalue;

        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent);
    },

    // Intent - When a user asks for quote from a specific mdddkey
    'BiSalesQuery': function () {

        console.log("BiSalesQuery Intent Handler Called.");

        // Get the saleyQueryKeyYear from the slot value specific to this intent
        var saleyQueryKey = this.event.request.intent.slots.saleyQueryKeyYear.value;
        var getSalesDetails = getSalesFunction(saleyQueryKey);

        // if getQuoteFunction wasn't able to detect the saleyQueryKeyYear, then send to Unhandled Intent
        if (!saleyQueryKey) {
            this.emit('Unhandled');
        }

        // Override the saleyQueryKeyYear name with the one received from the getSalesFunction
        saleyQueryKey = getSalesDetails[0];
        var saleyQueryValue = getSalesDetails[1];
        var speechOutput = "The sales volume for " + saleyQueryKey + " quarter  of current year is " + saleyQueryValue;

        if (saleyQueryValue === "0") {
            speechOutput = "The Slaes volume for " + saleyQueryKey + " is not completed yet";
        }



        this.emit(':tell', speechOutput);
    },

    // Intent - When a user asks for MDDDCreatorQuote quote
    'MDDDCreatorQuote': function () {

        console.log("MDDDCreatorQuote Intent Handler Called");

        var speechOutput = "M3D is created by Data Engineers. They are people who loves to created something new and benefit to the organization. You get details about Data Engineers, and their product M3D, in confluence page."

        // Speak out the output along with card information
        this.emit(':tellWithCard', speechOutput);

    },

    // Intent - Unhandled. It is not a built-in intent.
    'Unhandled': function () {

        console.log("Unhandled Intent Handler Called.");

        this.emit(':tell', "Sorry, I am unable to understand what you said. You can ask me anything regarding M3D");
    }
};

// export the handler for node.js
exports.handler = function (event, context, callback) {

    // alexa object via the alexa-sdk
    var alexa = Alexa.handler(event, context, callback);

    // register & execute all the handlers/intents that are created
    alexa.registerHandlers(handlers);
    alexa.execute();
};
