<template>
  <header>
    <div class="wrapper lg:mr-20">
      <nav class="flex float-end p-5 relative z-50">
        <div
          @mouseenter="displayDocSubMenu = true"
          @mouseleave="displayDocSubMenu = false"
          @click="displayDocSubMenu = !displayDocSubMenu"
          aria-haspopup="true"
          :aria-expanded="displayDocSubMenu"
          aria-label="Documentation menu"
          class="relative"
        >
          <div id="nav-doc" class="cursor-pointer text-red-700 text-xl font-semibold mb-2">
            Documentation
          </div>
          <div
            id="nav-doc-sub-container"
            class="bg-red-900 py-5 rounded-lg flex flex-col text-white absolute right-0 w-[220px] text-center"
            :aria-hidden="!displayDocSubMenu"
            v-if="displayDocSubMenu"
          >
            <p
              class="cursor-pointer hover:bg-red-700 py-1"
              @click="goToGithubPage('installation')"
              aria-label="How to install VueOnboardingTour"
            >
              How to install
            </p>
            <p
              class="cursor-pointer hover:bg-red-700 py-1"
              @click="goToGithubPage('documentation')"
              aria-label="View online documentation for VueOnboardingTour"
            >
              Online Documentation
            </p>
            <p
              class="cursor-pointer hover:bg-red-700 py-1"
              @click="goToStoryBook"
              aria-label="Explore VueOnboardingTour Storybook"
            >
              Storybook
            </p>
            <a
              class="cursor-pointer hover:bg-red-700 py-1"
              target="_blank"
              href="https://www.linkedin.com/in/antoine-canard/"
              >My Linkedin</a
            >
          </div>
        </div>
      </nav>
    </div>
  </header>

  <main class="flex h-full flex-col">
    <div
      class="flex h-[calc(100vh_-_100px)] lg:h-[calc(100vh_-_304px)] 2xl:h-[calc(100vh_-_424px)]"
    >
      <div
        class="absolute top-0 left-0 h-[calc(100vh)] lg:h-[calc(100vh_-_204px)] 2xl:h-[calc(100vh_-_254px)] w-full"
      >
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
        class="pb-[5rem] px-8 lg:px-[5rem] 2xl:px-[10rem] 2xl:pb-[10rem] w-full h-full relative flex justify-center"
      >
        <div class="w-full h-full relative max-w-[1600px]">
          <div
            class="itemFrame1 bg-[url('/logo.png')] bg-cover w-[220px] h-[35px] lg:w-[390px] lg:h-[65px] 2xl:w-[470px] 2xl:h-[80px] absolute z-10 cursor-grab"
            @mousedown="startDragging(itemsFrame[0])"
            :style="itemsFrame[0].style"
          ></div>
          <div
            class="itemFrame2 absolute z-30 -rotate-90 cursor-pointer bg-[url('/arrow-down.png')] bg-contain h-[100px] w-[60px] lg:h-[120px] lg:w-[71px] 2xl:w-[95px] 2xl:h-40"
            @mousedown="startDragging(itemsFrame[1])"
            :style="itemsFrame[1].style"
            @click="handleClickArrow"
          ></div>
          <div
            class="itemFrame3 absolute -rotate-90 cursor-pointer bg-[url('/plus-icon.webp')] bg-contain w-[58px] h-[65px] lg:w-[70px] lg:h-[79px] 2xl:w-[83px] 2xl:h-[93px] z-30"
            @mousedown="startDragging(itemsFrame[2])"
            @click="toggleOverlay"
            :style="itemsFrame[2].style"
          ></div>
          <VueDragPlayground
            ref="playground"
            @touchstart.prevent
            @touchmove.prevent
            @touchend.prevent
            class="frame overflow-hidden w-full h-full bg-white/70 rounded-xl outline-black outline-[3px] outline"
            @drag-start="handleDragStart"
            @drag-end="handleDragEnd"
            v-bind="propsPlayground"
            v-model="itemsPlayground"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-[url('/bgCurved.svg')] bg-cover py-[100px] 2xl:py-[200px] -mt-[3rem] 2xl:-mt-[5rem] z-[20] min-h-[800px]"
    >
      <div
        class="w-full text-center flex gap-10 flex-col px-3 sm:px-10 max-w-[1600px] mx-auto mb-12 lg:mb-[100px]"
      >
        <h1 class="header text-3xl lg:text-4xl 2xl:text-5xl text-red-900">
          Take Control of your UI with <b class="text-red-900">VueDragPlayground</b>!
        </h1>
        <h2 class="text-xl lg:text-2xl 2xl:text-3xl">
          <i
            ><b>VueDragPlayground</b> is a free Vue.js library for creating interactive,
            customizable elements. <br />
            Drop your components into the playground, and the library do the rest to enable drag,
            resize, and rotate functionality, whether for a single item or multiple at once.
          </i>
        </h2>
      </div>
      <div
        class="flex gap-12 lg:gap-[100px] px-3 sm:px-10 max-w-[1600px] mx-auto lg:flex-row flex-col"
      >
        <div>
          <h3 class="header text-lg lg:text-xl 2xl:text-2xl mb-3">
            Simple Setup, Instant Interaction
          </h3>
          <span class="lg:text-lg 2xl:text-xl">
            "VueDragPlayground allows you to easily create interactive elements. Simply drop your
            components into the playground, and they’re ready to be dragged, resized, or rotated
            instantly—no complex setup required."
          </span>
        </div>
        <div>
          <h3 class="header text-lg lg:text-xl 2xl:text-2xl mb-3">
            Highly Customizable Playground
          </h3>
          <span class="lg:text-lg 2xl:text-xl">
            The playground itself is fully customizable, enabling you to adjust its behavior and
            appearance to suit your needs. Fine-tune settings like layout, controls, and interaction
            modes, ensuring the environment fits perfectly with your design goals.
          </span>
        </div>
        <div>
          <h3 class="header text-lg lg:text-xl 2xl:text-2xl mb-3">
            Smooth, Performance-Optimized Interaction
          </h3>
          <span class="lg:text-lg 2xl:text-xl">
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
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-5"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-[600px]">
      <h2 class="text-2xl font-semibold mb-4 text-center">Add your message to the Playground</h2>
      <div class="relative">
        <img src="../public/chat-box.png" />
        <textarea
          type="text"
          v-model="message"
          placeholder="Enter your message"
          class="absolute top-[18%] left-[11%] break-all w-[78%] h-[60%] rounded-md p-2 mb-4 focus:outline-none bg-transparent text-[2em]"
        >
        ></textarea
        >
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
  <footer class="bg-amber-900 -mt-12 lg:-mt-10">
    <div
      class="flex gap-5 pb-10 lg:pb-0 flex-col lg:flex-row lg:justify-between text-white lg:h-[150px] px-10 max-w-[1600px] mx-auto items-center pt-20 lg:pt-10"
    >
      <div class="flex gap-5 sm:gap-10 sm:flex-row flex-col w-full sm:!w-auto items-center">
        <p
          class="cursor-pointer"
          @click="goToGithubPage('installation')"
          aria-label="How to install VueOnboardingTour"
        >
          How to install
        </p>
        <p
          class="cursor-pointer"
          @click="goToGithubPage('documentation')"
          aria-label="View online documentation for VueOnboardingTour"
        >
          Online Documentation
        </p>
        <p
          class="cursor-pointer"
          @click="goToStoryBook"
          aria-label="Explore VueOnboardingTour Storybook"
        >
          Storybook
        </p>
      </div>
      <div class="flex gap-5 sm:gap-10 sm:flex-row flex-col w-full sm:!w-auto items-center">
        <a class="flex gap-10" target="_blank" href="https://www.linkedin.com/in/antoine-canard/"
          >My Linkedin</a
        >
        <a class="flex gap-10" target="_blank" href="https://github.com/acTechWorld">My Github</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref, computed, onMounted, onBeforeUnmount, type Ref, type ComputedRef } from 'vue'
