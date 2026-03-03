$(function () {

  /* =====================
     HEADER
  ===================== */
  function headerToggle() {
    if ($(window).scrollTop() > $(".intro").height()) {
      $("header").fadeIn();
    } else {
      $("header").fadeOut();
    }
  }
  $(window).on("scroll", headerToggle);
  headerToggle(); // 진입 시 1회 적용


  /* =====================
     SIDEBAR
  ===================== */
  $("#hamburgerBtn").on("click", openSidebar);
  $("#closeBtn, #sidebarOverlay").on("click", closeSidebar);

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  $(".menu-item, .submenu-item").on("click", function () {
    closeSidebar();
  });

  $(window).on("resize", closeSidebar);

  function openSidebar() {
    $("#sidebar").addClass("active");
    $("#sidebarOverlay").addClass("active");
    $("body").css("overflow", "hidden");
  }

  function closeSidebar() {
    $("#sidebar").removeClass("active");
    $("#sidebarOverlay").removeClass("active");
    // intro 잠금이 걸려있으면 auto로 풀면 안됨 → 클래스 기준으로 복구
    if ($("body").hasClass("intro-lock")) return;
    $("body").css("overflow", "auto");
  }


  /* =====================
     INTRO (첫 스크롤/터치로 reveal 후 스크롤 해제)
  ===================== */
  $(".intro").addClass("show");

  let introUnlocked = false;
  let introAnimating = false;

  function lockIntroScroll() {
    $("body").addClass("intro-lock").css("overflow", "hidden");
  }

  function unlockIntroScroll() {
    $("body").removeClass("intro-lock").css("overflow", "auto");
  }

  function revealIntro() {
    if (introUnlocked || introAnimating) return;

    introAnimating = true;
    $(".intro").addClass("reveal");

    setTimeout(function () {
      introUnlocked = true;
      introAnimating = false;

      unlockIntroScroll();
      detachIntroEvents();
    }, 950);
  }

  // 이벤트 핸들러 (named function으로 만들어서 제거 가능하게)
  function onIntroWheel(e) {
    if (introUnlocked) return;
    e.preventDefault();
    if (e.deltaY > 0) revealIntro();
  }

  function onIntroTouchMove(e) {
    if (introUnlocked) return;
    e.preventDefault();
    revealIntro();
  }

  function onIntroClick() {
    if (introUnlocked) return;
    revealIntro();
  }

  function attachIntroEvents() {
    lockIntroScroll();

    if ($(window).width() > 1024) {
      window.addEventListener("wheel", onIntroWheel, { passive: false });
    } else {
      window.addEventListener("touchmove", onIntroTouchMove, { passive: false });
      $(window).on("click", onIntroClick);
    }
  }

  function detachIntroEvents() {
    window.removeEventListener("wheel", onIntroWheel, { passive: false });
    window.removeEventListener("touchmove", onIntroTouchMove, { passive: false });
    $(window).off("click", onIntroClick);
  }

  attachIntroEvents();


  /* =====================
     PRODUCT (탭 이미지 교체)
  ===================== */
  const products = {
    perfume: ["./img/product1.png", "./img/product2.png", "./img/product3.png", "./img/product4.png"],
    diffuser: ["./img/diffuser1.jpg", "./img/diffuser1.jpg", "./img/diffuser2.jpg", "./img/diffuser3.jpg"],
    candle: ["./img/candle1.jpg", "./img/candle1.jpg", "./img/candle2.jpg", "./img/candle2.jpg"],
    care: ["./img/care1.jpg", "./img/care2.jpg", "./img/care3.jpg", "./img/care4.jpg"]
  };

  $(".product_text ul li").on("click", function () {
    $(".product_text ul li").removeClass("active");
    $(this).addClass("active");

    const type = $(this).data("type");

    $(".product_img img").each(function (index) {
      $(this).stop(true, true).fadeOut(200, function () {
        $(this).attr("src", products[type][index]).fadeIn(200);
      });
    });
  });

  /* =====================
   STORY (PC scroll switch)
===================== */
const $story = $('.story');
const $imgs = $('.story_img .imgbox');
const imgCount = $imgs.length;

function handleStoryScroll() {
  if (!$story.length) return;

  const scrollTop = $(window).scrollTop();
  const winH = $(window).height();

  const start = $story.offset().top;
  const end = start + $story.outerHeight() - winH;

  if (end <= start) return activate(0);

  if (scrollTop <= start) return activate(0);
  if (scrollTop >= end) return activate(imgCount - 1);

  const progress = (scrollTop - start) / (end - start);
  const index = Math.floor(progress * imgCount);

  activate(index);
}

function activate(index) {
  index = Math.max(0, Math.min(index, imgCount - 1));
  $imgs.removeClass('active');
  $imgs.eq(index).addClass('active');
}

function setStoryMode() {
  const isMobilePad = window.innerWidth <= 1024;

  $(window).off('scroll.story resize.story');

  if (isMobilePad) {
    // 1024 이하: 전환 OFF, 전부 표시
    $imgs.addClass('active');
  } else {
    // 1025 이상: 전환 ON
    $imgs.removeClass('active').eq(0).addClass('active');
    $(window).on('scroll.story resize.story', handleStoryScroll);
    handleStoryScroll();
  }
}

$(window).on('resize', setStoryMode);
setStoryMode();

/////////////////////////////
});