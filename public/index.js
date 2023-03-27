let count = 0;
let count2 = 0;


export const getFont = () => {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Coiny&family=Manjari:wght@100;400;700&display=swap');
    document.head.appendChild(link);

    var link2 = document.createElement('link');
    link2.setAttribute('rel', 'stylesheet');
    link2.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css');
    document.head.appendChild(link2);

}

export const initializePage = () => {
    const body = document.body;
    body.style.boxSizing = "border-box"
    body.style.background = "rgb(218,156,148)";
    body.style.background = " linear-gradient(52deg, rgba(218,156,148,1) 0%, rgba(218,170,148,1) 35%, rgba(253,245,215,1) 100%)";
    body.style.height = "100vh"


    const header = document.createElement("div")
    header.id = "header";
    header.style.display = "flex";
    header.style.justifyContent = "space-between"
    header.style.alignItems = "center";
    header.style.margin = "20px 60px"
    header.style.height = "5rem"
    body.appendChild(header)

    const card = document.createElement("div")
    card.id = "card"
    card.style.display = " flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.width = "45rem"
    card.style.height = "60rem"
    card.style.background = "#F0E6DA"
    card.style.margin = "0 auto"
    card.style.borderRadius = "60px"
    body.appendChild(card)

    const title = document.createElement("h1");
    title.id = "title"
    title.innerText = "CATSAGRAM"
    title.style.fontSize = "48px"
    title.style.color = "white"
    title.style.fontFamily = "'Coiny', cursive"


    header.appendChild(title);

    if (!localStorage.getItem("catImg")) {
        fetchImg();

    }

    //create image

    const img = document.createElement("img");
    img.id = "mainImg"
    img.style.margin = "49px 56px";
    img.style.width = "35rem";
    img.style.height = "40%"
    img.style.textAlign = "center";
    img.style.borderRadius = "60px"

    card.appendChild(img);
}// Your code here

export const getCatButton = () => {
    let header = document.querySelector("#header")

    let button1 = document.createElement("button");
    button1.id = "getCat"
    button1.innerText = "Another cat,  pawlease!"
    button1.style.fontFamily = "'Manjari', sans-serif";
    button1.style.fontSize = "24px"
    button1.style.color = "white";
    button1.style.backgroundColor = "#DAA694"
    button1.style.width = "321px"
    button1.style.height = "68px"
    button1.style.border = "1px solid #DAA694"
    button1.style.borderRadius = "30px"

    header.appendChild(button1);

    button1.addEventListener("click", () => {
        console.log("trying to make button work")
        fetchImg();
        storeCat();
        count = 0;
        count2 = 0;

        let likeSpan = document.querySelector("#upvoteScore")
        let dislikeSpan = document.querySelector("#dislikeCount")

        likeSpan.innerText = `${count}`;
        dislikeSpan.innerText = `${count2}`;

        let comment = document.querySelector("#commentOne");
        comment.innerText = ""
        localStorage.removeItem("commentOne")
    })

}

const fetchImg = async () => {
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImgUrl = kittenData[0].url;
        const kittenImg = document.querySelector("#mainImg");
        kittenImg.src = kittenImgUrl;
        localStorage.setItem("catImg", kittenImg.src)

        // After the image is finished loading, reset the score and comments
        kittenImg.addEventListener('load', () => {
            // resetScore();
            // resetComments();
        });
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
}

export const storeCat = () => {
    let catImg = document.querySelector("#mainImg");
    console.log(catImg)

    localStorage.setItem("catImg", catImg.src)
}

const retrieveCat = () => {
    if (localStorage.getItem("catImg")) {
        let catImg = document.getElementById("mainImg");
        let kittenImg = document.querySelector("#mainImg")
        console.log(kittenImg)

        let storedCat = localStorage.getItem("catImg")
        console.log("stored img" + storedCat);
        console.log("img we have " + catImg)
        catImg.src = storedCat
    }

}




