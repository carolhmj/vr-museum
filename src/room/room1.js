/**
 * The lobby is the starting room
 */
import Room from '../room.js';

export default class Room1 extends Room {
    constructor(engine, canvas) {
        super(engine, canvas);
    }

    createScene(engine, canvas) {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        
        //Light direction is directly down from a position one unit up, slow decay
        var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-1, 1, -1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);
        light.specular = new BABYLON.Color3(0, 1, 0);
        
        //Light direction is directly down from a position one unit up, fast decay
        var light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 50, scene);
        light1.diffuse = new BABYLON.Color3(0, 1, 0);
        light1.specular = new BABYLON.Color3(0, 1, 0);

        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);			
            
        return scene;
    }
}