import { VueDragPlayground, type DraggableItem } from 'vue-drag-playground'
type ItemFrame = {
  id: number
  style: { top: string; left: string; transform: string }
}
type ItemSize = {
  id: number
  width: number
  height: number
}
type ItemPlayground = {
  id?: number
  name?: string
  html: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
}
const displayDocSubMenu = ref(false)
const { width } = useWindowSize()
const isSmallScreen = computed(() => width.value < 1536)
const isMobileScreen = computed(() => width.value < 1024)
const playground = ref(null)
const itemsPlayground: Ref<ItemPlayground[]> = ref([
  {
    name: 'chat-box',
    html: `<img src="chat-box.png" draggable='false'><p class="absolute overflow-scroll select-none top-[18%] left-[11%] break-all w-[78%] h-[60%] bg-transparent outline-none cursor-[inherit] resize-none">Take Control of your UI with VueDragPlayground!</p></img>`,
    x: 550,
    y: 120,
    rotation: -15,
    width: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
    height: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
  },
  {
    name: 'alien',
    html: "<img src='alien.gif' width='100px' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 1050,
    y: 120,
    width: isMobileScreen.value ? 50 : isSmallScreen.value ? 75 : 100,
    height: isMobileScreen.value ? 50 : isSmallScreen.value ? 75 : 100,
  },
  {
    name: 'rocket',
    html: "<img src='rocket.gif' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 500,
    y: 500,
    width: isMobileScreen.value ? 50 : isSmallScreen.value ? 75 : 100,
    height: isMobileScreen.value ? 50 : isSmallScreen.value ? 75 : 100,
  },
  {
    name: 'moon',
    html: "<img src='moon.png' width='200px' height:'200px' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 1000,
    y: 200,
    width: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
    height: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
  },
  {
    name: 'saturn',
    html: "<img src='saturn.png' width='300px' height='300px' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 100,
    y: 500,
    width: isMobileScreen.value ? 150 : isSmallScreen.value ? 220 : 300,
    height: isMobileScreen.value ? 150 : isSmallScreen.value ? 220 : 300,
  },
  {
    name: 'star',
    html: "<img src='star.gif' width='150px' height='150px' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 50,
    y: 900,
    width: isMobileScreen.value ? 75 : isSmallScreen.value ? 120 : 150,
    height: isMobileScreen.value ? 75 : isSmallScreen.value ? 120 : 150,
  },
  {
    name: 'astronaut',
    html: "<img src='astronaut.gif' width='200px' draggable='false'><p class='absolute top-0 left-0 w-full select-none h-full'></p></img>",
    x: 900,
    y: 700,
    width: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
    height: isMobileScreen.value ? 100 : isSmallScreen.value ? 150 : 200,
    rotation: 50,
  },
])

