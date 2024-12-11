<template>
  <header>
    <div class="wrapper mr-20">
      <nav class="flex float-end p-5 relative z-10">
        <div
          @mouseenter="displayDocSubMenu = true"
          @mouseleave="displayDocSubMenu = false"
          @click="displayDocSubMenu = true"
          aria-haspopup="true"
          :aria-expanded="displayDocSubMenu"
          aria-label="Documentation menu"
          class="relative"
        >
          <div id="nav-doc" class="cursor-pointer text-amber-700 text-xl font-semibold mb-2">
            Documentation
          </div>
          <div
            id="nav-doc-sub-container"
            class="bg-amber-900/70 py-5 rounded-lg flex flex-col text-white absolute right-0 w-[220px] text-center"
            :aria-hidden="!displayDocSubMenu"
            v-if="displayDocSubMenu"
          >
            <p
              class="cursor-pointer hover:bg-amber-900 py-1"
              @click="goToGithubPage('installation')"
              aria-label="How to install VueOnboardingTour"
            >
              How to install
            </p>
            <p
              class="cursor-pointer hover:bg-amber-900 py-1"
              @click="goToGithubPage('documentation')"
              aria-label="View online documentation for VueOnboardingTour"
            >
              Online Documentation
            </p>
            <p
              class="cursor-pointer hover:bg-amber-900 py-1"
              @click="goToStoryBook"
              aria-label="Explore VueOnboardingTour Storybook"
            >
              Storybook
            </p>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <main class="flex h-full flex-col">
    <div class="flex h-[calc(100vh_-_304px)] 2xl:h-[calc(100vh_-_424px)]">
      <div class="absolute top-0 left-0 h-[calc(100vh_-_124px)] 2xl:h-[calc(100vh_-_224px)] w-full">
        <div class="area">
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div
        class="pb-[5rem] px-[5rem] 2xl:px-[10rem] 2xl:pb-[10rem] w-full h-full relative flex justify-center"
      >
        <div class="w-full h-full relative max-w-[1600px]">
          <div
            class="bg-[url('logo.png')] bg-cover w-[470px] h-[80px] absolute z-10 cursor-grab"
            @mousedown="startDragging(itemsFrame[0])"
            :style="itemsFrame[0].style"
          ></div>
          <div
            class="absolute h-40 z-30 -rotate-90 cursor-pointer bg-[url('arrow-down.png')] bg-contain w-[95px]"
            @mousedown="startDragging(itemsFrame[1])"
            :style="itemsFrame[1].style"
            @click="handleClickArrow"
          ></div>
          <div
            class="absolute -rotate-90 cursor-pointer bg-[url('plus-icon.webp')] bg-contain w-[83px] h-[93px] z-30"
            @mousedown="startDragging(itemsFrame[2])"
            @click="toggleOverlay"
            :style="itemsFrame[2].style"
          ></div>
          <VueDragPlayground
            class="frame w-full h-full bg-white/70 rounded-xl outline-black outline-[3px] outline"
            @drag-start="handleDragStart"
            @drag-end="handleDragEnd"
            v-bind="propsPlayground"
            v-model="itemsPlayground"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-[url('bgCurved.svg')] bg-cover py-[100px] 2xl:py-[200px] -mt-[3rem] 2xl:-mt-[5rem] z-[20] min-h-[800px]"
    >
      <div class="w-full text-center flex gap-10 flex-col px-10 max-w-[1600px] mx-auto mb-[100px]">
        <h1 class="header text-4xl 2xl:text-5xl">
          Take Control of your UI with <b>VueDragPlayground</b>
        </h1>
        <h2 class="text-2xl 2xl:text-3xl">
          <i
            ><b>VueDragPlayground</b> is a free Vue.js library for creating interactive,
            customizable elements. <br />
            Drop your components into the playground, and the library do the rest to enable drag,
            resize, and rotate functionality, whether for a single item or multiple at once.
          </i>
        </h2>
      </div>
      <div class="flex gap-[100px] px-10 max-w-[1600px] mx-auto lg:flex-row flex-col">
        <div>
          <h3 class="header text-xl 2xl:text-2xl mb-3">Simple Setup, Instant Interaction</h3>
          <span class="text-lg 2xl:text-xl">
            "VueDragPlayground allows you to easily create interactive elements. Simply drop your
            components into the playground, and they’re ready to be dragged, resized, or rotated
            instantly—no complex setup required."
          </span>
        </div>
        <div>
          <h3 class="header text-xl 2xl:text-2xl mb-3">Highly Customizable Playground</h3>
          <span class="text-lg 2xl:text-xl">
            The playground itself is fully customizable, enabling you to adjust its behavior and
            appearance to suit your needs. Fine-tune settings like layout, controls, and interaction
            modes, ensuring the environment fits perfectly with your design goals.
          </span>
        </div>
        <div>
          <h3 class="header text-xl 2xl:text-2xl mb-3">
            Smooth, Performance-Optimized Interaction
          </h3>
          <span class="text-lg 2xl:text-xl">
            Enjoy smooth, responsive interactions even with multiple elements. VueDragPlayground
            includes performance optimizations like event throttling to ensure that dragging,
            resizing, and rotating remain fluid and efficient, even with complex or numerous
            components.
          </span>
        </div>
      </div>
    </div>
  </main>

  <!-- Overlay Modal -->
  <div
    v-if="isOverlayVisible"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[600px]">
      <h2 class="text-2xl font-semibold mb-4 text-center">Add your message to the Playground</h2>
      <div class="relative">
        <img src="../public/chat-box.png" />
        <textarea
          type="text"
          v-model="message"
          placeholder="Enter your message"
          class="absolute top-[18%] left-[11%] break-all w-[78%] h-[60%] rounded-md p-2 mb-4 focus:outline-none bg-transparent text-[2em]"
        ></textarea>
      </div>
      <div class="flex justify-between">
        <button
          :disabled="message.length <= 0"
          :class="
            message.length > 0 ? 'border-green-500 hover:border-green-600' : 'border-gray-500'
          "
          @click="handleAddItem"
          class="text-gray-500 py-2 px-4 rounded-md border-2"
        >
          Add
        </button>
        <button
          @click="toggleOverlay"
          class="border-red-500 hover:border-red-600 text-gray-500 border-2 py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <footer class="bg-amber-900 -mt-10">
    <div class="flex text-white h-[150px] gap-10 px-10 max-w-[1600px] mx-auto items-center pt-10">
      <p
        class="cursor-pointer hover:bg-amber-900 py-1"
        @click="goToGithubPage('installation')"
        aria-label="How to install VueOnboardingTour"
      >
        How to install
      </p>
      <p
        class="cursor-pointer hover:bg-amber-900 py-1"
        @click="goToGithubPage('documentation')"
        aria-label="View online documentation for VueOnboardingTour"
      >
        Online Documentation
      </p>
      <p
        class="cursor-pointer hover:bg-amber-900 py-1"
        @click="goToStoryBook"
        aria-label="Explore VueOnboardingTour Storybook"
      >
        Storybook
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'
type ItemFrame = {
  id: number
  style: { top: string; left: string; transform: string }
  width: number
  height: number
}
type ItemPlayground = {
  name?: string
  html: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
}
const displayDocSubMenu = ref(false)

