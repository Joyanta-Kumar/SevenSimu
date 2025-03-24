
// " _ "
// "|_|"
// "| |"
// " ‾ "

let digitModels = 
{
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  // _, a, _, f, g, b, e, _, c, _, d , _
  visual: [
    // 0
    " _ " +
    "| |" +
    "| |" +
    " ‾ ",
    // 1
    "   " +
    "  |" +
    "  |" +
    "   ",
    // 2
    " _ " +
    " _|" +
    "|  " +
    " ‾ ",
    // 3
    " _ " +
    " _|" +
    "  |" +
    " ‾ ",
    // 4
    "   " +
    "|_|" +
    "|  " +
    "   ",
    // 5
    " _ " +
    "|_ " +
    "  |" +
    " ‾ ",
    // 6
    " _ " +
    "|_ " +
    "| |" +
    " ‾ ",
    // 7
    " _ " +
    "  |" +
    "  |" +
    "   ",
    // 8
    " _ " +
    "|_|" +
    "| |" +
    " ‾ ",
    // 9
    " _ " +
    "|_|" +
    "  |" +
    " ‾ ",
  ],
  structure: [
    // 0
    [false, false, false, false, false, false, false],
    // 1
    [false, false, false, false, false, false, false],
    // 2
    [false, false, false, false, false, false, false],
    // 3
    [false, false, false, false, false, false, false],
    // 4
    [false, false, false, false, false, false, false],
    // 5
    [false, false, false, false, false, false, false],
    // 6
    [false, false, false, false, false, false, false],
    // 7
    [false, false, false, false, false, false, false],
    // 8
    [false, false, false, false, false, false, false],
    // 9
    [false, false, false, false, false, false, false]
  ]
}

// 1, 5, 8, 10, 6, 3, 4
// a, b, c, d , e, f, g

const segmentMap = [ 1,   5,   8,   10,  6,   3,  4  ]
const segmentName= ['a', 'b', 'c', 'd', 'e', 'f', 'g']

for (let i = 0; i < digitModels.structure.length; i++) {
  for (let  j = 0; j < segmentMap.length; j++) {
    digitModels.structure[i][j] = digitModels.visual[i].charCodeAt(segmentMap[j]) != 32
  }  
}

// For 7 segments
let activeSegments = [false, false, false, false, false, false, false]
// For 10 numbers
let probability = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]



// Create html
const barGraph = document.getElementById("barGraph")
const display = document.getElementById("display")


for (let i = 0; i < digitModels.visual.length; i++) {
  const bar = document.createElement("div")
  bar.classList.add("bar")
  bar.innerText = i
  barGraph.appendChild(bar)
}



for (let i = 0; i < segmentMap.length; i++) {
  const segment = document.createElement("div");

  segment.classList.add("segment")
  segment.classList.add("segment-" + segmentName[i])
  segment.innerText = segmentName[i]
  if (i % 3 == 0) {
    segment.classList.add("horizontal")
  }

  segment.addEventListener("click", () => {
    if (segment.classList.contains("active")) {
      segment.classList.remove("active")
      activeSegments[i] = false
    }
    else {
      segment.classList.add("active")
      activeSegments[i] = true
    }
    refresh()
  })

  display.appendChild(segment)
}


// f
function refresh() {
  for (let i = 0; i < digitModels.structure.length; i++) {
    probability[i] = 0;
    for (let j = 0; j < digitModels.structure[i].length; j++) {
      if (activeSegments[j] == digitModels.structure[i][j]) {
        probability[i] += 1
      }
    }
    barGraph.children[i].style.height = `${probability[i] / 7 * 500}px`
    if (probability[i] == 7) {
      barGraph.children[i].classList.add("active")
    }
    else {
      barGraph.children[i].classList.remove("active")
    }
  }
  console.log(probability)
}

