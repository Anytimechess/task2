// const { createElement } = require("react");

let gallery=[
  {
    name:'bordercollie',
    discrption:'The Border Collie is an exceptionally intelligent, energetic, and agile breed, renowned for its herding abilities and quick learning skills.',
    path:'images/bordercollie.jpg'
  },
  
  {
    name:'germanshepard',
    discrption:'The German Shepherd is a loyal, intelligent, and versatile working dog known for its strength, obedience, and protective nature',
    path:'images/germanshepard.jpg'
  },
  
  {
    name:'goldenretriver',
    discrption:'The Golden Retriever is a friendly, intelligent, and gentle dog breed, loved for its affectionate nature and excellent companionship.',
    path:'images/goldenretriver.jpg'
  },
  
  {
    name:'husky',
    discrption:'The Husky is an energetic, intelligent, and resilient dog breed known for its striking blue eyes, thick coat, and strong pack instincts.',
    path:'images/husky.jpg'
  },
  
  {
    name:'pitbull',
    discrption:'Pit bulls are loyal, affectionate, and energetic companions whose behavior is shaped more by training and socialization than by breed genetics.',
    path:'images/pitbull.jpg'
  },
  
  {
    name:'lab',
    discrption:'The Labrador Retriever is a friendly, outgoing, and intelligent breed, known for its gentle nature, loyalty, and versatility as both a family pet and working dog.',
    path:'images/lab.jpg'
  },
  {
    name:'irishsetter',
    discrption:'The Irish Setter is an energetic, friendly, and elegant dog breed known for its striking red coat and playful nature.',
    path:'images/irishsetter.jpg'
  },
  {
    name:'australianshepherd',
    discrption:'The Australian Shepherd is an intelligent, energetic, and hardworking herding dog known for its loyalty and striking multicolored coat and eyes.',
    path:'images/australianshepherd.jpg'
  },
  
]
const galleryDiv = document.querySelector('.item-3');
const fragment=document.createDocumentFragment();

document.addEventListener('DOMContentLoaded',loadIntialGallery);
function createImage(images){
 const fragment=document.createDocumentFragment();
  let imageCardDiv=document.createElement('div');
  let span=document.createElement('span');
  let imageName=images.name.toUpperCase()||`${images.path}`;
 span.classList.add('bi','bi-trash','delete-btn',`${imageName}`);
 imageCardDiv.className='image-card';
 let imageElement=document.createElement('img');
 imageElement.src=images.path;
 imageElement.alt="image not found ";
 imageElement.loading='lazy'
 imageElement.className='img';
 imageElement.width = 300;
    imageElement.height = 300;
 let overLayDiv =document.createElement('div');
 overLayDiv.className='overlay';
 let dogNameDiv=document.createElement('div');
 dogNameDiv.className='dog-name';
 dogNameDiv.innerHTML=images.name.toUpperCase();
 let discrptionDiv=document.createElement('p');
 discrptionDiv.innerHTML=images.discrption;

 overLayDiv.appendChild(dogNameDiv);
 overLayDiv.appendChild(discrptionDiv);
 imageCardDiv.appendChild(imageElement);
 imageCardDiv.appendChild(overLayDiv);
 imageCardDiv.appendChild(span)
//  console.log(imageCardDiv)
fragment.appendChild(imageCardDiv);
return fragment;
}
function clearIntialPage(){
  const initalPage=document.querySelector('.item-3');
  initalPage.innerHTML='';
}

function deleteBtn(){
  const deleteBtn=document.querySelectorAll('.delete-btn');
   deleteBtn.forEach((deleteBtn)=>{
    //adding delete feature for each btn
     deleteBtn.addEventListener('click',()=>{
        // console.log(deleteBtn.className.match(gallery[0].name));
        let target=deleteBtn.className.split(' ');
        console.log(target[3]);
        // console.log()

       gallery = gallery.filter(dog => (dog.name.toUpperCase()||dog.path) !==target[3]);
       console.log(gallery);
       //clears the old page and loads the new content
        clearIntialPage();
        loadIntialGallery();
     })
   })
  
}

//loads the intial gallery
//entry point of the js
function loadIntialGallery(){
gallery.forEach((images)=>{
 galleryDiv.appendChild(createImage(images));
})
 deleteBtn();
addClicktoAddImages();
}

//adds click functionality to add images and calls inputmodal
function addClicktoAddImages(){
const addBtn=document.querySelector('.add-images-btn');
  addBtn.addEventListener('click',()=>{
    inputModal();
  })
}
//sets inputmodal to block and makes cross button functional 
function inputModal(){
 const uploadModal= document.querySelector('.upload-modal');
 const submitBtn=document.querySelector('.btn-submit');
//  console.log(uploadModal)
 uploadModal.style.display="block";
 const bodyContainer=document.querySelector('body');
bodyContainer.classList.add('no-scroll');
  // bodyContainer.style.pointerEvents='none';

 const closeBtn=document.querySelector('.close-btn');

 closeBtn.addEventListener('click',()=>{
  uploadModal.style.display="none";
  bodyContainer.classList.remove('no-scroll');
 })
 //also adds the same functionaly for the submit button for closing the modal
 submitBtn.addEventListener('click',()=>{
  uploadModal.style.display="none";
  bodyContainer.classList.remove('no-scroll');
 })
}

 const fileBtn =document.querySelector(".form-control-file");
  fileBtn.addEventListener('change',getFile);
//adds functinality to submit button and passes the image object to create image function
  let imgSrc=null;
const sumbitBtn=document.querySelector('.btn-submit');
   sumbitBtn.addEventListener('click',()=>{
        let dogName=document.getElementById('dogs-name');
        let dogDiscription=document.getElementById('dogs-info');
        let imgObject={
          name:dogName.value,
          discrption:dogDiscription.value,
          path:imgSrc
        }
        galleryDiv.appendChild( createImage(imgObject));
        pushImgToGallery(imgObject);
        console.log(gallery);
        //also adds the delete btn feature after creating the new image-card
        deleteBtn();
        fileBtn.
        //clearing all the prev set data
        imgSrc='';
        fileBtn.value='';
        dogName.value='';
        dogDiscription.value='';
        clearPrevImage();
      })

//renders the selected phooto for preview in the modal
function getFile(){
   clearPrevImage();
    const file=document.getElementById('exampleFormControlFile1').files[0];
     if(!file) return;
    const reader=new FileReader();
    const imgDiv=document.querySelector('.file-preview');
    reader.onload=function(e){
     const img=document.createElement('img');
    
     img.src=e.target.result;
     imgSrc=e.target.result;//saving image src for passing into the image creating function
     img.width='250';
     img.height='250';
    //  console.log(imgSrc)
     imgDiv.append(img);
    }
    reader.readAsDataURL(file);
}

//clears the image 
function clearPrevImage(){
  document.querySelector('.file-preview').innerHTML='';
}
function pushImgToGallery(obj){
 gallery.push(obj);
}
// function removeImgFromGallery(obj){
//  gallery=gallery.filter()
// }