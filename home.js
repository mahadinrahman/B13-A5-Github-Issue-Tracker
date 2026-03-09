let allData=[];
const number=document.getElementById('number-issues');


const createElements=(arr)=>{
    const htmlElements=arr.map(item=>`<span class="bg-orange-200 rounded-full px-3 text-red-600">
      ${item}</span>`);
       return htmlElements.join(" ");
    
}

const manageLoading=(isLoading)=>{
    if(isLoading==true){
     document.getElementById('spinner').classList.remove('hidden');
     document.getElementById('card-container').classList.add('hidden');

    }
    else{
     document.getElementById('spinner').classList.add('hidden');
     document.getElementById('card-container').classList.remove('hidden');
    
    }
}

const allbtn=()=>{
     manageLoading(true);
    
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues').then(res=>res.json())
    .then(data=>{
        //console.log(data.data);
        allData=data.data;
        loadAllbtn(data.data);

        const cardContainer=document.getElementById('card-container'); 
       number.innerText=cardContainer.children.length;

    })
}
allbtn();

const loadAllbtn=(btns)=>{
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML="";
    btns.forEach(btn => {
        const div=document.createElement('div');
        div.innerHTML=`
          <div onClick="loadDetails(${btn.id})"  class="card bg-white shadow-md h-full  ${btn.status=='open'?`border-t-green-500 border-t-3`:`border-t-purple-500 border-t-3`}">
            <div class=" px-5 pt-5 pb-2">
            <div class="flex justify-between ">
                <p>${btn.status=='open' ? `<img src="./assets/Open-Status.png" alt=""></img>`:`<img src="./assets/Closed- Status .png" alt=""></img>`}</p>
                   
                <p class="bg-red-200 rounded-full w-20 text-center">${btn.priority}</p>

            </div>
            <h2 class="font-semibold text-xl pt-2">${btn.title}</h2>
            <p class="text-gray-600 pb-2">${btn.description}</p>
            <div class="flex gap-1">
            <p class="flex-wrap">${createElements(btn.labels)}</p>
            </div>
            </div>
            <div class="px-4 pt-2 pb-2 border-t-2 border-gray-400">
                <p class="text-gray-600">#1 by ${btn.author}</p>
                <p class="text-gray-600">${btn.createdAt.split("T")[0]}</p>
            </div>
           

        </div> 
        `;
        cardContainer.appendChild(div);

    });
    manageLoading(false);
}




// document.getElementById('all-btn').addEventListener('click',function(){
//    const cardContainer=document.getElementById('card-container'); 
//    number.innerText=cardContainer.children.length;

// })

document.getElementById('open-btn').addEventListener('click',function(){
    const openBtn=allData.filter(item=>item.status==="open");
    loadAllbtn(openBtn);

    number.innerText=openBtn.length;
   
    

})
document.getElementById('closed-btn').addEventListener('click',function(){
    const closeBtn=allData.filter(item=>item.status==="closed");
    loadAllbtn(closeBtn);

    number.innerText=closeBtn.length;
    
   
})

document.getElementById('btn-search').addEventListener('click',function(){
    const input=document.getElementById('input-search').value.trim().toLowerCase();

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=>res.json()).then(data=>{

        const allwords=data.data;

        const filterwords=allwords.filter(word=>word.title.toLowerCase().includes(input));
        loadAllbtn(filterwords);
    })
    
})

const loadDetails=(id)=>{
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data);
        displayModal(data.data);

    })
}

const displayModal=(details)=>{
    const detailContainer=document.getElementById('detail-container');
    detailContainer.innerHTML=`
        <div>
          <p class="text-xl font-bold mb-1">${details.title}</p>
          <div class="flex gap-2 mb-2">
          <p class="rounded-full px-2 text-white bg-green-600">${details.status}</p>
          <p class="text-gray-600">. opened by ${details.author}</p>
          <p class="text-gray-600">. ${details.updatedAt.split("T")[0]}</p>
          </div>
          <p class="mb-2">${createElements(details.labels)}</p>
          <p class="text-gray-600 mb-3">${details.description}</p>
          <div class="flex gap-30 bg-[#E4E4E7] p-8 mb-2 rounded-lg">
          <p>Assignee:<br><span class="font-semibold">${details.author}</span></p>
          <p>Priority:<br><span class="rounded-full text-white bg-red-600 px-2">${details.priority}</span></p>

          </div>
        </div>
    `;
    document.getElementById('my_modal').showModal();
}


