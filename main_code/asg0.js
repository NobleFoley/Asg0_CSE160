// DrawRectangle.js
function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
    //var v1 = new Vector3([2.25, 2.25, 0]);
    //drawVector(v1, 'red')
} 

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');

    // Start Path for line
    ctx.beginPath();
    ctx.moveTo( canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2) + v.elements[0] * 20, (canvas.height / 2) - v.elements[1] * 20);

    // reference: https://www.w3schools.com/tags/canvas_strokestyle.asp
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = document.getElementById('x1')
    if (!x1) {
        console.log('Failed to retrieve the <input> v1: x element');
        return;
    }

    var y1 = document.getElementById('y1')
    if (!y1) {
        console.log('Failed to retrieve the <input> v1: y element');
        return;
    }

    var x2 = document.getElementById('x2')
    if (!x2) {
        console.log('Failed to retrieve the <input> v2: x element');
        return;
    }

    var y2 = document.getElementById('y2')
    if (!y2) {
        console.log('Failed to retrieve the <input> v2: y element');
        return;
    }

    var vector1 = new Vector3([x1.value, y1.value, 0])
    var vector2 = new Vector3([x2.value, y2.value, 0])
    drawVector(vector1, 'red')
    drawVector(vector2, 'blue')
    return;
}

function handleDrawOperationEvent() {
    var operation = getElement('operation');
    

    var x1 = getElement('x1');

    var y1 = getElement('y1');

    var x2 = getElement('x2');

    var y2 = getElement('y2');

    var scalar = getElement('scalar');

    handleDrawEvent();

    var vector1 = new Vector3([x1.value, y1.value, 0]);
    var vector2 = new Vector3([x2.value, y2.value, 0]);

    if (operation.value === 'add') {
        vector1.add(vector2);
    }
    else if (operation.value === 'subtract') {
        vector1.sub(vector2);
    }
    else if (operation.value === 'multiply') {
        vector1.mul(scalar.value);
        vector2.mul(scalar.value);
        drawVector(vector2, 'green');
    }
    else if (operation.value === 'divide') {
        vector1.div(scalar.value);
        vector2.div(scalar.value);
        drawVector(vector2, 'green');
    }
    else if (operation.value === 'magnitude') {
        console.log(`Magnitude v1: ${vector1.magnitude()}`);
        console.log(`Magnitude v2: ${vector2.magnitude()}`);
        return;
    }
    else if (operation.value === 'normalize') {
        vector1.normalize();
        vector2.normalize();
        drawVector(vector2, 'green');
    }
    else if (operation.value === 'angle') {
        angleBetween(vector1, vector2);
        return;
    }
    else if (operation.value === 'area') {
        areaTriangle(vector1, vector2);
        return;
    }

    drawVector(vector1, 'green');
    return;
}

function getElement(id) {
    var element = document.getElementById(id)
    if (!element) {
        console.log(`Failed to retrieve the ${id} element`);
        return;
    }
    return element
}

function angleBetween(v1, v2) {
    var dot = Vector3.dot(v1, v2)

    var v1_mag = v1.magnitude()
    var v2_mag = v2.magnitude()

    var norm_dot = (v1_mag * v2_mag)

    var rads = Math.acos(dot / norm_dot)

    console.log(`Angle: ${rads * (180 / Math.PI)}`)
    return;
}

function areaTriangle(v1, v2) {
    var cross = Vector3.cross(v1, v2)

    var mag = (cross.magnitude() / 2)

    console.log(`Area of the triangle: ${mag}`)
}