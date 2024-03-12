const main=document.querySelector("main");
const voiceSelect=document.getElementById("voices");
const textarea=document.getElementById("text");
const readBtn=document.getElementById("read");
const toggleBtn=document.getElementById("toggle");
const closeBtn=document.getElementById("close");


const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];
  

  data.forEach(createBox);

  //Create boxes for each objects in the arrays

  function createBox(item){
    const box=document.createElement('div');
//mans that item.image and item.text
    const{ image,text }=item;

    box.classList.add("box");
    box.innerHTML=`<img src="${image}" alt="${text}"> 
    <p class="info"> ${text}</p>`;

    // @todo-TO SPEAK THE EVENTS

    box.addEventListener("click",()=>{
        setTextMessage(text);
        speakTheText();

        //add active classname to the box to set a box-shadow

        box.classList.add("active");
        // Remove class after adding them within the seconds
        setTimeout(()=>box.classList.remove("active"),800)
    });

    main.appendChild(box);
  }

  //INIT speech synthesis 

  const message=new SpeechSynthesisUtterance();

    //store the voices 

    let voices=[];

    function getVoices(){
        voices=speechSynthesis.getVoices();
        // for more refer mdndocs to know more about the voices and their methods.
        voices.forEach(voice=>{
            const option=document.createElement("option");
            option.value=voice.name
            // NAME and LANG are some methods of the voice objects
            option.innerText=`${voice.name} ${voice.lang}`;

            voiceSelect.appendChild(option)

        });
    }

//set the text

function setTextMessage(text){
    //Message variable is a object created using the constructor syntax
    message.text=text;
}

//speak the text

function speakTheText(){
    speechSynthesis.speak(message);
}
  //EVENT LISTENERS

  //voices changed
  //Here we encountered a new EL as "voiceschanged".
  speechSynthesis.addEventListener("voiceschanged",getVoices);
  //toggle textbox

  toggleBtn.addEventListener("click",(e)=>{

     const text=document.getElementById("text-box");
     text.classList.toggle("show");

  })


  //close textbox
  closeBtn.addEventListener("click",(e)=>{

    const text=document.getElementById("text-box");
    text.classList.remove("show")
    // toggle also works but the correct way is to remove that class.

 });

 //El for the select list

 voiceSelect.addEventListener("change",(e)=>{
    message.voice=voices.find((voice)=>{
         return voice.name===e.target.value;
    });
 })


 //EL to read the user inputs
 readBtn.addEventListener("click",(e)=>{
    setTextMessage(textarea.value);
    speakTheText();
 })

 //Calling getvoices functions to add the options at the start.

 getVoices(); 