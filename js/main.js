$(function () {

  // header
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(".intro").height()) {
      $("header").fadeIn();
    } else {
      $("header").fadeOut();
    }
  });


  // sidebar
  $('#hamburgerBtn').on('click', function () {
    openSidebar();
  });

  $('#closeBtn').on('click', function () {
    closeSidebar();
  });

  $('#sidebarOverlay').on('click', function () {
    closeSidebar();
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });

  function openSidebar() {
    $('#sidebar').addClass('active');
    $('#sidebarOverlay').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeSidebar() {
    $('#sidebar').removeClass('active');
    $('#sidebarOverlay').removeClass('active');
    $('body').css('overflow', 'auto');
  }

  $('.menu-item, .submenu-item').on('click', function (e) {
    console.log('메뉴 클릭:', $(this).text());
    closeSidebar();
  });

  $(window).on('resize', function () {
    closeSidebar();
  });


  // intro
  $(".intro").addClass("show");

  function handleIntroWheel(e) {
    if (e.originalEvent.deltaY > 0) {
      $(".intro_i").css("opacity", "0");
    } else {
      $(".intro_i").css("opacity", "1");
    }
  }

  function handleIntroClick() {
    $(".intro_i").css("opacity", "0");
  }

  $(window).off("wheel click");

  if ($(window).width() > 1024) {
    // PC: wheel 이벤트 사용
    $(window).on("wheel", handleIntroWheel);
  } else {
    // Mobile/tablet: click 이벤트 사용
    $(window).on("click", handleIntroClick);
  }


  // story
  var $imgBoxes = $('.story .imgbox');
  var storySection = $('.story');
  var storyHeight = storySection.outerHeight();
  var storyTop = storySection.offset().top;

  function checkScroll() {
    var scrollTop = $(window).scrollTop();
    var storyProgress = (scrollTop - storyTop) / (storyHeight - $(window).height());

    // 스토리 섹션 범위 내에서만 동작
    if (storyProgress >= 0 && storyProgress <= 1) {
      var activeIndex = Math.floor(storyProgress * $imgBoxes.length);
      activeIndex = Math.min(activeIndex, $imgBoxes.length - 1);

      $imgBoxes.removeClass('active');
      $imgBoxes.eq(activeIndex).addClass('active');
    }
  }

  $(window).on('scroll', checkScroll);
  $(window).on('resize', function () {
    // 리사이즈 시 값 재계산
    storyHeight = storySection.outerHeight();
    storyTop = storySection.offset().top;
  });

  checkScroll();



  // product
  const products = {
    perfume: [
      "./img/product1.png",
      "./img/product2.png",
      "./img/product3.png",
      "./img/product4.png"
    ],
    diffuser: [
      "./img/diffuser1.jpg",
      "./img/diffuser1.jpg",
      "./img/diffuser2.jpg",
      "./img/diffuser3.jpg"
    ],
    candle: [
      "./img/candle1.jpg",
      "./img/candle1.jpg",
      "./img/candle2.jpg",
      "./img/candle2.jpg"
    ],
    care: [
      "./img/care1.jpg",
      "./img/care2.jpg",
      "./img/care3.jpg",
      "./img/care4.jpg"
    ]
  };

  // 메뉴 클릭 이벤트
  $(".product_text ul li").click(function () {
    // active 클래스 관리
    $(".product_text ul li").removeClass("active");
    $(this).addClass("active");

    // 클릭한 메뉴의 data-type 읽기
    let type = $(this).data("type");

    // 이미지 교체
    $(".product_img img").each(function (index) {
      $(this).stop(true, true).fadeOut(200, function () {
        $(this).attr("src", products[type][index]).fadeIn(200);
      });
    });
  });



  ///////////////////////
});