const itemsFrame: Ref<ItemFrame[]> = ref([
  {
    id: 1,
    style: {
      top: '0px',
      left: `calc(50% - ${isMobileScreen.value ? 110 : isSmallScreen.value ? 195 : 235}px)`,
      transform: 'translate(0, -50%)',
    },
  },
  {
    id: 2,
    style: {
      top: '100%',
      left: `calc(50% - ${isMobileScreen.value ? 30 : isSmallScreen.value ? 35 : 47}px)`,
      transform: 'translate(0, -50%)',
    },
  },
  {
    id: 3,
    style: {
      top: `calc(50% - ${isMobileScreen.value ? 32 : isSmallScreen.value ? 39 : 46}px)`,
      left: '100%',
      transform: 'translate(-50%, 0)',
    },
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

const isSmallScreenComputed = computed(() => width.value < 1536)
const isMobileScreenComputed = computed(() => width.value < 1024)

const itemsFrameSize: ComputedRef<ItemSize[]> = computed(() => [
  {
    id: 1,
    width: isMobileScreenComputed.value ? 220 : isSmallScreenComputed.value ? 390 : 470,
    height: isMobileScreenComputed.value ? 35 : isSmallScreenComputed.value ? 65 : 80,
  },
  {
    id: 2,
    width: isMobileScreenComputed.value ? 60 : isSmallScreenComputed.value ? 71 : 95,
    height: isMobileScreenComputed.value ? 100 : isSmallScreenComputed.value ? 120 : 160,
  },
  {
    id: 3,
    width: isMobileScreenComputed.value ? 58 : isSmallScreenComputed.value ? 70 : 83,
    height: isMobileScreenComputed.value ? 65 : isSmallScreenComputed.value ? 79 : 93,
  },
])
//METHODS
const goToGithubPage = (hash: string) => {
  window.open(`https://github.com/acTechWorld/vue-drag-playground?tab=readme-ov-file#${hash}`)
}
const goToStoryBook = () => {
  window.open(
    `https://vuedragplayground.storybook.actechworld.com/?path=/story/lib-components-vuedragplayground--default`,
  )
}

const handleDragStart = (item: DraggableItem) => {
  itemsPlayground.value = itemsPlayground.value.map((it) =>
    it.name === item.name && it.id && it.id === item.id
      ? {
          ...item,
          html: ['astronaut', 'alien'].includes(item.name ?? '')
            ? item.html.replace(/(<img[^>]*src=')[^']*(')/i, `$1${item.name}_dragging.gif$2`)
            : item.html,
        }
      : it,
  )
}
const handleDragEnd = (item: DraggableItem) => {
  itemsPlayground.value = itemsPlayground.value.map((it) =>
    it.name === item.name && it.id === item.id
      ? {
          ...item,
          html: ['astronaut', 'alien'].includes(item.name ?? '')
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
  const frameRect = document.querySelector('.frame')?.getBoundingClientRect()
  const item = itemsFrame.value.find((item) => item.id === frameDraggingItemId.value)
  const itemSize = itemsFrameSize.value.find((item) => item.id === frameDraggingItemId.value)
  if (!isDragging.value || !frameRect || !item || !itemSize) return

  mooveItem(item, event.clientX, event.clientY, frameRect, itemSize)
}

const mooveItem = (
  item: ItemFrame,
  clientX: number,
  clientY: number,
  frameRect: DOMRect,
  itemSize: ItemSize,
) => {
  // Determine the closest side
  const mouseX = clientX - frameRect.left // Mouse X relative to frame
  const mouseY = clientY - frameRect.top // Mouse Y relative to frame
  const { width, height } = frameDimensions.value

  // Determine the closest side
  const distances = {
    top: mouseY,
    right: width - mouseX,
    bottom: height - mouseY,
    left: mouseX,
  }
  const closestSide = (Object.keys(distances) as Array<keyof typeof distances>).reduce((a, b) =>
    distances[a] < distances[b] ? a : b,
  )

  // Update the logo position such that its center aligns with the border
  if (closestSide === 'top') {
    item.style.top = `0px`
    item.style.left = `${Math.max(-itemSize.width / 2, Math.min(mouseX - itemSize.width / 2, width - itemSize.width / 2))}px`
    item.style.transform = 'translate(0, -50%)'
  } else if (closestSide === 'right') {
    item.style.top = `${Math.max(-itemSize.height / 2, Math.min(mouseY - itemSize.height / 2, height - itemSize.height / 2))}px`
    item.style.left = `${width - itemSize.width}px`
    item.style.transform = 'translate(50%, 0)'
  } else if (closestSide === 'bottom') {
    item.style.top = `${height - itemSize.height}px`
    item.style.left = `${Math.max(-itemSize.width / 2, Math.min(mouseX - itemSize.width / 2, width - itemSize.width / 2))}px`
    item.style.transform = 'translate(0, 50%)'
  } else if (closestSide === 'left') {
    item.style.top = `${Math.max(-itemSize.height / 2, Math.min(mouseY - itemSize.height / 2, height - itemSize.height / 2))}px`
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
  if (frameRect) {
    itemsPlayground.value.push({
      name: 'message-1',
      html: `<img
      draggable='false'
          src="chat-box.png"
        >
          <p class="absolute overflow-scroll select-none top-[18%] left-[11%] break-all w-[78%] h-[60%] bg-transparent outline-none cursor-[inherit] resize-none">${message.value}</textarea>
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

const initFrameItems = () => {
  const frameRect = document.querySelector('.frame')?.getBoundingClientRect()

  if (frameRect) {
    frameDimensions.value = { width: frameRect.width, height: frameRect.height }
    itemsFrame.value.forEach((item) => {
      const itemSize = itemsFrameSize.value.find((it) => it.id === item.id)
      const itemRect = document.querySelector(`.itemFrame${item.id}`)?.getBoundingClientRect()
      if (itemSize && itemRect) {
        mooveItem(
          item,
          itemRect.x + itemSize.width / 2,
          itemRect.y + itemSize.height / 2,
          frameRect,
          itemSize,
        )
      }
    })
  }
}

onMounted(async () => {
  // Cleanup listeners in case of unmounting
  window.addEventListener('resize', initFrameItems)
  document.addEventListener('contextmenu', () => false)
  await new Promise((res) => setTimeout(res, 50))
  playground.value?.initItems()
  playground.value?.$el.classList.remove('overflow-hidden')
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('resize', initFrameItems)
  document.removeEventListener('contextmenu', () => false)
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
  animation-duration: 10s;
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
