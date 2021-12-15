//input = "q\tans"
//for (var i = 0; i < 23; i++) {
//    input+="\nq"+i+"\tans"
//}

input=prompt("Enter the words you want to study")

words = []
definitions = []

incorrect = []
remaining = []

group = 1

response = document.getElementById("response")

function setupStudy(input) {

    x = input.split("\n")
    for (v in x) {
        z = x[v].split("\t")
        words.push(z[0])
        definitions.push(z[1])  
    }    
    remaining = Array.from(new Array(words.length%10), (x, i) => i + 0);
    console.log("remaining", remaining)
}

function update() {
    document.getElementById("word").innerHTML = words[remaining[0]]
    document.getElementById("correct").innerHTML = ((group-1)*10+words.length%10)-(incorrect.length+remaining.length)
    document.getElementById("incorrect").innerHTML = incorrect.length
    document.getElementById("remaining").innerHTML = remaining.length
    document.getElementById("group").innerHTML = group+"/"+Math.ceil(words.length/10)
    
    response.value = ""
    response.focus()
    response.removeEventListener("keyup", checkEnter)
    response.addEventListener("keyup", checkEnter)
    
} 


function nextWord() {
    remaining.shift()
    if (remaining.length <= 0 && incorrect.length <= 0) {
        if (group+1 > Math.ceil(words.length/10)) {
            alert("done!")
            return
        }
        incorrect = []
        remaining = Array.from(new Array(10), (x, i) => i + (group-1)*10+words.length%10);
        group++
        update()
        return
    } else if (remaining.length <= 0) {
        remaining = incorrect
        incorrect = []
        update()
        return
    } else {
        update()
    }
     
}

function check() {
    const correctWord = definitions[remaining[0]]
    word = response.value
    modal = document.getElementById("myModal");
    if (word != correctWord) {

        modal.style.display = "block";
        r = document.querySelectorAll(".retry")
        r[0].focus()

        document.getElementById("correctWord").innerHTML = correctWord
        document.getElementById("enteredWord").innerHTML = word

        document.addEventListener("keyup", check)
        function check(e) {
            if (r[0].value == correctWord) {
                document.getElementsByClassName("check")[0].innerHTML = '<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>'
                r[0].disabled = "disabled"
            }
            if (r[1].value == correctWord) {
                document.getElementsByClassName("check")[1].innerHTML = '<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>'
                r[1].disabled = "disabled"
            }
            if (r[2].value == correctWord) {
                document.getElementsByClassName("check")[2].innerHTML = '<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>'
                r[2].disabled = "disabled"
                if (r[1].value == correctWord && r[2].value == correctWord && incorrect[incorrect.length-1] != remaining[0]) {
                    incorrect.push(remaining[0])
                    document.removeEventListener('keydown', check)
                    setTimeout(pass, 1000);
                } 
            }

        }
    } else {
        nextWord()
        console.log(remaining)
    }

}

function pass() {
    r[0].disabled=""; r[1].disabled=""; r[2].disabled=""
    r[0].value = ""; r[1].value = ""; r[2].value = ""
    document.getElementsByClassName("check")[0].innerHTML = ""
    document.getElementsByClassName("check")[1].innerHTML = ""
    document.getElementsByClassName("check")[2].innerHTML = ""
    document.getElementById("myModal").style.display = "none"
    nextWord()
    update()
}
function checkEnter(e) {
    if (e.key == "Enter") {
       response.removeEventListener("keyup", checkEnter)
       document.getElementById("submit").click()
    }
}

setupStudy(input)
update()