"use strict";

function BaseBuilder(value) {
    this.value = value;
}

BaseBuilder.prototype.get = function () {
    return this.value;
};

//ES6 class IntBuilder:

class IntBuilder extends BaseBuilder {
    constructor(value) {
        super(value);
        if (typeof this.value !== "number") {
            this.value = 0;
        }
    }

    plus(...n) {
        this.value += n.reduce((acc, num) => {
            if (typeof num === "number") {
                return acc + num;
            } else {
                console.log("Incorrect parameter:", num);
            }
        }, 0);

        return this;
    }

    minus(...n) {
        this.value -= n.reduce((acc, num) => {
            if (typeof num === "number") {
                return acc + num;
            } else {
                console.log("Incorrect parameter:", num);
            }
        }, 0);

        return this;
    }

    multiply(n) {
        if (typeof n === "number") {
            this.value *= n;
        } else {
            console.log("Incorrect parameter:", n);
        }

        return this;
    }

    divide(n) {
        if (typeof n === "number" && n > 0) {
            this.value = Math.floor(this.value / n);
        } else {
            console.log("Incorrect parameter:", n);
        }

        return this;
    }

    mod(n) {
        if (typeof n === "number" && n > 0) {
            this.value %= n;
        } else {
            console.log("Incorrect parameter:", n);
        }

        return this;
    }

    static random(from, to) {
        if (typeof from === "number" && typeof to === "number") {
            return Math.floor(Math.random() * (to - from) + from);
        } else {
            console.log("Incorrect parameters:", from, to);
        }
    }
}

let intBuilder = new IntBuilder(10); // 10;
intBuilder
    .plus(2, 3, 2) // 17;
    .minus(1, 2) // 14;
    .multiply(2) // 28;
    .divide(4) // 7;
    .mod(3) // 1;
    .get();

console.log(intBuilder);

let randomNum = IntBuilder.random(10, 100);
console.log(randomNum);

function StringBuilder(value) {
    BaseBuilder.call(this, value);
    this.value = String(value);
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);

StringBuilder.prototype.plus = function (...str) {
    str.forEach((item) => {
        if (typeof item === "string") {
            this.value += item;
        } else {
            console.log("Incorrect parameter:", item);
        }
    });

    return this;
};

StringBuilder.prototype.minus = function (n) {
    if (typeof n === "number" && n >= 0) {
        this.value = this.value.slice(0, -n);
    } else {
        console.log("Incorrect parameter:", n);
    }

    return this;
};

StringBuilder.prototype.multiply = function (n) {
    if (typeof n === "number" && n >= 0) {
        this.value = this.value.repeat(n);
    } else {
        console.log("Incorrect parameter:", n);
    }

    return this;
};

StringBuilder.prototype.divide = function (int) {
    if (typeof int === "number" && int > 0) {
        this.value = this.value.slice(0, Math.floor(this.value.length / int));
    } else {
        console.log("Incorrect parameter:", int);
    }

    return this;
};

StringBuilder.prototype.remove = function (str) {
    if (typeof str === "string") {
        this.value = this.value.split(str).join("");
    } else {
        console.log("Incorrect parameter:", str);
    }

    return this;
};

StringBuilder.prototype.sub = function (from, n) {
    if (
        typeof from === "number" &&
        typeof n === "number" &&
        from >= 0 &&
        n >= 0
    ) {
        this.value = this.value.substr(from, n);
    } else {
        console.log("Incorrect parameters:", from, n);
    }
    return this;
};

let strBuilder = new StringBuilder("Hello"); // 'Hello';
strBuilder
    .plus(" all", "!") // 'Hello all!'
    .minus(4) // 'Hello '
    .multiply(3) // 'Hello Hello Hello '
    .divide(4) // 'Hell';
    .remove("l") // 'He';
    .sub(1, 1) // 'e';
    .get(); // -> 'e';

console.log(strBuilder);
