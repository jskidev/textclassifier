import '../App.css';

import React, { useState, useEffect } from 'react';

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Home() {

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('App').appendChild( renderer.domElement );

        const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableZoom = false;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( '#FFF' );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );

        const geometry = new THREE.IcosahedronGeometry( 12, 1 );

        const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5, linewidth: 5 } );
        const meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

        const mesh = new THREE.Mesh( geometry, meshMaterial );
        var line = new THREE.LineSegments( geometry, lineMaterial );

        mesh.add( line );
        scene.add( mesh );

        renderer.render( scene, camera );
        var animate = function () {
            requestAnimationFrame( animate );
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            renderer.render( scene, camera );
          };
        animate();

    }, []);

    const handleClick = () => {
        window.location = '/new'
    }

    return (
    <div className="App" id="App">
        Home
        <button onClick={handleClick}>get started</button>
    </div>
    );
}

export default Home;