export const makeVotingDiv = () => {
    let scoreDiv = document.createElement("div");
    let card = document.querySelector("#card")
    scoreDiv.style.width = "400px";
    scoreDiv.style.height = "100px"
    // scoreDiv.style.border = "pink 1px solid"
    scoreDiv.style.display = "flex";
    scoreDiv.style.columnGap = "1rem"
    scoreDiv.style.justifyContent = "space-around"

    //upvoted area

    let upvotediv = document.createElement("div");
    upvotediv.style.display = "flex";
    upvotediv.style.justifyContent = "center";
    upvotediv.style.alignItems = "center";
    upvotediv.style.columnGap = "3px";

    let emojiSide = document.createElement("div");
    emojiSide.style.display = "flex";
    emojiSide.style.flexDirection = "column";
    emojiSide.style.alignItems = "center";
    emojiSide.style.rowGap = "5px"

    let upvoteImg = document.createElement("img")
    upvoteImg.id = "upvoteImg"
    upvoteImg.src = "../assets/heart_cat.png"
    upvoteImg.style.cursor = "pointer"

    let label = document.createElement("span");
    label.innerText = `Like`
    label.style.fontFamily = "'Montserrat', sans-serif"
    label.style.fontSize = "12px"

    emojiSide.append(upvoteImg, label);

    let countSide = document.createElement("span")
    countSide.id = "upvoteScore"
    countSide.innerText = `${count}`
    countSide.style.fontFamily = "'Manjari', sans-serif"
    countSide.style.fontSize = "20px"
    countSide.style.width = "10px"

    upvotediv.append(emojiSide, countSide)
    scoreDiv.appendChild(upvotediv)

    card.appendChild(scoreDiv)

    //Comments

    let commentDiv = document.createElement("div");
    commentDiv.style.display = "flex";
    commentDiv.style.flexDirection = "column"
    commentDiv.style.justifyContent = "center";
    commentDiv.style.alignItems = "center";
    commentDiv.style.rowGap = "5px";

    let commentImg = document.createElement("img")
    commentImg.id = "commentImg"
    commentImg.src = "../assets/comment_cat.png"

    let label3 = document.createElement("span");
    label3.innerText = `Comment`
    label3.style.fontFamily = "'Montserrat', sans-serif"
    label3.style.fontSize = "12px"

    commentDiv.append(commentImg, label3)
    scoreDiv.appendChild(commentDiv)




    //dislike area
    let dislikediv = document.createElement("div");
    dislikediv.style.display = "flex";
    dislikediv.style.justifyContent = "center";
    dislikediv.style.alignItems = "center";
    dislikediv.style.columnGap = "3px";

    let emojiSide2 = document.createElement("div");
    emojiSide2.style.display = "flex";
    emojiSide2.style.flexDirection = "column";
    emojiSide2.style.alignItems = "center";
    emojiSide2.style.rowGap = "5px"

    let dislikeImg = document.createElement("img")
    dislikeImg.id = "dislikeImg"
    dislikeImg.src = "../assets/dislike_cat.png"
    dislikeImg.style.cursor = "pointer"

    let label2 = document.createElement("span");
    label2.innerText = `Dislike`
    label2.style.fontFamily = "'Montserrat', sans-serif"
    label2.style.fontSize = "12px"

    emojiSide2.append(dislikeImg, label2);

    let countSide2 = document.createElement("span")
    countSide2.id = "dislikeCount"
    countSide2.innerText = `${count2}`
    countSide2.style.fontFamily = "'Manjari', sans-serif"
    countSide2.style.fontSize = "20px"
    countSide2.style.width = "10px"

    dislikediv.append(emojiSide2, countSide2)
    scoreDiv.appendChild(dislikediv)





}

export const makeComments = () => {
    let commentDiv = document.createElement("div");
    commentDiv.id = "commentDiv"
    let card = document.querySelector("#card");

    commentDiv.style.height = "33%";
    commentDiv.style.margin = "49px 56px";
    commentDiv.style.width = "35rem";
    commentDiv.style.display = 'flex';
    commentDiv.style.flexDirection = "column";
    commentDiv.style.alignItems = 'center';
    commentDiv.style.borderRadius = "60px";
    commentDiv.style.background = "#DAAA94"
    commentDiv.style.border = " 1px solid pink";

    card.appendChild(commentDiv);


    //make the leave a comment div

    let submitCommentDiv = document.createElement("div");
    submitCommentDiv.style.display = "flex";
    submitCommentDiv.style.columnGap = "8px";
    submitCommentDiv.style.margin = "25px 16px"
    submitCommentDiv.style.boxSizing = "border-box"
    submitCommentDiv.style.width = "90%"


    //there should be 2 divs inside this one submit comment  div
    let writeComment = document.createElement("input");
    writeComment.id = "commentInput";
    writeComment.placeholder = "Comment"
    writeComment.style.fontFamily = "'Manjari', sans-serif";
    writeComment.style.fontSize = "24px"
    writeComment.style.color = "rgba(107,82,52)"
    writeComment.style.width = "100%";
    writeComment.style.height = "76px";
    writeComment.style.background = "white"
    writeComment.style.borderRadius = "15px"
    writeComment.style.border = "none"
    writeComment.style.padding = "0 26px"
    writeComment.style.outline = "none"

    //make the submit button side
    let submitButton = document.createElement("button");
    submitButton.id = "submitButton"
    submitButton.style.width = "154px";
    submitButton.style.height = "76px";
    submitButton.style.background = "white";
    submitButton.style.borderRadius = "15px";
    submitButton.style.border = "none";
    submitButton.innerText = "Submit";
    submitButton.style.fontFamily = "'Manjari', sans-serif";
    submitButton.style.fontSize = "24px";
    submitButton.style.color = "#6B5234"

    //append this whole submit comment div section into the comment section

    submitCommentDiv.append(writeComment, submitButton)
    commentDiv.appendChild(submitCommentDiv)




}

