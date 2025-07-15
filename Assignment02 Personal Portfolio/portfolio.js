// Typing Animation with cursor removal
document.addEventListener("DOMContentLoaded", () => {
  const typedName = document.getElementById("typed-name")
  const cursor = document.getElementById("cursor")
  const name = "Chamodi Gunathilaka"
  let i = 0

  function typeWriter() {
    if (i < name.length) {
      typedName.innerHTML += name.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        cursor.style.display = "none"
      }, 1000)
    }
  }

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500)
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".timeline-content, .skill-category, .activity-card, .achievement-card, .project-card, .contact-form",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Initialize progress bar animations
  observeProgressBars()

  // Initialize contact form handling
  handleContactForm()

  // Add smooth hover effects for cards
  const cards = document.querySelectorAll(".activity-card, .achievement-card, .project-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })
})

// Animate progress bars when they come into view
const observeProgressBars = () => {
  const progressBars = document.querySelectorAll(".progress-bar")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"
          setTimeout(() => {
            progressBar.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => observer.observe(bar))
}

// Contact form handling
const handleContactForm = () => {
  const form = document.querySelector(".contact-form")
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitBtn.disabled = true

      try {
        const response = await fetch("contact.php", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (response.ok && result.success) {
          showNotification("Message sent successfully! I'll get back to you soon.", "success")
          form.reset()
        } else {
          showNotification(result.error || "Failed to send message. Please try again.", "error")
        }
      } catch (error) {
        showNotification("Network error. Please check your connection and try again.", "error")
      } finally {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }
    })
  }
}

// Notification system
const showNotification = (message, type) => {
  // Remove existing notification
  const existing = document.querySelector(".notification")
  if (existing) existing.remove()

  const notification = document.createElement("div")
  notification.className = `notification alert alert-${type === "success" ? "success" : "danger"} alert-dismissible fade show`
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `

  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Mobile menu close on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse
      new bsCollapse(navbarCollapse).hide()
    }
  })
})
