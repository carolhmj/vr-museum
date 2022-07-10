/**
 * The lobby is the starting room
 */
import Room from '../room.js';

export default class Room1 extends Room {
    createScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(15,2,20));
        camera.setTarget(new BABYLON.Vector3(14,2,19));
        var gunshot = new BABYLON.Sound("gunshot", "https://dl.dropbox.com/s/lk9c6eyf06k7sv1/rodin.mp3", scene);
        
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        
        window.addEventListener("keydown", function (evt) {
            // Press space key to fire
            if (evt.keyCode === 13) {
                gunshot.play();
            }
        });
        
        window.addEventListener("keydown", function (evt) {
            // Press space key to fire
            if (evt.keyCode === 32) {
                gunshot.stop();
            }
        });
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        const skyboxSize = 1000;
        //https://www.dropbox.com/s/zyyb0mq33kv82pw/environment-garden.env?dl=0

        //https://www.dropbox.com/s/fv0p0eulz2246zp/environment-alps.env?dl=0
        /*const roomTexture =  "https://dl.dropbox.com/s/fv0p0eulz2246zp/environment-alps.env" //"./assets/textures/environments/riverside.env";
        const environmentHelper = scene.createDefaultEnvironment({
            environmentTexture: roomTexture,
            skyboxTexture: roomTexture,
            createGround: true,
            skyboxSize
        });
        environmentHelper.skyboxMaterial.primaryColor = new BABYLON.Color3(1,1,1);
        environmentHelper.skybox.position.y = 25;*/
        
        // Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;			

        //https://www.dropbox.com/s/r2kalozdw9uagct/aerial_asphalt_01_diff_2k.jpg?dl=0
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: skyboxSize/20, height: skyboxSize/20}, scene);
        var groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);
        ground.material = groundMaterial;
        groundMaterial.albedoTexture = new BABYLON.Texture("https://dl.dropbox.com/s/r2kalozdw9uagct/aerial_asphalt_01_diff_2k.jpg", scene);
        groundMaterial.bumpTexture = new BABYLON.Texture("https://dl.dropbox.com/s/r2kalozdw9uagct/aerial_asphalt_01_nor_gl_2k.png", scene);
        groundMaterial.metallicTexture = new BABYLON.Texture("https://dl.dropbox.com/s/r2kalozdw9uagct/aerial_asphalt_01_rough_2k.png", scene);
        groundMaterial.opacityTexture = new BABYLON.Texture("https://dl.dropbox.com/s/r2kalozdw9uagct/WhiteTransparentRamp.png", scene);
        groundMaterial.albedoTexture.uScale = 100;
        groundMaterial.albedoTexture.vScale = 100;
        groundMaterial.albedoColor = BABYLON.Color3.FromHexString("#ECDEB2");
        ground.receiveShadows = true;
        groundMaterial.roughness = 0.9;
        groundMaterial.metallic = 0.01;

        // Our built-in 'ground' shape.
        /*var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
        let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
        ground.material = groundMaterial;
        let groundTexture = new BABYLON.Texture(Assets.textures.checkerboard_basecolor_png.rootUrl, scene);
        ground.material.diffuseTexture = groundTexture;*/

        //BABYLON.SceneLoader.ImportMesh("", Assets.meshes.Yeti.rootUrl, Assets.meshes.Yeti.filename, scene, function(newMeshes){
        //    newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        //});
        //https://www.dropbox.com/s/efls2kfek31ob9s/adam.glb?dl=0
        BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/efls2kfek31ob9s/", "adam.glb", scene,  function(newMeshes){
        newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
        newMeshes[0].position.y = 1.8;
        newMeshes[0].position.x = 10;
        newMeshes[0].position.z = 2;
        });
        //https://www.dropbox.com/s/f8vow2afkf8ippz/pensador.glb?dl=0
        //https://www.dropbox.com/s/fe90urvsy31lmsh/bourgeois.glb?dl=0
        BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/f8vow2afkf8ippz/", "pensador.glb", scene,  function(newMeshes){
        newMeshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
        newMeshes[0].position.y = -0.1;
        newMeshes[0].position.x = 0;
        newMeshes[0].position.z = 0;
        });

        //https://www.dropbox.com/s/fe90urvsy31lmsh/bourgeois.glb?dl=0
        BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/fe90urvsy31lmsh/", "bourgeois.glb", scene,  function(newMeshes){
        newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        newMeshes[0].position.y = -0.1;
        newMeshes[0].position.x = -15;
        newMeshes[0].position.z = 0;
        });

        //https://www.dropbox.com/s/cep0r65twon0frh/eve.glb?dl=0
        BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/cep0r65twon0frh/", "eve.glb", scene,  function(newMeshes){
        newMeshes[0].scaling = new BABYLON.Vector3(0.0045, 0.0045, 0.0045);
        newMeshes[0].position.y = 0;
        newMeshes[0].position.x = -10;
        newMeshes[0].position.z = 0.5;
        });

        return scene;
    }
}