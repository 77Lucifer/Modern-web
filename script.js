
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

let crsr = document.querySelector(".cursur")
let body = document.querySelector('body')
let loading = document.querySelector('.loading h1')
let tl = gsap.timeline()
let outtime;


function crsrback() {

    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;

    body.addEventListener("mousemove", (dets) => {
        clearTimeout(outtime)

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - xprev)

        xprev = dets.clientX;
        yprev = dets.clientY;
        mousecrsr(xscale, yscale)

        outtime = setTimeout(() => {
            crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function mousecrsr(xscale, yscale) {
    window.addEventListener("mousemove", (dets) => {
        crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

function loadingfunc() {
    let a = 0


    function load() {
        setInterval(() => {
            if (a < 100) {
                a = a + Math.floor(Math.random() * 25);
                loading.innerHTML = a + '%';
            } else {
                a = 100;
                loading.innerHTML = a + '%';
            }
        }, 150);

    }

    tl.to('.loading h1', {
        top: '-100vh',
        delay: 1,
        duration: 1,
        onStart: load()
    })


    tl.to('.loading', {
        top: '-100vh',
        duration: 1,
        onStart: load()
    })




}

function page1animt() {
    tl.from('.nav', {
        y: 40,
        opacity: 0,

    })
    tl.to('.boundingelem', {
        y: 0,
        duration: 1,
        stagger: 0.3
    })
    tl.from('.p1-left,.p1-right', {
        y: -40,
        opacity: 0,
    })
}

function picturemove() {
    document.querySelectorAll('.box').forEach(function (box) {
        let rotate = 0;
        let difrot = 0;
            box.addEventListener("mousemove", function (dets) {
                let diff = dets.clientY - box.getBoundingClientRect().top;
                difrot = dets.clientX - rotate;
                rotate = dets.clientX
                gsap.to(box.querySelector('img'), {
                    opacity: 1,
                    top: diff - 100 + 'px',
                    ease: Power3,
                    left: dets.clientX - 100 + 'px',
                    rotate: gsap.utils.clamp(-20,20,difrot)*0.5,
                })
                gsap.to(box.querySelector('h1'),{
                    x: 30,
                    color:'rgba(122, 115, 115, 0.711)'
                })
            })
            box.addEventListener('mouseleave',()=>{
                gsap.to(box.querySelector('img'),{
                    opacity: 0,
                })
                gsap.to(box.querySelector('h1'),{
                    x: 0,
                    color:''
                })
            })
        })
}


picturemove();
mousecrsr();
crsrback();
loadingfunc();
page1animt();