// =====================================
// CARITO ❤️
// CORAZÓN GIGANTE DE PARTÍCULAS
// =====================================


// Escena

const escena = new THREE.Scene();




// Cámara

const camara = new THREE.PerspectiveCamera(

75,

window.innerWidth / window.innerHeight,

0.1,

1000

);


camara.position.z = 1000;




// Canvas

const canvas = document.getElementById("universo");




// Render

const render = new THREE.WebGLRenderer({

canvas: canvas,

antialias:true

});


render.setSize(

window.innerWidth,

window.innerHeight

);


render.setPixelRatio(

window.devicePixelRatio

);




// Controles para mover y hacer zoom

const controles = new THREE.OrbitControls(

camara,

render.domElement

);


controles.enableDamping = true;

controles.enableZoom = true;

controles.minDistance = 30;

controles.maxDistance = 1000;





// =====================================
// CREAR CORAZÓN GIGANTE ❤️
// =====================================


const cantidad = 60000;


const geometria = new THREE.BufferGeometry();


const puntos = [];



for(let i=0;i<cantidad;i++){


    const t =
    Math.random()*Math.PI*2;



    // Fórmula corazón

    let x =
    16*Math.pow(Math.sin(t),3);



    let y =
    13*Math.cos(t)
    -5*Math.cos(2*t)
    -2*Math.cos(3*t)
    -Math.cos(4*t);



    // Hacerlo más grueso y lleno

    let escala =
4.8 +
Math.random()*1.5;



    x *= escala;

    y *= escala;



    let z =
    (Math.random()-0.5)*35;



    // Movimiento interno

    x += (Math.random()-0.5)*12;

    y += (Math.random()-0.5)*12;



    puntos.push(

        x,

        y,

        z

    );


}





geometria.setAttribute(

"position",

new THREE.Float32BufferAttribute(

puntos,

3

)

);






const material =
new THREE.PointsMaterial({

color:0xff1493,

size:0.35,

transparent:true,

opacity:0.9,

blending:THREE.AdditiveBlending

});





const corazon =
new THREE.Points(

geometria,

material

);



escena.add(corazon);
// =====================================
// GALAXIA ROSA ALREDEDOR 🌌
// =====================================


const cantidadGalaxia = 18000;


const galaxiaGeo = new THREE.BufferGeometry();


const galaxiaPuntos = [];

const galaxiaColores = [];



for(let i=0;i<cantidadGalaxia;i++){


    const radio = 
    60 + Math.random()*70;



    const angulo =
    Math.random()*Math.PI*2;



    const x =
    Math.cos(angulo)*radio;



    const z =
    Math.sin(angulo)*radio;



    const y =
    (Math.random()-0.5)*30;



    galaxiaPuntos.push(

        x,

        y,

        z

    );



    galaxiaColores.push(

        1,

        Math.random()*0.4,

        0.8 + Math.random()*0.2

    );


}





galaxiaGeo.setAttribute(

"position",

new THREE.Float32BufferAttribute(

galaxiaPuntos,

3

)

);



galaxiaGeo.setAttribute(

"color",

new THREE.Float32BufferAttribute(

galaxiaColores,

3

)

);





const galaxiaMaterial =
new THREE.PointsMaterial({

size:0.25,

vertexColors:true,

transparent:true,

opacity:0.8,

blending:

THREE.AdditiveBlending

});




const galaxia =
new THREE.Points(

galaxiaGeo,

galaxiaMaterial

);



escena.add(galaxia);

// =====================================
// NEBULOSA ROSA
// =====================================

const nebulosaGeo = new THREE.BufferGeometry();

const nebulosa = [];

for(let i = 0; i < 35000; i++){

    const radio = Math.random() * 180;

    const angulo = Math.random() * Math.PI * 2;

    nebulosa.push(

        Math.cos(angulo) * radio,

        (Math.random() - 0.5) * 120,

        Math.sin(angulo) * radio

    );

}

nebulosaGeo.setAttribute(

"position",

new THREE.Float32BufferAttribute(

nebulosa,

3

)

);

const nebulosaMesh = new THREE.Points(

nebulosaGeo,

new THREE.PointsMaterial({

color:0xff69c9,

size:0.18,

transparent:true,

opacity:0.18,

blending:THREE.AdditiveBlending

})

);

escena.add(nebulosaMesh);



