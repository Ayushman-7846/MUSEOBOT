let input = document.querySelector(".input");
let chat_box = document.querySelector(".chat-box");
let middle = document.querySelector(".middle");
let no_of_people = 1;

input.addEventListener("click", () => {
    if (input.value === "") {
        input.value = " ";
    }
});

const place_price = {
    NULL: 0,
    nandankanan: 100,
    konark: 50,
    jagnnath_temple: 0,
    khandagiri: 25,
    dhouli: 30,
    lingaraj_temple: 10,
    rajarani_temple: 5,
    iit_ghatikia: -10,
    iskon: 0,
    samaleswari_temple: 20
};

const createChat = (message, className) => {
    let list = document.createElement("li");
    let para = document.createElement("p");
    para.innerText = message;
    list.classList.add("chats", className);
    list.append(para);
    return list;
};

// Info - name and phone number form
let form = document.createElement("div");
form.innerHTML =
    `<label style="display: block; margin-bottom: 10px; color: #333;">Name:</label>
    <input type="text" id="name" placeholder="Enter your name" 
    style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

    <label style="display: block; margin-bottom: 10px; color: #333;">Phone Number:</label>
    <input id="phone" type="number" placeholder="Enter your phone number" 
    style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

    <button id="submit" value="Submit" 
    style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;

chat_box.append(form);

// Info - number of members in the group
let tdiv = document.createElement("div");
tdiv.innerHTML =
    `<label style="display: block; margin-bottom: 10px; color: #333;">Number of People:</label>
    <input type="number" id="group" placeholder="Number of people" 
    style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">
    <button id="submit1" value="Submit" 
    style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;

// Info - places dropdown
let sele = document.createElement("select");
sele.setAttribute('style', 'width: 200px; padding: 10px; margin: 20px 0; border: 1px solid #ccc; border-radius: 4px;');
let selectedPlace = "";

for (let place in place_price) {
    let newOption = document.createElement("option");
    newOption.innerText = place;
    newOption.value = place;
    sele.append(newOption);
}

sele.addEventListener('change', function () {
    selectedPlace = sele.value;
    console.log('Selected place:', selectedPlace);

    chat_box.append(createChat(`For ${no_of_people} members in your group, you need to pay Rs: ${no_of_people * place_price[selectedPlace]}/-`, "by_bot"));

    if (!document.querySelector('.qr-container')) {
        let img = document.createElement("div");
        img.classList.add('qr-container');
        img.innerHTML = `<img src="qr.jpg" style="width: 100%; height: auto; max-width: 200px;">`;
        chat_box.append(img);
    } else {
        document.querySelector('.qr-container').scrollIntoView();
    }
});

// Event listener for name and phone number form submission
document.querySelector("#submit").addEventListener("click", () => {
    let name = document.querySelector("#name").value;
    let ph_no = document.querySelector("#phone").value;

    if (!name || !ph_no || ph_no.length !== 10) {
        alert("Please provide a valid name and phone number.");
        return;
    }

    chat_box.append(createChat("Enter how many people are in your group", "by_bot"));
    chat_box.append(tdiv);

    document.querySelector("#submit1").removeEventListener("click", groupSubmitHandler);
    document.querySelector("#submit1").addEventListener("click", groupSubmitHandler);
});

// Handle group number submission
function groupSubmitHandler() {
    no_of_people = document.querySelector("#group").value;

    if (no_of_people < 1 || isNaN(no_of_people)) {
        alert('Please enter a valid number of people.');
        return;
    }

    chat_box.append(createChat("Enter everyone's name", "by_bot"));
    generateInputFields(no_of_people);
}

function generateInputFields(people) {
    chat_box.innerHTML = ''; // Clear previous inputs

    for (let i = 1; i <= people; i++) {
        const label = document.createElement('label');
        label.textContent = `Person ${i} Name:`;
        label.style.display = 'block';
        label.style.marginTop = '10px';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `person${i}`;
        input.id = `person${i}`;
        input.placeholder = `Enter name of person ${i}`;
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';

        chat_box.appendChild(label);
        chat_box.appendChild(input);
    }

    let ppl = document.createElement("div");
    ppl.innerHTML = `<button id="submit2" value="Submit" 
    style="width: 30%; padding: 10px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>`;
    chat_box.append(ppl);

    document.querySelector("#submit2").addEventListener("click", () => {
        saveNames(no_of_people);

        chat_box.append(createChat("Select where you want to visit", "by_bot"));
        chat_box.append(sele);
    });
}

function saveNames(no_of_people) {
    const namesArray = [];

    for (let i = 1; i <= no_of_people; i++) {
        const nameValue = document.getElementById(`person${i}`).value;
        if (nameValue) {
            namesArray.push(nameValue);
        }
    }

    console.log('Names Array:', namesArray);
}