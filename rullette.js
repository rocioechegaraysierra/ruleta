var options = [
  "BOLSITA",
  "Medioambiente",
  "Descomposición",
  "3R"
];


var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
}

function RGB2Color(r, g, b) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = (Math.PI * 2) / maxitem;

  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 800, 800);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = "bold 22px Helvetica, Arial";

    for (var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(
        250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();

}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawRouletteWheel();
  spinTimeout = setTimeout("rotateWheel()", 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = (startAngle * 180) / Math.PI + 90;
  var arcd = (arc * 180) / Math.PI;
  var index = Math.floor((360 - (degrees % 360)) / arcd);
  ctx.save();
  ctx.font = "bold 30px Helvetica, Arial";
  var text = options[index];
  question(text);
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();

}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}


function question(text) {
  if (text == options[0]) {


    let contenedor = document.querySelector("#Pregunta")
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
    let mensaje = document.createTextNode("p")
    mensaje.textContent = "Te ganaste una bolsita!"
    contenedor.appendChild(mensaje);


  }
  if (text == options[1]) {


    let contenedor = document.querySelector("#Pregunta")
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
    let mensaje = document.createTextNode("p")
    mensaje.textContent = "¿Cuándo es el Día Internacional del Medioambiente?"
    contenedor.appendChild(mensaje);


    var A = document.querySelector("#opcionA");
    var B = document.querySelector("#opcionB");

    while (A.hasChildNodes()) {
      A.removeChild(A.firstChild);
    }
    while (B.hasChildNodes()) {
      B.removeChild(B.firstChild);
    }

    let mensajeA = document.createTextNode("p")
    mensajeA.textContent = "5 de Junio"
    A.appendChild(mensajeA);
    
    let mensajeB = document.createTextNode("p")
    mensajeB.textContent = "5 de Julio"
    B.appendChild(mensajeB);

       
    A.addEventListener("click", function () {
      A.textContent = "Correcto!";
    });

    B.addEventListener("click", function () {
      B.textContent = "Incorrecto";
    });

  }

  if (text == options[2]) {


    let contenedor = document.querySelector("#Pregunta")
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
    let mensaje = document.createTextNode("p")
    mensaje.textContent = "¿Cuánto tiempo tarda en descomponerse una BOLSA DE PLÁSTICO?"
    contenedor.appendChild(mensaje);

    var A = document.querySelector("#opcionA");
    var B = document.querySelector("#opcionB");

    while (A.hasChildNodes()) {
      A.removeChild(A.firstChild);
    }
    while (B.hasChildNodes()) {
      B.removeChild(B.firstChild);
    }

    let mensajeA = document.createTextNode("p")
    mensajeA.textContent = "5000 AÑOS"
    A.appendChild(mensajeA);
    
    let mensajeB = document.createTextNode("p")
    mensajeB.textContent = "1000 AÑOS"
    B.appendChild(mensajeB);

        
    A.addEventListener("click", function () {
      A.textContent = "Incorrecta";
    });

    B.addEventListener("click", function () {
      B.textContent = "Correcto!";
    });


  }
  if (text == options[3]) {


    let contenedor = document.querySelector("#Pregunta")
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
    let mensaje = document.createTextNode("p")
    mensaje.textContent = "¿Qué significan las 3R? Reducir, reutilizar y.."
    contenedor.appendChild(mensaje);
  
    var A = document.querySelector("#opcionA");
    var B = document.querySelector("#opcionB");
  
    while (A.hasChildNodes()) {
      A.removeChild(A.firstChild);
    }
    while (B.hasChildNodes()) {
      B.removeChild(B.firstChild);
    }
  
    let mensajeA = document.createTextNode("p")
    mensajeA.textContent = "Reparar"
    A.appendChild(mensajeA);
    
    let mensajeB = document.createTextNode("p")
    mensajeB.textContent = "Reciclar"
    B.appendChild(mensajeB);
  
        
    A.addEventListener("click", function () {
      A.textContent = "Incorrecta";
    });
  
    B.addEventListener("click", function () {
      B.textContent = "Correcto!";
    });
  
  
  }
}



drawRouletteWheel();

