<template>
<Transition name="slide-fade">
  <div v-if="visibleNavHeader" id="nav-container">
        <div id="nav-header">
            <div id="logo" class="shadow">
            <span class="main-text">Юдкевич</span>
            <span class="sub-text">Павел</span>
        </div>
        <div class="filler"></div>
        <div class="filler"></div>
            <button @click="toggleMenu" :class="isActiveMenu"  class="hamburger-toggle" aria-label="Toggle menu">
                <span class="hamburger-bar top"></span>
                <span class="hamburger-bar middle"></span>
                <span class="hamburger-bar bottom"></span>
            </button>
        </div>
    <Transition name="slide-fade" :css="!skipAnimation">
      <nav v-if="menuActive">
        <RouterLink @click="toggleMenu" active-class="highlight" to="/">Home</RouterLink>
        <RouterLink @click="toggleMenu" active-class="highlight" to="/chart">Chart</RouterLink>
      </nav>
    </Transition>
    <div id="nav-bar-spacing"></div>
  </div>
</Transition>
</template>

<script lang="ts" setup>
// declare imports
import { RouterLink } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
// declare variables
const menuActive = ref(false)
const isActiveMenu = ref('')
const visibleNavHeader = ref(true)
const skipAnimation = ref(false)
const yScroll = ref(0)
// toggle menu animation
const toggleMenu = () => {
    if (menuActive.value === false) {
        isActiveMenu.value = 'is-active'
    } else if (menuActive.value === true && window.innerWidth > 768) {
        return
    } else {
        isActiveMenu.value = ''
    }
    menuActive.value = !menuActive.value
}
// hide and show menu depending on scroll direction
const handleScroll = () => {
  // Add logic here based on yScroll.value
  if (yScroll.value > window.scrollY) {
    visibleNavHeader.value = true
  } else {
    visibleNavHeader.value = false
  }
  yScroll.value = window.scrollY;
}
// adjust layout according to screen width function
const adjustLayout = () => {
    if (window.innerWidth > 768) {
        menuActive.value = true
        if (isActiveMenu.value == 'is-active') {
          isActiveMenu.value = ''
        }
    } else {
        skipAnimation.value = true
        menuActive.value = false
        if (isActiveMenu.value == 'is-active') {
          isActiveMenu.value = ''
        }
        // Reset after transition finishes if necessary
        setTimeout(() => { skipAnimation.value = false; }, 0);
    }
}
// set event listeners and launch layout adjustment functions
onMounted(() => {
    adjustLayout()
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', adjustLayout);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="css" scoped>
#nav-container {
    position: relative;
}
#nav-header {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--secondary-color);
  height: 4rem;
  background-color: white;
}
nav a {
  display: block;
  padding: 1rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid var(--secondary-color);
}
nav {
  position: fixed;
  width: 100%;
  top: 4rem;
  left: 0;
  background-color: white;
}
#nav-bar-spacing {
  height: 5rem;
}
#logo {
    font-size: 1.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    padding: 0.5rem;
    height: 2rem;
    box-shadow: 1px 1px 2px 1px gray;
}
.main-text {
    font-weight: 900;
}
.sub-text {
    font-weight: 300; 
}
.hamburger-toggle {
  /* Basic styling for the button container */
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 1.5rem; /* Adjust height based on bar height and spacing */
  padding: 0;
  position: relative;
}
.hamburger-bar {
  /* Styling for the bars */
  display: block;
  width: 100%;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: all 0.3s ease-in-out; /* Smooth transition for all changes */
}
/* Active state animation for hanburger menu */
.hamburger-toggle.is-active .hamburger-bar.middle {
  background-color: transparent; /* Hide the middle bar */
}
.hamburger-toggle.is-active .hamburger-bar.top {
  transform: translateY(0.625rem) rotate(45deg); /* Move top bar to center and rotate */
}
.hamburger-toggle.is-active .hamburger-bar.bottom {
  transform: translateY(-0.625rem) rotate(-45deg); /* Move bottom bar to center and rotate */
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.highlight::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s;
    position: absolute;
    bottom: -2px;
    left: 0;
}
@media screen and (min-width:768px) {
    #nav-header,
    nav {
        position: static;
        background-color: transparent;
        display: inline-block;
        width: 100%;
    }
    #nav-header {
        width: auto;
    }
    #nav-bar-spacing,
    .hamburger-toggle {
        display: none;
    }
    #nav-container {
        display: flex;
        align-items: center;
        height: 4rem;
        border-bottom: 1px solid var(--secondary-color);
        margin-bottom: 1rem;
    }
    nav a {
        display: inline-block;
        background-color: transparent;
        border: none;
    }
    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }
}
</style>