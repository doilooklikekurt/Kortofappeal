var myPlayer01;
function startLoadItems(webLoadAssets, callback) {
    var loadItems = [];
    var imagesList = [];
    var videoList = [];

    if (webLoadAssets !== "") {
        loadItems = JSON.parse(webLoadAssets);
        let _total = loadItems.length;
        let totalItems = loadItems.length;

        let imgIndex = 0;
        let videoIndex = 0;
        if (loadItems.length > 0) {
            for (let i in loadItems) {
                switch (loadItems[i].t) {
                    case 'i':
                        imagesList[imgIndex] = new Image();
                        imagesList[imgIndex].onload = function () {
                            _total--;
                            updateLoaded(_total, totalItems);
                            if (_total == 0) {
                                callback();
                            }
                        }
                        imagesList[imgIndex].onerror = function () {
                            _total--;
                            updateLoaded(_total, totalItems);
                            if (_total == 0) {
                                callback();
                            }
                        }
                        imagesList[imgIndex].src = loadItems[i].u;
                        imgIndex++;
                        break;
                    case 'v':
                        videoList[videoIndex] = document.createElement("video");
                        videoList[videoIndex].onloadeddata = function () {
                            _total--;
                            updateLoaded(_total, totalItems);
                            if (_total == 0) {
                                callback();
                            }
                        }
                        videoList[videoIndex].addEventListener('error', function () {
                        //videoList[videoIndex].onerror = function () {
                            console.log('error');
                            _total--;
                            updateLoaded(_total, totalItems);
                            if (_total == 0) {
                                callback();
                            }
                        }, true);
                        videoList[videoIndex].autoplay = true;
                        videoList[videoIndex].setAttribute("muted", true)
                        videoList[videoIndex].setAttribute("playsinline", true)
                        var sourceMP4 = document.createElement("source");
                        sourceMP4.type = "video/mp4";
                        sourceMP4.src = loadItems[i].u;
                        videoList[videoIndex].appendChild(sourceMP4);
                        /*if (/iPad|iPhone|iPod/.test(navigator.userAgent)){
                            videoList[videoIndex].autoplay = true;
                        }*/
                        //videoList[videoIndex].load()
                        //document.querySelector('body').appendChild(videoList[videoIndex]);
                        videoIndex++;
                        break;
                }
            }
        } else {
            callback();
        }

    } else {
        callback();
    }

    function updateLoaded(_loaded, _total) {
        console.log(_loaded + " of " + _total + " left");
    }
}

function startNewPage(pagecls, pagekey, html, title) {
    $('body').attr('data-page', pagekey);
    $('#js-scroll').html(html).attr({'class': pagecls + ' smooth-scroll', "data-page": pagekey});
    document.title = title;
    currentPage = pagekey;
    startNewPageEvents(pagekey,true);

}

function startNewPageEvents(pagekey, internal=false) {
    addMenuEvents();
    if(!internal){
        setTimeout(function () {
            //Curtain On
            $('.curtain').addClass('animating');
        }, 2000);
    }
    setTimeout(function () {
        //Start Locomotive
        locomotiveInit();
    }, (internal) ? 800 : 3000);

    setTimeout(function () {
        //Curtain Out
        $('.curtain').removeClass('animating');
        if(pagekey == 'work_detail'){

            //myPlayer01 = videojs("player01");
            myPlayer01 = videojs($('#js-scroll').find("#player01")[0]);
            myPlayer01.play();
        }
    }, (internal) ? 1300 : 3500);
    if(pagekey == 'home'){

        setTimeout(function () {
            $homeSlider = $('#homeSlider');
            if(homeSliderInterval !== null){
                $('.content_navigation_slider li.active:first').remove('active');
                $('li.active',$homeSlider).removeClass('active');
                clearInterval(homeSliderInterval);
            }
            $('.content_navigation_slider li:first').addClass('active');
            $('li.item01',$homeSlider).addClass('active');
        }, (internal) ? 1300 : 3500);
    }

    setTimeout(function () {
        switch (pagekey) {
            case 'home':
                initHomePage();
                break;
            case 'contact':
                initContactPage();
                break;
            case 'about':
                initAbouPage();
                break;
            case 'work_list':
                initWorkPage();
                break;
            case 'work_detail':
                initWorkDetail();
                break;
            case 'jobs_list':
                initJobsList();
                break;
            case 'job_detail':
                initJobDetail();
                break;
            case 'director':
                initDirector();
                break;
        }
    }, (internal) ? 1700 : 3900);
}

