export function scrollElementToBottom (id) {
    const selector = `[class="rce-mlist"] `;
    const element = document.querySelector(selector);
    let elementLC = ""
    if(element){
        elementLC = document.querySelector(selector).lastElementChild;
        if(elementLC){
            elementLC.scrollIntoView({ behavior: 'smooth', block: 'end' })
            elementLC.focus();
        }
    }
    console.log(element)
    console.log(elementLC)
    console.log(element.scrollHeight)
}

export function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }
 
export function scrollToTop (id) {
    var div = document.getElementById(id);
    div.scrollTop = 0;
 }
 
//  //Require jQuery
// export function scrollSmoothToBottom (id) {
//     var div = document.getElementById(id);
//     $('#' + id).animate({
//        scrollTop: div.scrollHeight - div.clientHeight
//     }, 500);
//  }
 
//  //Require jQuery
// export function scrollSmoothToTop (id) {
//     var div = document.getElementById(id);
//     $('#' + id).animate({
//        scrollTop: 0
//     }, 500);
//  }