const itemsPlayground: Ref<ItemPlayground[]> = ref([
  {
    name: 'chat-box',
    html: `<img src="chat-box.png" draggable='false'><textarea readonly  class="absolute top-[18%] left-[11%] break-all w-[78%] h-[60%] bg-transparent outline-none cursor-[inherit] resize-none">Test Test Test Test Test Test Test Testffffffffffffffffff</textarea></img>`,
    x: 550,
    y: 120,
    rotation: -15,
    width: 200,
    height: 200,
  },
  {
    name: 'alien',
    html: "<img src='alien.gif' width='100px' draggable='false'>",
    x: 1050,
    y: 120,
    width: 100,
    height: 100,
  },
  {
    name: 'rocket',
    html: "<img src='rocket.gif' draggable='false'>",
    x: 500,
    y: 500,
    width: 100,
    height: 100,
  },
  {
    name: 'moon',
    html: "<img src='moon.png' width='200px' height:'200px' draggable='false'>",
    x: 1000,
    y: 200,
    width: 200,
    height: 200,
  },
  {
    name: 'saturn',
    html: "<img src='saturn.png' width='300px' height='300px' draggable='false'>",
    x: 100,
    y: 500,
    width: 300,
    height: 300,
  },
  {
    name: 'star',
    html: "<img src='star.gif' width='150px' height='150px' draggable='false'>",
    x: 50,
    y: 900,
    width: 150,
    height: 150,
  },
  {
    name: 'astronaut',
    html: "<img src='astronaut.gif' width='200px' draggable='false'>",
    x: 900,
    y: 700,
    width: 200,
    height: 200,
    rotation: 50,
  },
])
const itemsFrame: Ref<ItemFrame[]> = ref([
  {
    id: 1,
    style: { top: '0px', left: 'calc(50% - 235px)', transform: 'translate(0, -50%)' },
    width: 479,
    height: 80,
  },
  {
    id: 2,
    style: { top: '100%', left: 'calc(50% - 47px)', transform: 'translate(0, -50%)' },
    width: 95,
    height: 160,
  },
  {
    id: 3,
    style: { top: 'calc(50% - 46px)', left: '100%', transform: 'translate(-50%, 0)' },
    width: 83,
    height: 93,
  },
])
const isDragging = ref(false) // Tracks if dragging is active
const frameDraggingItemId: Ref<null | number> = ref(null)
const frameDimensions = ref({ width: 0, height: 0 }) // Frame dimensions for boundary calculations
const isOverlayVisible = ref(false)
const message = ref('')

