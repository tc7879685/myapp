(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        },
       blura = function () {
           setTimeout(function() {
               var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
               window.scrollTo(0, Math.max(scrollHeight - 1, 0));
           }, 100);
        }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
   // let input = doc.getElementById("input");
    doc.addEventListener("blur", blura, true);


    })(document, window);
