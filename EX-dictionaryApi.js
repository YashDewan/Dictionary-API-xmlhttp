console.log("Dictionary Api :");

// https://api.dictionaryapi.dev/api/v2/entries/<language_code>/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en_US/hello


// Language Code	Language
//  en_US  English(us)
// hi	Hindi
// es	Spanish
// fr	French
// ja	Japanese
// ru	Russian
// en_GB	English (UK)
// de	German
// it	Italian
// ko	Korean
// pt-BR	Brazilian Portuguese
// ar	Arabic
// tr	Turkish

let resultcard = document.getElementById('resultcard');
let word = document.getElementById('word');
let submit = document.getElementById('submit');
let cardtitle = document.getElementById('cardtitle');
let cardtext = document.getElementById('cardtext');

submit.addEventListener('click', (e) => {
    let word_val = word.value;
    console.log(word_val);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word_val}`, true);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onprogress = function() {
        console.log("in progress...");
    }
    xhr.onload = function() {
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);
            console.log(this.responseText);
            console.log(obj);
            meaning = obj[0]['meanings'][0]['definitions'][0]['synonyms'][0];
            audio = obj[0]["phonetics"][0]["audio"];
            console.log(meaning);

            let html = ``;

            html += `<div class="card mx-auto" id="resultcard" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title" id="cardtitle">${word_val}</h5>
                                <p class="card-text" id="cardtext">${meaning}</p>
                                <audio controls>
                                    <source src="${audio}" type="audio/mp3">
                                        Your browser does not support the audio element.
                                    </audio>
                                <a href="#" class="btn btn-primary">Read More..</a>
                            </div>
                        </div>`;

            resultcard.innerHTML = html;
        } else {
            console.log("ERROR !");
        }
    }
    xhr.send();
    e.preventDefault();
});