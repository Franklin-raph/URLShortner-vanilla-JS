const url1LongLink = document.querySelectorAll('.url1LongLink')
const urlinput = document.querySelector('#urlText')
const shortItBtn = document.querySelector('.shortItBtn')
const urlContainer = document.querySelector('.urlContainer')
const error = document.querySelector('.error')
const invalidUrl = document.querySelector('.invalidUrl')
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);


async function getLink(){
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlinput.value}`)
    const data = await res.json();
    console.log(data)
    return data
}


urlContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains('copy')){
        const copyLink = document.getElementById("linkId");
        navigator.clipboard.writeText(copyLink.textContent);
        let cpyBtn = e.target
        cpyBtn.style.backgroundColor = "var(--Dark-Violet)"
        cpyBtn.textContent = "Copied!"
    }
})


shortItBtn.addEventListener('click', async function(e){
    e.preventDefault()
    if(urlinput.value === ""){
        error.style.display = "block"
        urlinput.style.border = "3px solid var(--Red)"
        urlinput.classList.add('placeHolderError')
        setTimeout(() => {
            error.style.display = "none"
            urlinput.style.border = "2px solid transparent"
            urlinput.classList.remove('placeHolderError')
        },3500)
        console.log("first")
    }else if(!urlinput.value.match(regex)){
        invalidUrl.style.display = "block"
        urlinput.style.border = "3px solid var(--Red)"
        urlinput.classList.add('placeHolderError')
        setTimeout(() => {
            invalidUrl.style.display = "none"
            urlinput.style.border = "2px solid transparent"
            urlinput.classList.remove('placeHolderError')
        },3500)
    } else{
        const link = await getLink()
        console.log(link)
        const div = document.createElement('div')
        div.innerHTML = `
            <h3 class="url1LongLink">https://${urlinput.value}</h3>
            <div>
                <a href="https://${link.result.short_link}" target="_blank" id="linkId" class="url1ShortLink">https://${link.result.short_link}</a>
                <button class="copy">Copy</button>
            </div>
        `
        div.classList.add('url')
        urlContainer.appendChild(div)
        // urlLink.textContent = `https://${urlinput.value}`
    }
})
