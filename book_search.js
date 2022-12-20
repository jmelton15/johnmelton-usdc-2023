/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": "",
        "Results": []
    };

    const contentObj = {};
    // //First thing I did was to create a smaller object containing only isbns and content from book 
    // // splitting this up should make the next process of finding the search term faster instead of nesting the loops
    scannedTextObj.forEach((book) => {
        const content = book.Content;
        const isbn = book.ISBN;
        contentObj[isbn] = content;
        /**
         * The commented code snippet below on lines 53-57 performas faster than the submitted, uncommented code.
         *  However, it does not yield the exact return object requested by the assessment
         *   As seen below the return object would have a second value called Details which would be an array of found objects:
         *    Details: [
         *     {
         *       "Page",
         *       "Line",
         *       "Text"
         *     } 
         *    ]
         * 
         * This performs faster because it is able to take advantage of the map and filter methods directly upon each book's content 
         *   when using forEach on the scanned object.
         * It is also much cleaner looking in my opinion. However, I submitted the code snippet below instead because it satisfies the exact 
         *    return object of the assessment.
         */
        // let results = content.filter((sample) => {return sample.Text.includes(searchTerm)})
        // result.Results.push({
        //     "ISBN": isbn,
        //     "Details":results
        // })
    });
    // The method below satisfies the exact requirements of the project, yielding the return object given in the assessment
    // this search is fast for small arrays of book objects, but gets slower the more books we add
    for(let book in contentObj) {
        contentObj[book].forEach((sample) => {
            if(sample.Text.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": book,
                    "Page": sample.Page,
                    "Line": sample.Line
                })
            }
        })
    }
    // make sure the search term portion of the return object is set to be the given search term
    result.SearchTerm = searchTerm;
    return result; 
}


/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            //added another page to test for all capital letters in the (THE)
            {
                "Page": 33,
                "Line": 15,
                "Text": "eyes were, I asked myself how he had managed to see, and THE"
            }
        ] 
    }
]

/** Example input object that contains multiple books. */
const twentyLeaguesIn2 = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            //added another page to test for all capital letters in the (THE)
            {
                "Page": 33,
                "Line": 15,
                "Text": "eyes were, I asked myself how he had managed to see, and THE"
            }
        ]
    },
    { "Title": "Twenty Thousand Leagues Under the Sea 2",
        "ISBN": "9780000528532",
        "Content": [
            {
                "Page": 20,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 20,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 20,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            //added another page to test for all capital letters in the (THE)
            {
                "Page": 22,
                "Line": 15,
                "Text": "eyes were, I asked myself how he had managed to see, and THE"
            }
        ]},
        { "Title": "Twenty Thousand Leagues Under the Sea 3",
        "ISBN": "9780000528533",
        "Content": [
            {
                "Page": 50,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 50,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 50,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            //added another page to test for all capital letters in the (THE)
            {
                "Page": 52,
                "Line": 15,
                "Text": "eyes were, I asked myself how he had managed to see, and THE"
            }
        ]}  
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

// Another example output used for testing the Capitalized The
const twentyLeaguesOut2 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

// Another example output used for testing for all capital letters
const twentyLeaguesOut3 = {
    "SearchTerm": "THE",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 33,
            "Line": 15
        }
    ]
}

// Test output example for multiple books 
const twentyLeaguesOutMultipleBooks = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528532",
            "Page": 20,
            "Line": 9
        },
        {
            "ISBN": "9780000528533",
            "Page": 50,
            "Line": 9
        }
    ]
}

// findSearchTermInBooks("the",twentyLeaguesIn)

// /*
//  _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
// | | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
// | | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
// | |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
//  \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
//  */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// usually for unit testing, I prefer to make actual test functions
// But for the sake of this assessment since the above test are written as if statements
// I will follow that example

// This is a lot like the first unit test above, however, 
//   this only checks if results were returned for the search term
//   not if the entire json object itself matches
// This unit test as a function could be named something like 
//  testTermFound()
const foundTest = findSearchTermInBooks("how",twentyLeaguesIn);
if(foundTest.Results.length > 0) {
    console.log("PASS: Test 3 (Found Test)");
} else {
    console.log("Fail: Test 3 (Found Test)");
    console.log("Expected More Than Zero Results");
    console.log(`Received Results Length of ${foundTest.Results.length}`);
}

// This is the opposite of the foundTest above. It passes if the search term is not found
//   i.e. no results in Results
// This unit test as a function could be named something like 
//  testTermNotFound()
const notFoundTest = findSearchTermInBooks("None",twentyLeaguesIn);
if(notFoundTest.Results.length > 0) {
    console.log("Fail: Test 4 (Not Found Test)");
    console.log("Expected Results Length of Zero");
    console.log(`Received Results Length of ${notFoundTest.Results.length}`);
} else {
    console.log("PASS: Test 4 (Not Found Test)");
}

/**
 * 
 * @param {*} searchTerm 
 * @param {*} scannedObj 
 * @param  {object,object,object} kwargs  -> array of expected output objects to match with
 */
function testCaseSensitivity(searchTerm,scannedObj,...kwargs) {
    //This makes the whole search term lower case
    let firstLetterLowercase = searchTerm.toLowerCase();
    // This makes the first letter of the search term uppercase
    let firstLetterUppercase = firstLetterLowercase[0].toUpperCase() + firstLetterLowercase.slice(1);
    // This makes all the letters uppercase
    let allUppercase = searchTerm.toUpperCase();

    //testing for "the"
    const caseSensitiveTest1 = findSearchTermInBooks(firstLetterLowercase, scannedObj); 
    // testing for "The"
    const caseSensitiveTest2 = findSearchTermInBooks(firstLetterUppercase, scannedObj);
    // testing for "THE"
    const caseSensitiveTest3 = findSearchTermInBooks(allUppercase, scannedObj);

    if (JSON.stringify(kwargs[0]) === JSON.stringify(caseSensitiveTest1)) {
        console.log("PASS: Case Sensitive Test 1");
    } else {
        console.log("FAIL: Case Sensitive Test 1");
        console.log("Expected:", kwargs[0]);
        console.log("Received:", caseSensitiveTest1);
    }
    if (JSON.stringify(kwargs[1]) === JSON.stringify(caseSensitiveTest2)) {
        console.log("PASS: Case Sensitive Test 2");
    } else {
        console.log("FAIL: Case Sensitive Test 2");
        console.log("Expected:", kwargs[1]);
        console.log("Received:", caseSensitiveTest2);
    }
    if (JSON.stringify(kwargs[2]) === JSON.stringify(caseSensitiveTest3)) {
        console.log("PASS: Case Sensitive Test 3");
    } else {
        console.log("FAIL: Case Sensitive Test 3");
        console.log("Expected:", kwargs[2]);
        console.log("Received:", caseSensitiveTest3);
    }
}
//run case sensitivity test
testCaseSensitivity("the",twentyLeaguesIn,twentyLeaguesOut,twentyLeaguesOut2,twentyLeaguesOut3);

// This next test checks if the function finds and returns the correct object
//  when given a scanned object containing multiple books
const testMultipleBooks = findSearchTermInBooks("the", twentyLeaguesIn2);
if (JSON.stringify(twentyLeaguesOutMultipleBooks) === JSON.stringify(testMultipleBooks)) {
    console.log("PASS: Multiple Books Test");
} else {
    console.log("FAIL: Multiple Books Test");
    console.log("Expected:", twentyLeaguesOutMultipleBooks);
    console.log("Received:", testMultipleBooks);
}