var homeSliderInterval = null;
var $homeSlider = null;

function initHomeSlider() {
    homeSliderInterval = setInterval(homeSliderNav, 7000);
    $('.projectlink', $homeSlider).on('click', addOpenProjectItemList);
    $('.content_navigation_slider li', $homeSlider).on('click', function () {
        clearInterval(homeSliderInterval);
        let $item = $(this);
        if ($item.hasClass('active')) {
            homeSliderInterval = setInterval(homeSliderNav, 7000);
        } else {
            $('li.active:first', $homeSlider).removeClass('active');
            $('.content_navigation_slider li.active', $homeSlider).removeClass('active');
            $item.addClass('active');
            $('li:eq(' + $item.attr('data-index') + ')', $homeSlider).addClass('active');

            homeSliderInterval = setInterval(homeSliderNav, 7000);
        }
    })
}

function homeSliderNav() {
    let cur = $('li.active:first', $homeSlider);
    if (cur.index() == $('.slider li', $homeSlider).length - 1) {
        cur.removeClass('active');
        $('.slider li:first', $homeSlider).addClass('active');
    } else {
        cur.removeClass('active').next().addClass('active');
    }
    //Navigation
    let curNav = $('.content_navigation_slider li.active', $homeSlider);
    if (curNav.index() == $('.content_navigation_slider li', $homeSlider).length - 1) {
        curNav.removeClass('active');
        $('.content_navigation_slider li:first', $homeSlider).addClass('active');
    } else {
        curNav.removeClass('active').next().addClass('active');
    }
}

function initFeaturedProjects(){
    if(!chkIsMobile){
        $('.project_list:first .content_video video').each(function() {
            let _videoUrl = $(this).attr('data-video');
            $('source', $(this)).attr({'src' : _videoUrl});
        })
        $(".project_list .project_item").hover(function(){
            $('.video', this).get(0).play();
        }, function(){
            $('.video', this).get(0).pause();
        });
    }else{
        $('.project_list:first .content_video video').remove();
    }

    $('.project_list:first .projectlink').on('click', addOpenProjectItemList);
}

function checkProjectListMobileVideos($projectList){
    if(!chkIsMobile){
        $('.project_item_chk video', $projectList).each(function() {
            let _videoUrl = $(this).attr('data-video');
            $('source', $(this)).attr({'src' : _videoUrl});
        })
        $(".project_item_chk", $projectList).hover(function(){
            $('.video', this).get(0).play();
        }, function(){
            $('.video', this).get(0).pause();
        });
    }else{
        $('.project_item_chk .content_video video', $projectList).remove();
    }
    $('.project_item_chk', $projectList).removeClass('project_item_chk');
}
function initGetMoreProjectList($projectList){
    let moreProjectLoading = false;
    $projectList.on('click', '.getMoreProjects', function(e){
        e.preventDefault();
        let $node =$(this);
        let url = $node.attr('data-link');

        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            beforeSend: function(){
                $('.curtain').addClass('animating');
            },
            success: function (json) {
                if(json.status){
                    const total = document.querySelectorAll('.content_list').length;
                    let $contentLink = $node.parent().detach();
                    $projectList.append(json.html);
                    if(json.btnmore){
                        $contentLink.find('.getMoreProjects:first').attr('data-link', json.link);
                        $projectList.append($contentLink);
                    }
                    checkProjectListMobileVideos($projectList);
                    startLoadItems(json.assets, function(){
                        setTimeout(function () {
                            removeBlackCls();
                            locomotiveInit();
                        }, 1000);
                        setTimeout(function () {
                            scroll.scrollTo(document.querySelectorAll('.content_list')[total], {"duration": 0});
                            $('.curtain').removeClass('animating');
                        }, 1500);
                    });
                }
            },
            complete: function(){
                moreProjectLoading = false;
            }
        });
    });
}

