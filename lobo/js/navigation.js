function curtainAnimating() {
   $('.curtain').addClass('animating');
    /*setTimeout(function(){
        //Curtain Out
        $('.curtain').removeClass('animating');
    },2500);*/
}

function changeUrl(url,apiurl,pagekey){
    window.history.pushState({page: pagekey, url: url, apiurl: apiurl}, "", url);
    //window.history.replaceState({page: pagekey, url: url, apiurl: apiurl}, "", url);
}
function addMenuEvents(){

    $('.navlink', $mainItem).on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        let link = $(this).attr('data-link');
        switch(link){
            case 'contact':
                loadPage(webPath + 'contact/', webPath + 'api/contact/', 'contacts');
                break;
            case 'contact/#!representation':
                if(currentPage === 'contact'){
                    scroll.scrollTo(document.querySelector("#representationList"), { "offset" : -100 });
                }else{
                    loadPage(webPath + 'contact/#!representation', webPath + 'api/contact/', 'contacts');

                }
                break;
            case 'about':
                loadPage(webPath + 'about/', webPath + 'api/about/', 'about');
                break;
            case 'jobs':
                loadPage(webPath + 'jobs/', webPath + 'api/jobs/', 'jobs');
                break;
            case 'work_list':
                loadPage(webPath + 'work/', webPath + 'api/work/', 'work');
                break;
            case 'work_category':
                let uriWorkCat = $(this).attr('data-uri');
                let pageNumber = $(this).attr('data-page');
                if(pageNumber !== "1"){
                    uriWorkCat += "/"+pageNumber+"/";
                }
                loadPage(webPath + 'work/'+uriWorkCat+'/', webPath + 'api/work/'+uriWorkCat+'/'+pageNumber+"/", 'work');
                break;
            case 'jobdetail':
                let idJob = $(this).attr('data-id');
                let uriJob = $(this).attr('data-uri');
                loadPage(webPath + 'jobs/detail/'+ idJob+'/'+uriJob+'/', webPath + 'api/jobs/detail/'+idJob+'/', 'jobsdetail');
                break;
            case 'director':
                let idDirector = $(this).attr('data-id');
                let uriDirector = $(this).attr('data-uri');
                loadPage(webPath + 'directors/'+ idDirector+'/'+uriDirector+'/', webPath + 'api/directors/'+idDirector+'/', 'director');
                break;
            case 'home':
            default:
                loadPage(webPath, webPath + 'api/home/', 'home');
                break;
        }
    })

    $('.burger_menu', $mainItem).click(function (e) {
        if ($('.burger_menu').hasClass('open')) {
            $('.burger_menu').removeClass('move3');
            setTimeout(function () {
                $('.burger_menu').removeClass('move2');
            }, 400);
            setTimeout(function () {
                $('.burger_menu').removeClass('open');
            }, 800);
            $('.content_navigation').removeClass('open');
            locomotiveInit();
        } else {
            $('.burger_menu').addClass('open');
            setTimeout(function () {
                $('.burger_menu').addClass('move2');
            }, 400);
            setTimeout(function () {
                $('.burger_menu').addClass('move3');
            }, 800);
            $('.content_navigation').addClass('open');
            scroll.destroy();
        }
    });
    /*Burger Menu Hidden*/
    $('.burger_menu_hidden').click(function (e) {
        //e.preventDefault();
        if ($('.burger_menu_hidden').hasClass('open')) {
            $('.burger_menu_hidden').removeClass('move3');
            setTimeout(function () {
                $('.burger_menu_hidden').removeClass('move2');
            }, 400);
            setTimeout(function () {
                $('.burger_menu_hidden').removeClass('open');
            }, 800);
            $('.content_hide_navigation').removeClass('open');
        } else {
            $('.burger_menu_hidden').addClass('open');
            setTimeout(function () {
                $('.burger_menu_hidden').addClass('move2');
            }, 400);
            setTimeout(function () {
                $('.burger_menu_hidden').addClass('move3');
            }, 800);
            $('.content_hide_navigation').addClass('open');
        }
    });
}
function loadPage(navurl, apiurl, key){
    curtainAnimating();
    changeUrl(navurl,apiurl , key);
    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiurl,
        success: function (json) {
            if(json.status){
                if(json.assets !== ""){
                    startLoadItems(json.assets, function(){
                        startNewPage(json.pagecls, json.pagekey, json.html, json.pagetitle);
                    });
                }else{
                    startNewPage(json.pagecls, json.pagekey, json.html, json.pagetitle);
                }


            }
        }
    });
}