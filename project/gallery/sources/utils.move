module gallery::utils{
    use std::string::String;
    use sui::address;

    // ===== to_b36 =====

    const BASE36: vector<u8> = b"0123456789abcdefghijklmnopqrstuvwxyz";

    public fun to_b36(addr: address): String {
        let source = address::to_bytes(addr);
        let size = 2 * vector::length(&source);
        let b36copy = BASE36;
        let base = vector::length(&b36copy);
        let mut encoding = vector::tabulate!(size, |_| 0);
        let mut high = size - 1;

        source.length().do!(|j| {
            let mut carry = source[j] as u64;
            let mut it = size - 1;
            while (it > high || carry != 0) {
            carry = carry + 256 * (encoding[it] as u64);
            let value = (carry % base) as u8;
            *&mut encoding[it] = value;
            carry = carry / base;
            it = it - 1;
        };
        high = it;
        });

        let mut str: vector<u8> = vector[];
        let mut k = 0;
        let mut leading_zeros = true;
        while (k < vector::length(&encoding)) {
            let byte = encoding[k] as u64;
            if (byte != 0 && leading_zeros) {
                leading_zeros = false;
            };
            let char = b36copy[byte];
            if (!leading_zeros) {
                str.push_back(char);
            };
            k = k + 1;
        };
        str.to_string()
    }
}