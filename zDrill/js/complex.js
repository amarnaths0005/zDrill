/* HTML5 - JavaScript Complex Number Operations Drill, zdrill, Jan 2019
    by Amarnath S, amarnaths.codeproject@gmail.com
    */

// Class for Complex Number
'use strict'

// We store Complex numbers in the Polar form, using magnitude and theta
class ComplexNumber {
    constructor(magnitude, theta) {
        this.magnitude = magnitude;
        this.theta = theta;

        this.computeRealImag = function(){
            this.real = this.magnitude * Math.cos(this.theta);
            this.imag = this.magnitude * Math.sin(this.theta);
        }
        
        this.getReal = function(mag, theta) {
            return mag * Math.cos(theta);
        }

        this.getImag = function(mag, theta) {
            return mag * Math.sin(theta);
        }

        this.getRealImag = function(z3, z3Mag, z3Theta) {
            z3.real = this.getReal(z3Mag, z3Theta);
            z3.imag = this.getImag(z3Mag, z3Theta);
        };

        this.add = function (z2) {
            let z1Real = this.getReal(this.magnitude, this.theta); 
            let z1Imag = this.getImag(this.magnitude, this.theta);
            let z2Real = this.getReal(z2.magnitude, z2.theta);
            let z2Imag = this.getImag(z2.magnitude, z2.theta);
            let z3Real = z1Real + z2Real;
            let z3Imag = z1Imag + z2Imag;
            let z3Mag = Math.sqrt(z3Real * z3Real + z3Imag * z3Imag);
            let z3Theta = Math.atan2(z3Imag, z3Real);
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };

        this.subtract = function (z2) {
            let z1Real = this.getReal(this.magnitude, this.theta);
            let z1Imag = this.getImag(this.magnitude, this.theta);
            let z2Real = this.getReal(z2.magnitude, z2.theta);
            let z2Imag = this.getImag(z2.magnitude, z2.theta);
            let z3Real = z1Real - z2Real;
            let z3Imag = z1Imag - z2Imag;
            let z3Mag = Math.sqrt(z3Real * z3Real + z3Imag * z3Imag);
            let z3Theta = Math.atan2(z3Imag, z3Real);
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };

        this.multiply = function (z2) {
            let z3Mag = this.magnitude * z2.magnitude;
            let z3Theta = this.theta + z2.theta;
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };

        this.divide = function (z2) {
            // To handle divide by zero
            let z3Mag = this.magnitude / z2.magnitude;
            let z3Theta = this.theta - z2.theta;
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };

        this.invert = function () {
            let z3Mag = 1.0 / this.magnitude;
            let z3Theta = -this.theta;
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };

        this.conjugate = function () {
            let z3Mag = this.magnitude;
            let z3Theta = -this.theta;
            let z3 = new ComplexNumber();
            z3.magnitude = z3Mag;
            z3.theta = z3Theta;
            this.getRealImag(z3, z3Mag, z3Theta);
            return z3;
        };
    }
}