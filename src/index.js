import RoomManager from './roomManager.js'

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

const manager = new RoomManager(engine, canvas);
manager.start();