function addOpenProjectItemList(e){
    e.preventDefault();
    let $node = $(this);
    let apiurl = $node.attr('data-link');
    let url = $node.attr('href');
    let projId = $node.attr('data-idproj');
    let currentPageContent = '';
    let currentMainCls = '';
    const currentUrl = window.location.href;
    const currentTitle = document.title;
    let pageid = currentPage;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiurl,
        beforeSend: function(){
            $('.curtain').addClass('animating');
        },
        success: function (json) {
            if(json.status){
                currentPageContent = $('#js-scroll').html();
                currentMainCls = $('#js-scroll').attr('class');
                currentPage = json.pagekey;
                document.title=json.pagetitle;
                changeUrl(url,apiurl,currentPage);
                $('body').attr('data-page', json.pagekey);
                $('#js-scroll').html(json.html).attr({'class': json.pagecls + ' smooth-scroll', 'data-page':json.pagekey}).find('.backToProjects').on('click', function(e){
                    e.preventDefault();
                    loadPage(webPath + 'work/', webPath + 'api/work/', 'work');
                });

                $('#js-scroll').find('.directorlink').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let link = $(this).attr('data-link');
                    let idDirector = $(this).attr('data-id');
                    let uriDirector = $(this).attr('data-uri');
                    loadPage(webPath + 'directors/'+ idDirector+'/'+uriDirector+'/', webPath + 'api/directors/'+idDirector+'/', 'director');
                });
                $('#js-scroll').find('.logo').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    loadPage(webPath, webPath + 'api/home/', 'home');
                });

                checkProjectListMobileVideos($('#js-scroll'));
                $('.content_random_projects .projectlink').on('click', addOpenProjectItemList);
                setTimeout(function () {
                    locomotiveInit();
                }, 1000);
                setTimeout(function () {
                    myPlayer01 = videojs($('#js-scroll').find("#player01")[0]);
                    myPlayer01.play();
                    $('.curtain').removeClass('animating');
                }, 1500);
                setTimeout(function () {
                    $('.content_navigation').addClass('show');
                }, 3000);
            }
        },
        complete: function(){
            moreProjectLoading = false;
        }
    });
}
function initProjectsList(){
    let $projectList = $('#projectList');
    checkProjectListMobileVideos($projectList);
    initGetMoreProjectList($projectList);

    $projectList.on('click', '.projectlink', function(e){
        e.preventDefault();
        let $node = $(this);
        let apiurl = $node.attr('data-link');
        let url = $node.attr('href');
        let projId = $node.attr('data-idproj');
        let currentPageContent = '';
        let currentMainCls = '';
        const currentUrl = window.location.href;
        const currentTitle = document.title;
        let pageid = currentPage;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: apiurl,
            beforeSend: function(){
                $('.curtain').addClass('animating');
            },
            success: function (json) {
                if(json.status){
                    currentPageContent = $('#js-scroll').html();
                    currentMainCls = $('#js-scroll').attr('class');
                    currentPage = json.pagekey;
                    document.title=json.pagetitle;
                    changeUrl(url,apiurl,currentPage);
                    $('body').attr('data-page', json.pagekey);
                    $('#js-scroll').html(json.html).attr({'class': json.pagecls + ' smooth-scroll', 'data-page':json.pagekey}).find('.backToProjects').on('click', function(e){
                        e.preventDefault();
                        $('.curtain').addClass('animating');
                        currentPage = pageid;
                        setTimeout(function () {
                            $('#js-scroll').html(currentPageContent).attr({'class': currentMainCls + ' smooth-scroll', 'data-page':pageid});
                            $('body').attr('data-page', pageid);
                            changeUrl(currentUrl, currentUrl, pageid);
                            document.title=currentTitle;
                            locomotiveInit();
                            initProjectsList();
                            setTimeout(function () {
                                scroll.scrollTo(document.querySelector('.proj_item_'+projId), {"duration": 0});
                                $('.curtain').removeClass('animating');
                            }, 500);
                        }, 2000);

                    });
                    $('#js-scroll').find('.directorlink').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        let link = $(this).attr('data-link');
                        let idDirector = $(this).attr('data-id');
                        let uriDirector = $(this).attr('data-uri');
                        loadPage(webPath + 'directors/'+ idDirector+'/'+uriDirector+'/', webPath + 'api/directors/'+idDirector+'/', 'director');
                    });
                    $('#js-scroll').find('.logo').on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        loadPage(webPath, webPath + 'api/home/', 'home');
                    });
                    $('.content_random_projects .projectlink').on('click', addOpenProjectItemList);
                    checkProjectListMobileVideos($('#js-scroll'));
                    setTimeout(function () {
                        locomotiveInit();
                    }, 1000);
                    setTimeout(function () {
                        //myPlayer01 = videojs("player01");
                        myPlayer01 = videojs($('#js-scroll').find("#player01")[0]);
                        myPlayer01.play();

                        $('#js-scroll').find('.videomodule').each(function(){
                            let id = $(this).attr('id');
                            let vplayer = videojs(id);
                            vplayer.play();
                        });

                        $('.curtain').removeClass('animating');
                    }, 1500);
                    setTimeout(function () {
                        $('.content_navigation').addClass('show');
                    }, 3000);
                }
            },
            complete: function(){
                moreProjectLoading = false;
            }
        });

    })

}

