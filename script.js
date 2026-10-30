//Lin put your code here


// Gabriel's code
const APOD_API = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

const API_KEY = "MMFhrQgg6PqcFnGnwj9kdPfFnJQrmnrQGTpQMdjG";

async function getBirthdayImage(birthdate) {
    try {
        const url = `${APOD_API}?date=${birthdate}&api_key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve NASA data.");
        }

        const data = await response.json();

        console.log(data);

        if (data.media_type !== "image") {
            throw new Error("No photograph is available for this date.");
        }

        document.getElementById("apodImage").src =
            data.hdurl || data.url;

        document.getElementById("apodTitle").textContent =
            data.title;

        document.getElementById("apodExplanation").textContent =
            data.explanation;

        document.getElementById("apodDate").textContent =
            data.date;

        document.getElementById("apodCredit").textContent =
            data.credit || data.copyright || "NASA";

    } catch (error) {
        console.error("NASA API Error:", error);

        document.getElementById("resultMessage").textContent =
            error.message;
    }
}


document.getElementById("submitBirthday").addEventListener("click", () => {
    const birthdate = document.getElementById("birthday").value;
    
    if (!birthdate) {
        document.getElementById("resultMessage").textContent =
            "Please enter your birthday.";
        return;
    }
    const zodiac = getZodiacSign(birthdate);
    document.getElementById("zodiacName").textContent =
        "Your Zodiac Sign: " + zodiac;

    
    getBirthdayImage(birthdate);

});