// =====================================
// ESTRELLAS DEL ESPACIO ⭐
// =====================================


const estrellasGeo =
new THREE.BufferGeometry();


const estrellas=[];



for(let i=0;i<4000;i++){


estrellas.push(

(Math.random()-0.5)*500,

(Math.random()-0.5)*500,

(Math.random()-0.5)*500

);


}



estrellasGeo.setAttribute(

"position",

new THREE.Float32BufferAttribute(

estrellas,

3

)

);



const estrellasMesh =
new THREE.Points(

estrellasGeo,

new THREE.PointsMaterial({

color:0xffffff,

size:0.15

})

);



escena.add(estrellasMesh);






// =====================================
// ANIMACIÓN
// =====================================


let tiempo=0;
// =====================================
// MOVIMIENTO AUTOMÁTICO DE LA CÁMARA
// =====================================

let anguloCamara = 0;
let distanciaCamara = 220;
let direccionCamara = -0.03;
let moviendoUsuario = false;

controles.addEventListener("start", () => {
    moviendoUsuario = true;
});

controles.addEventListener("end", () => {
    setTimeout(() => {
        moviendoUsuario = false;
    }, 3000);
});

function animar(){


requestAnimationFrame(animar);



tiempo+=0.03;



// Giro del corazón

corazon.rotation.y +=0.003;



// Latido

let escala =

1 +

Math.sin(tiempo)*0.05;



corazon.scale.set(

escala,

escala,

escala

);



// Movimiento estrellas

estrellasMesh.rotation.y -=0.0005;
galaxia.rotation.y +=0.0008;
nebulosaMesh.rotation.y += 0.0003;

nebulosaMesh.rotation.x += 0.00005;
galaxia.rotation.x +=0.0002;


if(!moviendoUsuario){

    anguloCamara += 0.0015;

    camara.position.x = Math.cos(anguloCamara) * 120;

    camara.position.z = Math.sin(anguloCamara) * 300;

    camara.lookAt(0,0,0);

}
controles.update();



render.render(

escena,

camara

);



}



animar();





// Ajustar pantalla


window.addEventListener(

"resize",

()=>{


camara.aspect =

window.innerWidth /

window.innerHeight;



camara.updateProjectionMatrix();



render.setSize(

window.innerWidth,

window.innerHeight

);


}

);
// =====================================
// MENSAJES PARA CARITO 💌
// =====================================


const frasesCarito=[
"ily",
"Te amo Carito",

"Mi mujer de ojos precisos  ",

"Eres mi lugar favorito sin duda alguna",

"Mi calma y mi felicidad ",

"Gracias por llegar a mi vida Carito ",

"Mi mejor novia del mundo 💗",

"Mi universo tiene tu nombre y apellido 🌌",

"Entre millones de estrellas te elegiría a ti, aunque ya tienes las mas hermosas estrellas en los ojos",

"Siempre voy a elegirte ❤️",

"Eres la parte más bonita de mis días y noches",

"Mi pequeña galaxia 🌹",
"El cielo tiene millones de luces, pero ninguna tiene la magia de tus ojos mi vsa.",
"Mi corazón hizo un universo entero solo para recordarme que mi mundo eres tú.",
"Que nunca se te olvide: en esta galaxia y en cualquier otra, siempre te elegiría a ti.",
"Eres la historia bonita que no sabía que estaba esperando escribir.",
"Mi amor por ti no cabe en palabras, por eso tuve que convertirlo en estrellas.",

];



function crearMensaje(){


const texto =
document.createElement("div");


texto.className="mensaje";


texto.innerHTML =
frasesCarito[
Math.floor(Math.random()*frasesCarito.length)
];



texto.style.left =
Math.random()*80+10+"%";


texto.style.top =
Math.random()*70+20+"%";



document
.getElementById("mensajes")
.appendChild(texto);



setTimeout(()=>{

texto.remove();

},6000);


}




setInterval(

crearMensaje,

2500

);
// =====================================
// CORAZONES FLOTANTES
// =====================================

function crearCorazon(){

const corazon =
document.createElement("div");

corazon.className="corazonMini";

corazon.innerHTML="";

corazon.style.left=
Math.random()*100+"%";

corazon.style.top="100%";

document
.getElementById("corazones")
.appendChild(corazon);

setTimeout(()=>{

corazon.remove();

},8000);

}

setInterval(

crearCorazon,

700

);
