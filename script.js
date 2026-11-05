//Lin's code
const zodiacSigns = [
    { name: "Aries", start: "03-21", end: "04-19", "image": "IMAGES/aries.jpg" },
    { name: "Taurus", start: "04-20", end: "05-20", "image": "IMAGES/taurus.jpg" },
    { name: "Gemini", start: "05-21", end: "06-20", "image": "IMAGES/gemini.jpg" },
    { name: "Cancer", start: "06-21", end: "07-22", "image": "IMAGES/cancer.jpg" },
    { name: "Leo", start: "07-23", end: "08-22", "image": "IMAGES/leo.jpg" },
    { name: "Virgo", start: "08-23", end: "09-22", "image": "IMAGES/virgo.jpg" },
    { name: "Libra", start: "09-23", end: "10-22", "image": "IMAGES/libra.jpg" },
    { name: "Scorpio", start: "10-23", end: "11-21", "image": "IMAGES/scorpio.jpg" },
    { name: "Sagittarius", start: "11-22", end: "12-21", "image": "IMAGES/sagittarius.jpg" },
    { name: "Capricorn", start: "12-22", end: "01-19", "image": "IMAGES/capricorn.jpg" },
    { name: "Aquarius", start: "01-20", end: "02-18", "image": "IMAGES/aquarius.jpg" },
    { name: "Pisces", start: "02-19", end: "03-20", "image": "IMAGES/pisces.jpg" }
];



function getZodiacSign(birthdate) {



    const monthDay = birthdate.substring(5);

    const sign = zodiacSigns.find(zodiac => {

        if (zodiac.start > zodiac.end) {
            return monthDay >= zodiac.start ||
                monthDay <= zodiac.end;
        }

        return monthDay >= zodiac.start &&
            monthDay <= zodiac.end;
    });

    return sign;

}



// Gabriel's code
const APOD_API = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

const API_KEY = "MMFhrQgg6PqcFnGnwj9kdPfFnJQrmnrQGTpQMdjG";

async function getBirthdayImage(birthdate) {
    try {
        const daysAgo = Math.floor((new Date() - new Date(birthdate)) / (1000 * 60 * 60 * 24));
        const page = Math.floor(daysAgo / 25) + 1; // Calculate the page number based on days ago
        const url = `${APOD_API}?page=${page}&api_key=${API_KEY}`; // Fetch the specific page 
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve NASA data.");
        }

        const list = await response.json();
        const data = list.find(d => d.date === birthdate) || list[0]; //sends a list of specific date and if not found, sends the today's one in the list

        

        if (data.media_type !== "image") {
            throw new Error("No photograph is available for this date.");
        }

        const image = document.getElementById("apodImage");
        image.src = data.hdurl;
        image.style.display = "block";

        document.getElementById("apodTitle").textContent =
            data.title;

        document.getElementById("apodExplanation").innerHTML =
            data.explanation;

        document.getElementById("apodDate").textContent =
            data.date;

        document.getElementById("apodCredit").innerHTML =
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
        "Your Zodiac Sign: " + zodiac.name;

    const zodiacImagebox = document.getElementById("zodiacResult");
    zodiacImagebox.innerHTML = "loading zodiac image..."; 
    const img = document.createElement("img");
     img.src = zodiac.image;
    zodiacImagebox.appendChild(img);



    getBirthdayImage(birthdate);

});

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicButton.textContent = "Pause Music";
    } else {
        music.pause();
        musicButton.textContent = "Play Music";
    }
});
