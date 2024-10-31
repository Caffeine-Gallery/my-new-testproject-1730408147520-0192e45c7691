import Float "mo:base/Float";

actor Calculator {
    public query func add(a: Float, b: Float) : async Float {
        a + b
    };

    public query func subtract(a: Float, b: Float) : async Float {
        a - b
    };

    public query func multiply(a: Float, b: Float) : async Float {
        a * b
    };

    public query func divide(a: Float, b: Float) : async ?Float {
        if (b == 0) {
            null
        } else {
            ?(a / b)
        }
    };
}