function initHomePage() {
    initHomeSlider();
    initFeaturedProjects();
    $('.content_navigation_slider').addClass('show');
    $('.content_navigation').addClass('show');
}

function initAbouPage() {
    $('.content_navigation').addClass('show');
    $('.content_big_image').addClass('show');
}

function initJobsList() {
    $('.content_static_text').addClass('show');
    $('.content_navigation').addClass('show');
    $('.content_jobs_list').addClass('show');
}

function initJobDetail() {
    $('.content_navigation').addClass('show');
    $('.content_heading').addClass('show');
    $('.content_description').addClass('show');
    addUpload(document.querySelector("#resumeCV"));
    addFormJobApply();
}
function initDirector() {
    $('.content_static_text').addClass('show');
    $('.content_navigation').addClass('show');
    $('.content_projects_list').addClass('show');
    initFeaturedProjects();

    initProjectsList();
    /*let $projectList = $('#projectList');
    initGetMoreProjectList($projectList);*/
}

function initContactPage() {
    $('.content_static_text').addClass('show');
    $('.content_navigation').addClass('show');
    $('.content_information').addClass('show');
    $('.content_representation').addClass('show');
    $('.mobile_open').click(function(e) {
        if($(this).parent().hasClass('open')){
            $(this).parent().removeClass('open');
        }
        else{
            $(this).parent().addClass('open');
        }
        setTimeout(function(){
            scroll.update();
        }, 1000);
    });
    if(window.location.hash === "#!representation"){
        scroll.scrollTo(document.querySelector("#representationList"), { "offset" : -100 });
    }
}

function initWorkPage() {
    $('.content_static_text').addClass('show');
    $('.content_navigation').addClass('show');
    $('.content_labels').addClass('show');
    $('.content_projects_list').addClass('show');
    initProjectsList();
    //addProjectListEvent();
}
function initWorkDetail() {
    $('.content_navigation').addClass('show');
    myPlayer01.play();
    $('#js-scroll').find('.videomodule').each(function(){
        let id = $(this).attr('id');
        let vplayer = videojs(id);
        //vplayer.play();
    });
    $('.content_random_projects .projectlink').on('click', addOpenProjectItemList);
}

function addUpload(input) {
    var label = input.nextElementSibling, labelVal = label.innerHTML;
    input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
            fileName = e.target.value.split('\\').pop();

        if (fileName)
            label.querySelector('span').innerHTML = fileName;
        else
            label.innerHTML = labelVal;
    });

    // Firefox bug fix
    input.addEventListener('focus', function () {
        input.classList.add('has-focus');
    });
    input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
    });
}

function addFormJobApply() {
    let sendingJobApply = false;
    let $form = $('#contentForm');
    $('#btnJobApply').on('click', function (e) {
        if(sendingJobApply){ return; }
        e.preventDefault();
        let formData = new FormData($form[0]);
        let errors = 0;
        $('.warning', $form).removeClass('warning');
        $form.find('input[type=text], input[type=email], input[type=tel],  input[type=file],  textarea, select').each(function () {
            if (!$(this).hasClass('empty') && ($(this).val() === null || $(this).val().trim() === '')) {
                errors++;
                $(this).parents(".fld-job-wrapper:first").addClass('warning');
            }
        });
        if($('.content_radios:first input:checked', $form).length < 1){
            errors++;
            $('.content_radios:first', $form).addClass('warning');
        }

        if(errors > 0){
            return;
        }
        $.ajax({
            url: webPath + 'api/jobs/apply/',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                sendingJobApply = true;
                $('#btnJobApply > span:first').text("sending");
            },
            success: function (json) {
                if (json.status) {
                    $form.addClass('success');
                    setTimeout(function(){
                        //locomotiveInit();
                        scroll.update();
                        scroll.scrollTo(document.querySelector('#contentForm ul'), {"duration": 0});
                    }, 300);
                } else {
                    if(json.errNodes.length > 0){
                        for(let i=0; i < json.errNodes.length; i++){
                            $(json.errNodes[i]).parents(".fld-job-wrapper:first").addClass('warning');
                        }
                    }
                    $('#btnJobApply > span:first').text("retry");
                }
            }, error: function () {
                $('#btnJobApply > span:first').text("retry");
            }, complete: function () {
                sendingJobApply = false;
            }
        });

    });
}
