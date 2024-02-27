const dataLoad = async(searchText='samsung', isShow) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await  response.json();
    const phones = data.data;
    displayPhones(phones, isShow);
}

const displayPhones = (phones, isShow) =>{
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ``;

    const showAll = document.getElementById('showAll');
    if(phones.length > 6 && !isShow){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    if(!isShow){
        phones = phones.slice(0,6);
    }

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
                <button onclick="showDetailsModal('${phone.slug}')" class="btn bg-[#0D6EFD] text-xl font-semibold text-white">Show Details</button>
            </div>
            </div>
       `
       toggle(false);
       phoneContainer.appendChild(phoneDiv)
    });
}

const searchPhone = (isShow) => {
    toggle(true);
    const searchBtn = document.getElementById('search');
    const searchValue = searchBtn.value;
    dataLoad(searchValue, isShow);
}

const toggle = (isLoading) => {
    const toggle = document.getElementById('toggle');
    const phoneContainer = document.getElementById('phoneContainer');
    if(isLoading){
        toggle.classList.remove('hidden');
        phoneContainer.classList.add('hidden');
    }
    else{
        toggle.classList.add('hidden');
        phoneContainer.classList.remove('hidden');
    }
}

const showAllData = () => {
    searchPhone(true);
}

const showDetailsModal = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    my_modal_5.showModal();

    const modal = document.getElementById('modalContainer');
    modal.innerHTML = `
        <div class="flex justify-center py-6">
        <img class="w-1/4" src="${phone.image}" alt="">
    </div>
    <div class="space-y-2">
        <h3 class="text-3xl font-bold">${phone.name}</h3>
        <p class="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-xl "><span class="text-xl font-semibold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Slug : </span>${phone?.slug}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Release Date : </span>${phone?.releaseDate}</p>
        <p class="text-xl "><span class="text-xl font-semibold">Brand : </span>${phone?.brand}</p>
        <p class="text-xl "><span class="text-xl font-semibold">GPS : </span>${phone?.others?.GPS}</p>
    </div>
    `
}

dataLoad();