//COMPUTED
const propsPlayground = computed(() => ({
  isDrag: true,
  isRotate: true,
  isResize: true,
  isCopy: true,
  isDelete: true,
}))

//METHODS
const goToGithubPage = (hash: string) => {
  window.open(`https://github.com/acTechWorld/vue-drag-playground?tab=readme-ov-file#${hash}`)
}
const goToStoryBook = () => {
  window.open(
    `https://vueonboardingtour.storybook.actechworld.com/?path=/story/lib-components-vueonboardingtour--default`,
  )
}

const handleDragStart = (item) => {
  itemsPlayground.value = itemsPlayground.value.map((it) =>
    it.name === item.name && it.id === item.id
      ? {
          ...item,
          html: ['astronaut', 'alien'].includes(item.name)
            ? item.html.replace(/(<img[^>]*src=')[^']*(')/i, `$1${item.name}_dragging.gif$2`)
            : item.html,
        }
      : it,
  )
}
const handleDragEnd = (item) => {
  itemsPlayground.value = itemsPlayground.value.map((it) =>
    it.name === item.name && it.id === item.id
      ? {
          ...item,
          html: ['astronaut', 'alien'].includes(item.name)
            ? item.html.replace(/(<img[^>]*src=')[^']*(')/i, `$1${item.name}.gif$2`)
            : item.html,
        }
      : it,
  )
}
const startDragging = (item: ItemFrame) => {
  isDragging.value = true

  // Add event listeners for dragging
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDragging)
  frameDraggingItemId.value = item.id
  // Cache frame dimensions
  const frame = document.querySelector('.frame')?.getBoundingClientRect()
  if (frame) {
    frameDimensions.value = { width: frame.width, height: frame.height }
  }
}

const drag = (event: MouseEvent) => {
  const frame = document.querySelector('.frame')?.getBoundingClientRect()
  const item = itemsFrame.value.find((item) => item.id === frameDraggingItemId.value)
  if (!isDragging.value || !frame || !item) return

  const mouseX = event.clientX - frame.left // Mouse X relative to frame
  const mouseY = event.clientY - frame.top // Mouse Y relative to frame
  const { width, height } = frameDimensions.value

  // Determine the closest side
  const distances = {
    top: mouseY,
    right: width - mouseX,
    bottom: height - mouseY,
    left: mouseX,
  }

  const closestSide = Object.keys(distances).reduce((a, b) => (distances[a] < distances[b] ? a : b))

  // Update the logo position such that its center aligns with the border
  if (closestSide === 'top') {
    item.style.top = `0px`
    item.style.left = `${Math.max(-item.width / 2, Math.min(mouseX - item.width / 2, width - item.width / 2))}px`
    item.style.transform = 'translate(0, -50%)'
  } else if (closestSide === 'right') {
    item.style.top = `${Math.max(-item.height / 2, Math.min(mouseY - item.height / 2, height - item.height / 2))}px`
    item.style.left = `${width - item.width}px`
    item.style.transform = 'translate(50%, 0)'
  } else if (closestSide === 'bottom') {
    item.style.top = `${height - item.height}px`
    item.style.left = `${Math.max(-item.width / 2, Math.min(mouseX - item.width / 2, width - item.width / 2))}px`
    item.style.transform = 'translate(0, 50%)'
  } else if (closestSide === 'left') {
    item.style.top = `${Math.max(-item.height / 2, Math.min(mouseY - item.height / 2, height - item.height / 2))}px`
    item.style.left = `0px`
    item.style.transform = 'translate(-50%, 0)'
  }
}

const stopDragging = () => {
  isDragging.value = false
  frameDraggingItemId.value = null
  // Remove event listeners when dragging ends
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDragging)
}

const toggleOverlay = () => {
  isOverlayVisible.value = !isOverlayVisible.value
  if (message.value) message.value = ''
}

const handleAddItem = () => {
  const frameRect = document.querySelector('.frame')?.getBoundingClientRect()
  console.log(frameRect)
  if (frameRect) {
    itemsPlayground.value.push({
      name: 'message-1',
      html: `<img
      draggable='false'
          src="chat-box.png"
        >
          <textarea readonly class="absolute top-[18%] left-[11%] break-all w-[78%] h-[60%] bg-transparent outline-none cursor-[inherit] resize-none">${message.value}</textarea>
        </img>`,
      x: Math.random() * (frameRect.width - 300),
      y: Math.random() * (frameRect.height - 300),
      rotation: Math.random() * (45 - -45) + -45,
      width: 200,
      height: 200,
    })
  }
  toggleOverlay()
}

const handleClickArrow = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}
onMounted(() => {
  // Cleanup listeners in case of unmounting
  document.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDragging)
})
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');
@import url('https://db.onlinewebfonts.com/c/589aea3c60e04505f023550504709883?family=Hobeaux');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
main {
  font-family: 'Poppins', sans-serif;
}
.header {
  font-family: 'Hobeaux', sans-serif;
}
.vue-drag-playground .resize_btn_container div {
  background-color: #00000050;
}
.context {
  width: 100%;
  position: absolute;
  top: 50vh;
}

.context h1 {
  text-align: center;
  color: #fff;
  font-size: 50px;
}

.area {
  background: #fff5e6;
  background: -webkit-linear-gradient(to left, #fff5e6, #fff5e6);
  width: 100%;
  height: 100%;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  background-color: blue;
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  background-color: green;
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  background-color: purple;
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  background-color: red;
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  background-color: yellow;
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  background-color: red;
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  background-color: pink;
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  background-color: black;
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  background-color: rgb(226, 192, 255);
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  background-color: brown;
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
