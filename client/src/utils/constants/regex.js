export const regex = {
    // includes accented letters, no nums or symbols except .'- but not as first/last or consecutive
    full_name: /^([a-z\u00c0-\u00ff]+[.' -]?)*[a-z\u00c0-\u00ff]+$/i,

    // only latin letters, num 0-9 and these chars: " !#$%&'*+\/=?^_``{|}~.- ", no accents, max length 254 (63 before @), cant start with "-" or "." and no consecutive dots
    email: /^(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}$/,

    // min 8 char, at least one uppercase, one num and one special char
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.$!%*?&])[A-Za-z\d@.$!%*?&]{8,}$/
};