//so we need to make a section for voting and comments that will always stay the same i say these 2 functions can be separate
//then we need to make score keeping for the score and make sure it saves to local storage when you click a upvote or down vote button
//whenever you submit a commit that is added as an array to the local storage?
//when the button is clicked however both of these reset

//now give the small cat images  - when you click the like cat the score goes up by one
//everythime you click a button it is saved in cookies
//when you click the get a new cat button both cats scores are set to 0

export const scoreKeepingFunctionality = () => {
    let likeCat = document.querySelector("#upvoteImg")
    let dislikeCat = document.querySelector("#dislikeImg")
    let likeSpan = document.querySelector("#upvoteScore")
    let dislikeSpan = document.querySelector("#dislikeCount")

    likeCat.addEventListener("mouseover", () => {
        likeCat.style.opacity = ".5";
    })

    likeCat.addEventListener("mouseout", () => {
        likeCat.style.opacity = "1";
    })

    dislikeCat.addEventListener("mouseover", () => {
        dislikeCat.style.opacity = ".5";
    })

    dislikeCat.addEventListener("mouseout", () => {
        dislikeCat.style.opacity = "1";
    })

    likeCat.addEventListener("click", () => {
        count++;
        likeSpan.innerText = `${count}`
        localStorage.setItem('likeCount', count);

    })

    dislikeCat.addEventListener("click", () => {
        count2++;
        dislikeSpan.innerText = `${count2}`
        localStorage.setItem('dislikeCount', count2);

    })

    if (localStorage.getItem("likeCount")) {
        likeSpan.innerText = localStorage.getItem("likeCount")
    }

    if (localStorage.getItem("dislikeCount")) {
        dislikeSpan.innerText = localStorage.getItem("dislikeCount")
    }

}

//now add functionality to submitting comments

export const submitCommentsFunctionality = () => {
    let submitBtn = document.querySelector("#submitButton");
    let input = document.querySelector("#commentInput");

    let commentDiv = document.querySelector("#commentDiv")

    let comment = document.createElement("div");
    comment.id = "commentOne"

    comment.style.background = "white";
    comment.style.display = "flex"
    comment.style.alignItems = "center";
    comment.style.padding = "0px 26px"
    comment.style.fontFamily = "'Manjari', sand-serif";
    comment.style.fontSize = "20px"
    comment.style.color = "rgb(107, 82, 52)"
    comment.style.borderRadius = "15px";
    comment.style.border = "none"
    comment.style.width = "80%"
    comment.style.height = "76px"

    commentDiv.style.height = "24%"
    commentDiv.appendChild(comment)


    submitBtn.addEventListener("click", () => {
        //add to the inner text of the small div
        //style
        //append to the commetnDiv
        if (input.value) {

            let commentOne = document.querySelector("#commentOne")

            commentOne.innerText = `🐱‍💻 ${input.value}`

            localStorage.setItem("commentOne", comment.innerText)

            input.value = ""

        }

    })

    if (localStorage.getItem("commentOne")) {
        let comment2 = localStorage.getItem("commentOne");
        comment.innerText = comment2
    }


    if (comment.innerText.length > 0) {
        comment.addEventListener("click", () => {

        })
    }


}








window.onload = () => {
    initializePage();
    getFont();
    getCatButton();
    retrieveCat();
    makeVotingDiv();
    makeComments();
    scoreKeepingFunctionality();
    submitCommentsFunctionality();
}
