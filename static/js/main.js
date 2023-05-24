// header nav menu button

const menubutton = document.querySelector('.menu-button');
const navs = document.querySelector('.nav-content-phone');
const navsa = document.querySelectorAll('.navs a');
const hero = document.querySelector('#hero')
const contactformdata = document.querySelector('.contact-form-data')

let options = {
    root: null,
    rootMargin: '0px -50px 0px 0px',
    threshold: 0.5
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id')
        if (!entry.isIntersecting) {
            return
        }
        navsa.forEach(nav => {
            if (`#${id}` == nav.getAttribute('href')) {
                if (nav.getAttribute('href') == "#contact") {
                    nav.style.background = '#FFFFFF'
                    nav.style.color = '#000000'
                } else if (nav.getAttribute('href') == "#hero") {
                    nav.style.background = ''
                    nav.style.color = ''
                    nav.classList.remove("nav-active")
                } else {
                    nav.classList.add("nav-active")
                }
            } else {
                nav.style.background = ''
                nav.style.color = ''
                nav.classList.remove("nav-active")
            }
        })
    });
}, options)

const sectionid = document.querySelectorAll('section[id]')

sectionid.forEach(section => {
    observer.observe(section)
})

if (navs) {
    menubutton.addEventListener('click', () => {
        navs.classList.toggle('active');
        if (navs.classList.toggle('.active')) {
            menubutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                                    </svg>`
        }
        else {
            menubutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
                                    </svg>`
        }
    });
}

// testimonial slider

const testimonialslider = document.querySelector(".testimonial-slider")
const testimonialcard = document.querySelectorAll(".testimonial-card")
const previousslide = document.querySelector('.prev')
const nextslide = document.querySelector('.next')

let index = 0

slideupdate(index)

previousslide.addEventListener("click", () => {
    if (index === 0) { index = testimonialcard.length }
    index = index -= 1
    slideupdate(index)
})

nextslide.addEventListener("click", () => {
    if (index === testimonialcard.length - 1) { index = -1 }
    index = index += 1
    slideupdate(index)
})

function slideupdate(slidecount) {

    testimonialcard.forEach(slide => {
        slide.classList.remove('active-card')
    })

    testimonialcard[slidecount].classList.add('active-card')
}

// top button

const topbutton = document.querySelector(".top-button")

window.addEventListener("scroll", () => {
    if (window.scrollY > hero.clientHeight) {
        topbutton.style.display = "block"
    } else {
        topbutton.style.display = "none"
    }
})

topbutton.style.display = "none"

topbutton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// contact form 

const contactformbutton = document.querySelector(".contact-form-button")
const loading = document.querySelector(".loading")


contactformdata.addEventListener("submit", (e) => {
    e.preventDefault()

    contactformbutton.innerHTML = `<div class="loading"></div>`
    contactformbutton.setAttribute('disabled', '')

    const formdata = new FormData(contactformdata)

    const headersoptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    }

    fetch('https://jsonplaceholder.typicode.com/posts', headersoptions)
        .then(response => {
            if (response.status === 201) {
                contactformbutton.style.background = "var(--lime-green)"
                contactformbutton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg> &nbsp
                Successful
                `
                contactformbutton.removeAttribute('disabled', '')
                setTimeout(() => {
                    contactformbutton.style.background = "var(--royal-blue)"
                    contactformbutton.innerHTML = `Send Message &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>`
                }, 2000)
            } else {
                contactformbutton.style.background = "var(--orange-red)"
                contactformbutton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg> &nbsp
                ${response.status} 
                `
                contactformbutton.removeAttribute('disabled', '')
                setTimeout(() => {
                    contactformbutton.style.background = "var(--royal-blue)"
                    contactformbutton.innerHTML = `Send Message &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>`
                }, 2000)
            }
            return response.json()
        }).then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })

})
