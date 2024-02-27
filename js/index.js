const dataLoad = async(searchText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await  response.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) =>{
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ``;
    phones.forEach(phone => {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList = `card bg-base-100 shadow-xl border-[#CFCFCF] border-2`;
       phoneDiv.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl w-1/2 mx-auto" />
            </figure>
            <div class="card-body items-center text-center">
            <h2 class="card-title text-2xl font-bold py-5">${phone.phone_name}</h2>
            <p class="px-9">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="text-2xl font-bold pt-2 pb-6">$999</h2>
            <div class="card-actions">
                <button class="btn bg-[#0D6EFD] text-xl font-semibold text-white">Show Details</button>
            </div>
            </div>
       `
       phoneContainer.appendChild(phoneDiv)
    });
}

const searchPhone = () => {
    const searchBtn = document.getElementById('search');
    const searchValue = searchBtn.value;
    dataLoad(searchValue);
}

dataLoad();