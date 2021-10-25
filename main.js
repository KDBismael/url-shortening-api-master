// import axios from "axios";

//get body element
var body=document.getElementsByTagName('body')[0];
var bodyWidth=body.clientWidth;
//get hamburger element
var burger=document.querySelector('nav svg');
//get menuModal elemnts
var menuModal=document.querySelector('.menuModal');
//get menu elemnts
var menu=document.querySelector('.menu');
//get connexion zone elemnts
var connexionZone=document.querySelector('.connexion');
//get menu links elemnts
var menuLinks=document.querySelector('.ul1');
// get short links result container
var linkContainer=document.getElementsByClassName('btnCopy');
// get original link display elements
var linkDisplay=document.getElementsByClassName('links');
// get short links result display
var shortLinksDisplay=document.getElementsByClassName('shortlinks');


//listen hamberger element
burger.addEventListener('click',()=>{
    menuModal.style.display="block";
    body.style.overflow=("hidden");
})

//close menu to outside click
menuModal.addEventListener('click',(e)=>{
    if(e.target == menuModal){
        menuModal.style.display="none";
        body.style.overflow=("auto");
    }
})

//short URL API part
    //get input element
    var links=document.getElementById('linkToShort');
    // get shorten button
    var shortIt=document.getElementsByClassName('short')[0];
    // get empty warning element
    var warning= document.getElementsByClassName('warning')[0];

    var i=0; //compteur
    
    //listen event to short url
    shortIt.addEventListener('click',clickToShort);


    // empty function
    function emptyInput(){
        links.style.border="2px solid var(--Red)";
        warning.classList.add('poswarning');
        warning.innerHTML='Please add a link';
    }

    //function to  display response
    function displayresponse(C,originalL,short){
        console.log(C)
        if(C==1){
            linkContainer[2].style.display="block"
            linkDisplay[2].innerHTML=originalL
            shortLinksDisplay[2].innerHTML=short  
        }
        else if(C==2){
            linkContainer[1].style.display="block"
            linkDisplay[1].innerHTML=originalL
            shortLinksDisplay[1].innerHTML=short  
        }
        else if(C==3){
            linkContainer[0].style.display="block"
            linkDisplay[0].innerHTML=originalL
            shortLinksDisplay[0].innerHTML=short  
        }
    }

    //function to short
    function clickToShort(){

        var data =links.value;
        //const formattedData = Qs.stringify(data);
        if(data==""){
            emptyInput();
        }
        else{
           var data=links.value;
           var data_short;
           axios({
               method: 'get',
               responseType:"json",
               url:'https://api.shrtco.de/v2/shorten?url='+data
                }).then((response)=>{
                    var Result=JSON.parse(response.request.response);
                    data_short=Result.result.full_short_link;
                    console.log(data_short);
                })
                .catch((error)=>{
                    console.log(error);
                });
            if(axios){
                i=i+1;
            }
           displayresponse(i,data,data_short); 

        }
    }
    // hidden warning if short input content change
    links.addEventListener('change',hiddenW)

    //function to hidden warning
    function hiddenW(){
        links.style.border="initial";
        warning.innerHTML='';
    }




