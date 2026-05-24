import './style.css'
document.addEventListener("DOMContentLoaded",function(){
      const searchbutton = document.getElementById("searchbtn");
      const usernameInput = document.getElementById("user-input");
      const cards = document.querySelector(".card");
      const Name = document.getElementById("naam");
      const username = document.getElementById("usernaam");
      const repository = document.getElementById("rep");
      const follower = document.getElementById("follow");
      const following = document.getElementById("folling");
      const statscontainer = document.querySelector(".stats")
      const avatar = document.getElementById("avat");
      const qrContainer = document.getElementById("qrcode");

      function validateusername(username){
        if(username.trim() === ""){
          clearprofile();
          alert("Username should not be empty :|");
          return false;
        }
        const regex =  /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
        const isMatching = regex.test(username);
        if(!isMatching){
          alert("Invalid username :{");
        }
        return isMatching;
      }

      searchbutton.addEventListener("click",function(){
        //.value kisi input element ke andar ka current data/text deta hai ya set karta hai.
        const username = usernameInput.value;
        console.log("logging Username: ",username);
        if(validateusername(username)){
            fetchusersdetails(username);
        }
      })

      async function fetchusersdetails(username) {
        const url = `https://api.github.com/users/${username}`;
        try{
            searchbutton.textContent = "Searching ;}";
            searchbutton.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
              throw new Error("Unable to fetch user details");
            }
            const data = await response.json();
            console.log(data);
            display(data);
        }
        catch(error){
          clearprofile();
          alert("No Data Found");
        }
        finally{
            searchbutton.textContent ="search";
            searchbutton.disabled = false;
        }
      }

      function display(data){
        const followers = data.followers;
        const followingcount = data.following;
        const repocount = data.public_repos;
        const usrname = data.login;
        const ava = data.avatar_url;
        username.textContent = `@${usrname}`;
        repository.textContent = `Repos: ${repocount}`;
        follower.textContent = `Followers: ${followers}`;
        following.textContent = `Following: ${followingcount}`;
        Name.textContent = usrname;
        avatar.src = ava;

      //purana qr code hatane bala
        qrContainer.innerHTML = "";
//yaha humlog pahle khali kar rhe hai container  ko Qr bala nhi toh ek ke uppar ek aa jayega 
//new QRcode yeh constructor ko call kar rha hai 
//pahle argument diye jisme show karbana hai Qr code ko
//yaha library ke andar hidden hai qrcontainer.innerhtml
//means maine jo add kiya hai script tage me yeh QRCode usme pressent hai humlog bass qrcontainer pass kar rhe hai jo ki argument hai kaha dikhana hai bata rha hai
// humlog bass qrcontainer pass kar rhe hai jo ki argument hai
// yeh uske innertext ko badal rha hai qr code me

// humlog qrContainer pass kar rhe hai
// taaki library ko pata chale QR kahan insert karna hai

// text:data.html_url pass kar rhe hai
// taaki library ko pata chale QR ke andar kya encode karna hai
        new QRCode(qrContainer,{
          text:data.html_url,//yeh github ke profile ka link hai
         // text:"Aryan OP",
          width:150,
          height:150
      });
      console.log(qrContainer.innerHTML);
        cards.classList.remove("hidden");
      }

      function clearprofile(){
        cards.classList.add("hidden");
      }

    });