    'use strict'

    /*
    HTML5 - JavaScript Complex Number Operations Drill, zdrill, Jan 2019
    by Amarnath S, amarnaths.codeproject@gmail.com
    */

    /*
    Functionality:
    1. Select a Computer Question (two complex numbers), and display the magnitudes and 
        thetas of these complex numbers on the screen, non-editable text boxes.
    2. Also display these complex numbers on the left graph, in red and magenta colours.
    3. Enable the user to select the operation - add, subtract, multiply, divide, 
        invert and compute conjugate, and enter two magnitude and theta of the resulting 
        complex number.
    4. Display graphically the user-entered complex number in the right graph, in blue colour.
    5. Enable the user to see the rectangular components of the input and result complex 
        numbers.
    6. Enable the user to view graphically the sum or difference of the red and magenta 
        complex numbers on the right graph.
    7. Enable the user to view the answer on the right graph, in dark green colour.
    8. Allow the user to select User Level - Novice or Professional.
    9. Allow the user to start a New Quiz.
    10. Enable the user to see the answer.
    11. Display Appreciation Message to the user when his/her guesses are close 
         to the Computer Guess.
    */

    let noviceMagnitudes = [0.5, 0.75, 0.8, 0.9, 1.0];
    let noviceThetas = [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75];
    let proMagnitudes = [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1];
    let proThetas = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let z1Magnitude;
    let z1Theta;
    let z2Magnitude;
    let z2Theta;
    let userMagnitude;
    let userTheta;
    let userRText;
    let userThetaText;
    let z1;
    let z2;
    let z3Result;
    let zUser;
    let buttonNew;
    let checkRect;
    let checkAns;
    let checkSumDiff;
    let select;
    let ansButton;
    let canvasZ1Z2;
    let contextZ1Z2;
    let canvasResult;
    let contextResult;
    let xMarginLeft;
    let xMarginRight;
    let yMarginTop;
    let yMarginBottom;

    window.onload = init;

    function init() {
        for( let i = 0; i < noviceThetas.length; ++i) {
            noviceThetas[i] = noviceThetas[i] * Math.PI;            
        }

        for( let i = 0; i < proThetas.length; ++i) {
            proThetas[i] = proThetas[i] * Math.PI / 8.0;
        }

        xMarginLeft = 35;
        xMarginRight = 10;
        yMarginTop = 10;
        yMarginBottom = 35;

        buttonNew = document.getElementById("bnNewQuiz");
        buttonNew.addEventListener('click', setupNewQuiz, false);
        checkRect = document.getElementById("showRect");
        checkRect.addEventListener('click', showRealImag, false);
        select = document.getElementById("opOperation");
        select.addEventListener('change', handleOperation, false);
        ansButton = document.getElementById("bnAns");
        ansButton.addEventListener('click', showAnswerMath, false);
        checkAns = document.getElementById("showAns");
        checkAns.addEventListener('click', showAnsGraph, false);
        checkSumDiff = document.getElementById("showSumDiff");
        checkSumDiff.addEventListener('click', showSumDiff, false);

        userRText = document.getElementById("userR");
        userThetaText = document.getElementById("userTheta");
        userRText.addEventListener('keyup', handleUserGuess, false);
        userThetaText.addEventListener('keyup', handleUserGuess, false);

        canvasZ1Z2 = document.getElementById('canvasQuestion');
        contextZ1Z2 = canvasZ1Z2.getContext('2d');
        canvasResult = document.getElementById('canvasResult');
        contextResult = canvasResult.getContext('2d');

        document.getElementById("blank1").textContent = " ";
        document.getElementById("blank2").textContent = " ";
        document.getElementById("blank3").textContent = " ";

        z1 = new ComplexNumber();
        z2 = new ComplexNumber();
        z3Result = new ComplexNumber();
        zUser = new ComplexNumber();

        setupNewQuiz();
        select.selectedIndex = 0;
        handleOperation();
        handleUserGuess();
    }

    function showSumDiff() {
        showResultGraph();
    }

    function showAnswerMath() {
        let thetaAngle = z3Result.theta / Math.PI;
        let message = "Answer: Magnitude: " + z3Result.magnitude.toFixed(3) + ", Theta: " +  thetaAngle.toFixed(3) + " * \u03C0 \n" +
                      "Real Part: " + z3Result.real.toFixed(3) + ", Imaginary Part: " + z3Result.imag.toFixed(3);
        alert(message);
    }

    function showAnsGraph() {
        showResultGraph();
    }

    function handleOperation() {
        let sel = document.getElementById("opOperation").selectedIndex;

        switch (sel){
            case 0: // Add
                z3Result = z1.add(z2);
                document.getElementById("input2Text").className = "magentaText";
                document.getElementById("z2r").className = "magentaColour";
                document.getElementById("z2theta").className = "magentaColour";
                document.getElementById("showSumDiffText").textContent = "Show Vector Sum";
                document.getElementById("showSumDiff").className = "";
                document.getElementById("showSumDiffText").className = "";
                break;
            case 1: // Subtract
                z3Result = z1.subtract(z2);
                document.getElementById("input2Text").className = "magentaText";
                document.getElementById("z2r").className = "magentaColour";
                document.getElementById("z2theta").className = "magentaColour";
                document.getElementById("showSumDiffText").textContent = "Show Vector Difference";
                document.getElementById("showSumDiff").className = "";
                document.getElementById("showSumDiffText").className = "";
                break;
            case 2: // Multiply
                z3Result = z1.multiply(z2);
                document.getElementById("input2Text").className = "magentaText";
                document.getElementById("z2r").className = "magentaColour";
                document.getElementById("z2theta").className = "magentaColour";
                document.getElementById("showSumDiff").className = "blank";
                document.getElementById("showSumDiffText").className = "blank";
                break;
            case 3: // Divide
                z3Result = z1.divide(z2);
                document.getElementById("input2Text").className = "magentaText";
                document.getElementById("z2r").className = "magentaColour";
                document.getElementById("z2theta").className = "magentaColour";
                document.getElementById("showSumDiff").className = "blank";
                document.getElementById("showSumDiffText").className = "blank";
                break;
            case 4: // Ïnvert
                z3Result = z1.invert();
                // Hide the controls for the second complex number
                document.getElementById("input2Text").className = "blank";
                document.getElementById("z2r").className = "blank";
                document.getElementById("z2theta").className = "blank";
                document.getElementById("blank2").className = "blank";
                document.getElementById("showSumDiff").className = "blank";
                document.getElementById("showSumDiffText").className = "blank";
                break;
            case 5: // Conjugate
                z3Result = z1.conjugate();
                // Hide the controls for the second complex number
                document.getElementById("input2Text").className = "blank";
                document.getElementById("z2r").className = "blank";
                document.getElementById("z2theta").className = "blank";
                document.getElementById("blank2").className = "blank";
                document.getElementById("showSumDiff").className = "blank";
                document.getElementById("showSumDiffText").className = "blank";
                break;
            default:
                // Should not come here
        }
        if( Math.abs(z3Result.magnitude) < 0.001 ) {
            z3Result.theta = 0;
        }

        showRealImag();
        showZ1Z2Graph();
    }

    function handleUserGuess() {
        userMagnitude = document.getElementById("userR").value;
        userTheta = document.getElementById("userTheta").value;
    
        zUser.magnitude = userMagnitude;
        zUser.theta = userTheta * Math.PI;
        zUser.computeRealImag();
        //console.log("Zuser RealImag " + zUser.real + ", " + zUser.imag);

        let imagText = zUser.imag.toFixed(3);
        let jText = " + j ";
        if( zUser.imag < 0) {
            jText = " - j ";
            imagText = -imagText;
        }
        let realImagUser = zUser.real.toFixed(3) + jText + imagText;
        document.getElementById("blank3").textContent = realImagUser;

        if( checkRect.checked == true) {
            document.getElementById("blank3").className = "";            
        }
        else {
            document.getElementById("blank3").className = "gray";
        }
        showResultGraph();

        let epsilon = 0.01;
        if(Math.abs(zUser.magnitude - z3Result.magnitude) < epsilon &&
           Math.abs(zUser.theta - z3Result.theta) < epsilon) {
               document.getElementById("msgCongrats").className = "";
        } else {
            document.getElementById("msgCongrats").className = "blank";
        }
    }

    function showRealImag() {
        let jText = " + j ";
        let imagText = z1.imag.toFixed(3);
        if( z1.imag < 0) {
            jText = " - j ";
            imagText = -imagText;
        }
        let realImag1 = z1.real.toFixed(3) + jText + imagText;
        document.getElementById("blank1").textContent = realImag1;
        //console.log("Z1 Real Imag: " + z1.real + ", " + z1.imag + " Z2ReIm: " + z2.real + ", " + z2.imag);

        imagText = z2.imag.toFixed(3);
        jText = " + j ";
        if( z2.imag < 0) {
            jText = " - j ";
            imagText = -imagText;
        }
        let realImag2 = z2.real.toFixed(3) + jText + imagText;
        document.getElementById("blank2").textContent = realImag2;

        if( checkRect.checked == true) {
            document.getElementById("blank1").className = "";
            document.getElementById("blank2").className = "";            

            if(select.selectedIndex == 4 || select.selectedIndex == 5) {
                document.getElementById("blank2").className = "gray";
            }
        } else {
            document.getElementById("blank1").className = "gray";
            document.getElementById("blank2").className = "gray";
        }
        handleUserGuess();
    }

    function setupNewQuiz() {
        z1Magnitude = noviceMagnitudes[Math.floor(Math.random() * noviceMagnitudes.length)];
        z1Theta = noviceThetas[Math.floor(Math.random() * noviceThetas.length)];
        z2Magnitude = noviceMagnitudes[Math.floor(Math.random() * noviceMagnitudes.length)];
        z2Theta = noviceThetas[Math.floor(Math.random() * noviceThetas.length)];

        if(document.getElementById('userPro').checked) {
            z1Magnitude = proMagnitudes[Math.floor(Math.random() * proMagnitudes.length)];
            z1Theta = proThetas[Math.floor(Math.random() * proThetas.length)];
            z2Magnitude = proMagnitudes[Math.floor(Math.random() * proMagnitudes.length)];
            z2Theta = proThetas[Math.floor(Math.random() * proThetas.length)];
        }

        // Code for Testing
        // z1Magnitude = 1.0;
        // z2Magnitude = 1.0;
        // z1Theta = -0.5 * Math.PI;
        // z2Theta = 0.25 * Math.PI;

        z1.magnitude = z1Magnitude;
        z1.theta = z1Theta;
        z1.computeRealImag();
        z2.magnitude = z2Magnitude;
        z2.theta = z2Theta;
        z2.computeRealImag();

        let z1rDisplay = 'r = ' + z1.magnitude.toFixed(3);
        let z1thetaDisplay = '\u03B8 = ' + (z1.theta / Math.PI).toFixed(3) + ' * \u03C0';

        document.getElementById("z1r").value = z1rDisplay;
        document.getElementById("z1theta").value = z1thetaDisplay;

        let z2rDisplay = 'r = ' + z2.magnitude.toFixed(3);
        let z2thetaDisplay = '\u03B8 = ' + (z2.theta / Math.PI).toFixed(3) + ' * \u03C0';

        document.getElementById("z2r").value = z2rDisplay;
        document.getElementById("z2theta").value = z2thetaDisplay;

        document.getElementById("userR").value = 1.0;
        document.getElementById("userTheta").value = 0.25;

        document.getElementById("msgCongrats").className = "blank";

        select.selectedIndex = 0;
        checkRect.checked = false;
        checkAns.checked = false;
        checkSumDiff.checked = false;

        handleOperation();
        handleUserGuess();
        showRealImag();
        showZ1Z2Graph();
        showResultGraph();
    }

    function showZ1Z2Graph() {
        let cWidth = canvasZ1Z2.width;
        let cHeight = canvasZ1Z2.height;
        drawBoundingBox(contextZ1Z2, cWidth, cHeight);
        drawAxesAndUnitCircleZ1Z2(contextZ1Z2, cWidth, cHeight);
    }

    function showResultGraph() {
        let cWidth = canvasResult.width;
        let cHeight = canvasResult.height;
        drawBoundingBox(contextResult, cWidth, cHeight);
        drawAxesAndUnitCircleResult(contextResult, cWidth, cHeight);
    }

    function drawBoundingBox(context, width, height){
        context.save();

        // First clear the canvas
        context.beginPath();
        context.fillStyle = "#FFDAB9";
        context.fillRect(0, 0, width, height);
        context.stroke();

        // Draw box for graph
        context.beginPath();
        context.fillStyle = "#fffacd";
        context.lineWidth = 3;
        context.fillRect(xMarginLeft, yMarginTop, width - xMarginLeft - xMarginRight, 
            height - yMarginTop - yMarginBottom);
        context.strokeStyle = "#393939";
        context.moveTo(xMarginLeft, yMarginTop); // Point 1
        context.lineTo(width - xMarginRight, yMarginTop); // Point 2
        context.lineTo(width - xMarginRight, height - yMarginBottom); // Point 3
        context.lineTo(xMarginLeft, height - yMarginBottom); // Point 4
        context.lineTo(xMarginLeft, yMarginTop); // Point 1
        context.stroke();
        context.restore();
    }

    function drawAxesAndUnitCircle(context, width, height, xCentre, yCentre, xCircleRightPoint, radius){
        context.save();

        // Draw axes
        context.beginPath();
        context.strokeStyle = "#666666";
        context.lineWidth = 1;
        context.moveTo(xCentre, yMarginTop);
        context.lineTo(xCentre, height - yMarginBottom);
        context.moveTo(xMarginLeft, yCentre);
        context.lineTo(width - xMarginRight, yCentre);

        // Draw unit circle
        context.moveTo(xCircleRightPoint, yCentre);
        let xVal, yVal;
        for( let i = 0; i < 361; ++i) {
            xVal = xCentre + radius * Math.cos(i * Math.PI / 180.);
            yVal = yCentre + radius * Math.sin(i * Math.PI / 180.);
            context.lineTo(xVal, yVal);
        }

        // Draw grid lines
        context.moveTo(xMarginLeft, yCentre - radius);
        context.lineTo(width - xMarginRight, yCentre - radius);
        context.moveTo(xMarginLeft, yCentre + radius);
        context.lineTo(width - xMarginRight, yCentre + radius);
        context.moveTo(xCentre - radius, height - yMarginBottom);
        context.lineTo(xCentre - radius, yMarginTop);
        context.moveTo(xCentre + radius, height - yMarginBottom);
        context.lineTo(xCentre + radius, yMarginTop);
        context.stroke();

        // Draw the axis labels
        context.beginPath();
        context.font = "15pt Arial";
        context.fillStyle = "#a52a2a";
        context.textAlign = "right";
        let n1 = 1;
        let n2 = -1;
        let n3 = 0;
        let text1 = n1.toFixed(0);
        let text2 = n2.toFixed(0);
        let text3 = n3.toFixed(0);
        context.fillText(text1, xCentre + radius + 3, height - 8);
        context.fillText(text2, xCentre - radius + 3, height - 8);
        context.fillText(text3, xCentre + 3, height - 8);
        context.fillText("Real", width - 10, height - 8);
        context.fillText(text1, 30, yCentre - radius + 3);
        context.fillText(text2, 30, yCentre + radius + 3);
        context.fillText(text3, 30, yCentre + 3);
        context.stroke();

        // The text "Imag" - this is a vertical text
        context.beginPath();
        context.textAlign = "right"
        context.translate(26, 10);
        context.rotate(- Math.PI / 2);
        context.fillText("Imag", 0, 0);
        context.stroke();
        context.restore();
    }

    // All this programming gymnastics just to draw a dashed line when the user 
    // enters a large magnitude for the Result Complex Number. 
    // When the user enters a complex number magnitude which fits inside the box, then it 
    // draws a solid line with arrow. When it goes out of the box, it draws a dashed line.
    // Also, for small values of the magnitude of complex number z1, the inverse can go out 
    // of bounds of the box. Here also, it draws a dashed line. 
    function drawComplexNumber(context, width, height, xCentre, yCentre, x1, y1, colour){
        let angleRadians = Math.atan2(y1-yCentre, x1 - xCentre);
        let x2, y2;
        context.save();
        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 3;
        if( (-Math.PI * 0.25 <= angleRadians) && (angleRadians < Math.PI * 0.25) ){
            let xVal = (width - xMarginRight);
            if( x1 > xVal) {
                context.setLineDash([15, 5]);
                // Find point of intersection of line with line y = xVal
                let t = (xVal - xCentre) / (x1 - xCentre);
                x2 = xVal;
                y2 = yCentre + t * (y1 - yCentre);
                drawArrow(context, xCentre, yCentre, x2, y2);
            } else {
                context.setLineDash([15, 0]);
                drawArrow(context, xCentre, yCentre, x1, y1);
            }
        } else if ( (-Math.PI * 0.75 <= angleRadians) && (angleRadians < Math.PI * -0.25) ){
            let yVal = yMarginTop;
            if( y1 < yVal) {
                context.setLineDash([15, 5]);
                // Find point of intersection of line with line y = yVal
                let t = (yVal - yCentre) / (y1 - yCentre);
                x2 = xCentre + t * (x1 - xCentre);
                y2 = yVal;
                drawArrow(context, xCentre, yCentre, x2, y2);
            } else {
                context.setLineDash([15, 0]);
                drawArrow(context, xCentre, yCentre, x1, y1);
            }
        } else if ( (Math.PI * 0.25 <= angleRadians) && (angleRadians < Math.PI * 0.75) ){
            let yVal = height - yMarginBottom;
            if( y1 > yVal) {
                context.setLineDash([15, 5]);
                // Find point of intersection of line with line y = yVal
                let t = (yVal - yCentre) / (y1 - yCentre);
                x2 = xCentre + t * (x1 - xCentre);
                y2 = yVal;
                drawArrow(context, xCentre, yCentre, x2, y2);
            } else {
                context.setLineDash([15, 0]);
                drawArrow(context, xCentre, yCentre, x1, y1);
            }
        } else {
            let xVal = xMarginLeft;
            if( x1 < xVal) {
                context.setLineDash([15, 5]);
                // Find point of intersection of line with line y = xVal
                let t = (xVal - xCentre) / (x1 - xCentre);
                x2 = xVal;
                y2 = yCentre + t * (y1 - yCentre);
                drawArrow(context, xCentre, yCentre, x2, y2);
            } else {
                context.setLineDash([15, 0]);
                drawArrow(context, xCentre, yCentre, x1, y1);
            }
        }
        context.stroke();
        context.restore();
    }

    function drawAxesAndUnitCircleResult(context, width, height,) {
        let xCentre = (xMarginLeft + width - xMarginRight) * 0.5;
        let yCentre = (yMarginTop + height - yMarginBottom) * 0.5;
        let xCircleRightPoint = (xCentre + (width - xMarginRight)) * 0.5;
        let radius = xCircleRightPoint - xCentre;
        drawAxesAndUnitCircle(context, width, height, xCentre, yCentre, xCircleRightPoint, radius);

        context.save();
        // Draw the ZUser complex number
        context.beginPath();
        let radius1 = radius - 4;
        let x1, y1, x2, y2;
        x1 = xCentre + zUser.magnitude * radius1 * Math.cos(zUser.theta);
        y1 = yCentre - zUser.magnitude * radius1 * Math.sin(zUser.theta);
        let colour = "#0000ff";
        drawComplexNumber(context, width, height, xCentre, yCentre, x1, y1, colour);
        context.restore();

        if( checkSumDiff.checked) {
            // Draw Z1 arrow in red
            context.strokeStyle = "#ff0000";
            context.lineWidth = 3;
            // Show complex number Z1
            x1 = xCentre + z1.magnitude * radius1 * Math.cos(z1.theta);
            y1 = yCentre - z1.magnitude * radius1 * Math.sin(z1.theta);
            if(select.selectedIndex == 0 || select.selectedIndex == 1){
                drawArrow(context, xCentre, yCentre, x1, y1);
            }

            // Draw Z2 arrow in magenta
            context.strokeStyle = "#ff00ff";
            context.lineWidth = 3;
            if( select.selectedIndex == 0 ) { // Addition
                // Show complex number Z2
                x2 = x1 + z2.magnitude * radius1 * Math.cos(z2.theta);
                y2 = y1 - z2.magnitude * radius1 * Math.sin(z2.theta);
                drawArrow(context, x1, y1, x2, y2);
            }
            else if (select.selectedIndex == 1 ) { // Subtraction
                // Show complex number -Z2
                x2 = x1 - z2.magnitude * radius1 * Math.cos(z2.theta);
                y2 = y1 + z2.magnitude * radius1 * Math.sin(z2.theta);
                drawArrow(context, x1, y1, x2, y2);
            }
        }

        // Draw the Z3Result complex number, in dark green colour
        if( checkAns.checked){
            context.lineWidth = 3;
            x1 = xCentre + z3Result.magnitude * radius1 * Math.cos(z3Result.theta);
            y1 = yCentre - z3Result.magnitude * radius1 * Math.sin(z3Result.theta);
            colour = "#006400";
            drawComplexNumber(context, width, height, xCentre, yCentre, x1, y1, colour);
        }
    }

    function drawAxesAndUnitCircleZ1Z2(context, width, height){
        let xCentre = (xMarginLeft + width - xMarginRight) * 0.5;
        let yCentre = (yMarginTop + height - yMarginBottom) * 0.5;
        let xCircleRightPoint = (xCentre + (width - xMarginRight)) * 0.5;
        let radius = xCircleRightPoint - xCentre;
        drawAxesAndUnitCircle(context, width, height, xCentre, yCentre, xCircleRightPoint, radius);

        context.save();
        // Draw the Z1 complex number in red
        context.strokeStyle = "#ff0000";
        context.lineWidth = 3;
        let radius1 = radius - 4;
        let x1 = xCentre + z1.magnitude * radius1 * Math.cos(z1.theta);
        let y1 = yCentre - z1.magnitude * radius1 * Math.sin(z1.theta);
        drawArrow(context, xCentre, yCentre, x1, y1);

        // For computation of inverse and conjugate, there is only one vector
        // and the second complex number Z2 should not be shown
        if(select.selectedIndex !== 4 && select.selectedIndex !== 5)
        {
            // Draw the Z2 complex number in magenta
            context.strokeStyle = "#ff00ff";
            context.lineWidth = 3;
            x1 = xCentre + z2.magnitude * radius1 * Math.cos(z2.theta);
            y1 = yCentre - z2.magnitude * radius1 * Math.sin(z2.theta);
            drawArrow(context, xCentre, yCentre, x1, y1);
        }
        context.restore();
    }

    // From SO site
    function drawArrow(ctx, fromx, fromy, tox, toy){
        //variables to be used when creating the arrow
        var headlen = 7;
        var angle = Math.atan2(toy-fromy,tox-fromx);
        ctx.save();

        //starting path of the arrow from the start square to the end square and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();

        //starting a new path from the head of the arrow to one of the sides of the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

        //path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

        ctx.stroke();
        ctx.restore();
    }