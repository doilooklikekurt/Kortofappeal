var scrollDirection = 'down';
var currentPage = 'home';
var $cntLoading = null;
var myIntervalLetters = null;
var $mainItem = null;
function startLoading(){
    if($cntLoading === null){
        $cntLoading = $('#cntLoading');
    }

    myIntervalLetters = setInterval(function(){
        let cur = $('img.active', $cntLoading);
        if (cur.index() == $('img', $cntLoading).length - 1) {
            cur.removeClass('active');
            $('img:first', $cntLoading).addClass('active');
        } else {
            cur.removeClass('active').next().addClass('active');
        }
    }, 200);
}

function stopLoading(){
    if($cntLoading !== null){
        $cntLoading.hide();
    }
    if(myIntervalLetters !== null){
        clearInterval(myIntervalLetters);
    }
}
/*Locomotive Scroll*/
var scroll = null;
getLocomotive = function () {
    return scroll;
}

let viewportMdHeight = window.innerHeight / 2;
let resizing = false;
window.addEventListener('resize', function (event) {
    if(scroll !== null){
        viewportMdHeight = window.innerHeight / 2;
        if (!resizing) {
            resizing = true;
            setTimeout(() => {
                scroll.update();
                resizing = false;
            }, 2000);
        }
    }
});

/*Locomotive*/
const locomotiveInit = function () {
    if (scroll === null) {
        scroll = new LocomotiveScroll({
            el: document.querySelector('#js-scroll'),
            smooth: true,
            direction: "vertical",
            getDirection: true,
            smartphone: {
                smooth: false,
                direction: "vertical",
            },
            tablet: {smooth: true}
        });
        scroll.on("call", section_scroll);
    } else {
        scroll.destroy();
        scroll.init();
        scroll.on("call", section_scroll);
    }
    const cntNavitationItem = document.querySelector(".content_hide_navigation");
    scroll.on("scroll", (evt) => {
        scrollDirection = evt.direction;

        switch (evt.direction) {
            case 'up':
                if(typeof(evt.delta) !== "undefined"){
                    if (evt.delta.y > viewportMdHeight) {
                        cntNavitationItem.classList.add("show");
                    } else {
                        cntNavitationItem.classList.remove("show");
                    }
                }else if(typeof(evt.scroll) !== "undefined"){
                    if (evt.scroll.y > 120) {
                        cntNavitationItem.classList.add("show");
                    } else {
                        cntNavitationItem.classList.remove("show");
                    }
                }else{
                    cntNavitationItem.classList.add("show");
                }
                break;
            case 'down':
            default:
                cntNavitationItem.classList.remove("show");

        }
    });

}
let currentObjCall = null;

const section_scroll = function (obj, action) {
    currentObjCall = obj;
    switch (obj) {
        case 'section_black':
            sectionBlack(action, scrollDirection);
            break;
    }


}
const removeBlackCls = function () {
    const bodyClass = "black"
    switch(currentPage){
        case 'home':
            document.querySelector(".content_static_text").classList.remove(bodyClass);
            document.querySelector(".content_contact_us").classList.remove(bodyClass);
            document.querySelector(".content_more_work").classList.remove(bodyClass);
            document.querySelector(".content_projects_list").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            break;
        case 'about':
            document.querySelector(".content_contact_us").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            document.querySelector(".content_hero").classList.remove(bodyClass);
            break;
        case 'job_detail':
            document.querySelector(".content_hero").classList.remove(bodyClass);
            document.querySelector(".content_description").classList.remove(bodyClass);
            document.querySelector(".content_contact_us").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            break;
        case 'work_list':
            document.querySelector(".content_msg").classList.remove(bodyClass);
            document.querySelector(".content_projects_list").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            break;
        case 'work_detail':
            document.querySelector(".dynamic_modules").classList.remove(bodyClass);
            document.querySelector(".content_credits").classList.remove(bodyClass);
            document.querySelector(".content_more_projects").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            break;
        case 'director':
            document.querySelector(".content_msg").classList.remove(bodyClass);
            document.querySelector(".content_projects_list").classList.remove(bodyClass);
            document.querySelector(".content_footer").classList.remove(bodyClass);
            break;

    }
}
const addBlackCls = function () {
    const bodyClass = "black"
    switch(currentPage){
        case 'home':
            document.querySelector(".content_static_text").classList.add(bodyClass);
            document.querySelector(".content_contact_us").classList.add(bodyClass);
            document.querySelector(".content_more_work").classList.add(bodyClass);
            document.querySelector(".content_projects_list").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            break;
        case 'about':
            document.querySelector(".content_contact_us").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            document.querySelector(".content_hero").classList.add(bodyClass);
            break;
        case 'job_detail':
            document.querySelector(".content_hero").classList.add(bodyClass);
            document.querySelector(".content_description").classList.add(bodyClass);
            document.querySelector(".content_contact_us").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            break;
        case 'work_list':
            document.querySelector(".content_msg").classList.add(bodyClass);
            document.querySelector(".content_projects_list").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            break;
        case 'work_detail':
            document.querySelector(".dynamic_modules").classList.add(bodyClass);
            document.querySelector(".content_credits").classList.add(bodyClass);
            document.querySelector(".content_more_projects").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            break;
        case 'director':
            document.querySelector(".content_msg").classList.add(bodyClass);
            document.querySelector(".content_projects_list").classList.add(bodyClass);
            document.querySelector(".content_footer").classList.add(bodyClass);
            break;
    }
}
const sectionBlack = function (action) {
    if (action === "enter") {
        addBlackCls();
    } else if (scrollDirection === 'up') {
        removeBlackCls();
    }
}

var chkIsMobile = false;

(function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) chkIsMobile = true;
})(navigator.userAgent || navigator.vendor || window.opera);

$(document).ready(function () {
    $mainItem = $('main#js-scroll');
    currentPage = $("body").attr('data-page');
    /*Letters Loader*/
    startLoading();
    //addMenuEvents();

    //Remove Loading
    startLoadItems(webLoadAssets, function(){
        startNewPageEvents(currentPage);
        setTimeout(function () {
            //Remove Loading
            stopLoading();
        }, 2500);
    });

    window.addEventListener('popstate', function (e) {
        e.preventDefault()
        if (e.state) {
            const satusData = e.state
            if (satusData) {
                const page = satusData.hasOwnProperty("page") ? satusData.page : 'home';
                const pageuri = satusData.hasOwnProperty("pageuri") ? satusData.pageuri : webPath;
                const url = satusData.hasOwnProperty("url") ? satusData.url : webPath;
                loadPage(url, pageuri, page);
            }
        }
    });

});