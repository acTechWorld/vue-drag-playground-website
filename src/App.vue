<template>
  <header>
    <div class="wrapper">
      <nav></nav>
    </div>
  </header>

  <main class="flex h-full">
    <div class="absolute top-0 left-0 h-full w-full">
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
    <div class="!p-[10rem] w-full h-full relative flex justify-center">
      <div class="w-full h-full relative max-w-[1600px]">
        <div
          class="bg-red-500 w-[50px] h-[50px] absolute z-10 cursor-grab"
          @mousedown="startDragging(itemsFrame[0])"
          :style="itemsFrame[0].style"
        ></div>
        <div
          class="absolute h-40 z-10 -rotate-90 cursor-grab bg-[url('arrow-down.png')] bg-contain w-[95px]"
          @mousedown="startDragging(itemsFrame[1])"
          :style="itemsFrame[1].style"
        ></div>
        <div
          class="absolute z-10 -rotate-90 cursor-pointer bg-[url('plus-icon.webp')] bg-contain w-[83px] h-[93px]"
          @mousedown="startDragging(itemsFrame[2])"
          @click="handleAddItem"
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
  </main>
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
const itemsPlayground: Ref<ItemPlayground[]> = ref([
  {
    name: 'chat-box',
    html: `<img
          src="chat-box.png"
        >
          <p class="absolute top-[17%] left-[11%] break-all w-[78%] h-[70%]">Test Test Test Test Test Test Test Testffffffffffffffffff</p>
        </img>`,
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
    style: { top: '0px', left: 'calc(50% - 25px)', transform: 'translate(0, -50%)' },
    width: 50,
    height: 50,
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

//COMPUTED
const propsPlayground = computed(() => ({
  isDrag: true,
  isRotate: true,
  isResize: true,
  isCopy: true,
  isDelete: true,
}))

//METHODS
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

const handleAddItem = () => {}

onMounted(() => {
  // Cleanup listeners in case of unmounting
  document.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDragging)
})
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

* {
  margin: 0px;
  padding: 0px;
}

body {
  font-family: 'Exo', sans-serif;
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
  height: 100vh;
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
